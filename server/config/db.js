const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/baumna', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Подключение к MongoDB успешно!');
  } catch (err) {
    console.error('Ошибка подключения к MongoDB:', err.message);
    process.exit(1); // Завершаем процесс при ошибке
  }
};

module.exports = connectDB;
