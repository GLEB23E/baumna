const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Middleware для обработки CORS
app.use(cors());

// Подключение к базе данных
connectDB();

// Middleware для обработки JSON
app.use(bodyParser.json());

// Убедитесь, что роуты подключаются через /api
app.use('/api', userRoutes);

const PORT = 5001;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
