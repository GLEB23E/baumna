
const express = require('express');
const cors = require('cors'); 
const { MongoClient } = require('mongodb');
const multer = require('multer'); 
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);
const { ObjectId } = require('mongodb');



async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch(err) {
    console.error(err);
  }
}
run();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});



const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};





const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});


app.use('/uploads', express.static('uploads'));

app.post('/api/uploads', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const database = client.db('baumna_data');
    const collection = database.collection('images');
    
    const imageData = {
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      uploadedAt: new Date(),
      userId: req.body.userId 
    };

    const result = await collection.insertOne(imageData);
    
    res.status(201).json({
      message: 'File uploaded successfully',
      filePath: `/uploads/${req.file.filename}`,
      fileId: result.insertedId
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
});








app.post('/api/register', async (req, res) => {
  try {
    console.log('Received data:', req.body); 
    const database = client.db('baumna_data');
    const collection = database.collection('users');
    const check = await collection.findOne({ email: req.body.email })
    if (check) {
      return res.status(409).json({ error: 'User already exists' });
    } else {
      const result = await collection.insertOne(req.body);
      res.status(201).json({ id: result.insertedId });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/addstore', async (req, res) => {
  try {
    console.log('Received data:', req.body); 
    const database = client.db('baumna_data');
    const collection = database.collection('shop');
    const check = await collection.insertOne({ name: req.body.name, surname: req.body.surname, phone: req.body.phone, descr: req.body.descr, price: req.body.price, imgpath: req.body.path})
    if(check) {
      return res.status(200).json({ error: 'added' });
    } else {
      return res.status(500).json({ error: 'failed add' });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'add store failed' });
  }
})


app.post('/api/login', async (req, res) => {
  try {
    console.log('Received data:', req.body); 
    const database = client.db('baumna_data');
    const collection = database.collection('users');
    const check = await collection.findOne({ email: req.body.email })
    if (check) {
      if (req.body.password === check.password) {
        res.status(200).json({ userId: check._id }); // Успех
      } else {
        res.status(500).json({ error: 'login failed' });
      }
    } else {
      res.status(500).json({ error: 'login failed' });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'login failed' });
  }
});

app.get('/api/store', async (req, res) => {
  try {
    console.log('Received data:', req.body); 
    const database = client.db('baumna_data');
    const collection = database.collection('shop');
    const check = await collection.find({}).toArray();
    if (check) {
      res.status(200).json(check)
    } else {
      res.status(500).json({ error: 'store failed' });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'store failed' });
  }
});

app.post('/api/userinfo', async (req, res) => {
  try {
    console.log('Received data:', req.body); 
    const database = client.db('baumna_data');
    const collection = database.collection('users');
    console.log(req.body.id)
    const check = await collection.findOne({ _id: new ObjectId(req.body.id) });

    if (check) {
      res.status(200).json(check)
    } else {
      res.status(500).json({ error: 'fet failed' });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'get failed' });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});