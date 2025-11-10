const mongoose = require('mongoose');
const { dataBaseAdress } = require('../utils/config');

// Модель пользователя (упрощенная версия)
const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
}, { versionKey: false });

const User = mongoose.model('user', userSchema);

// Email захардкожен в системе
const SYSTEM_EMAIL = 'hellonm4@mail.ru';

// Функция для проверки пользователя
async function checkUser() {
  try {
    // Подключаемся к БД
    await mongoose.connect(dataBaseAdress, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Подключено к базе данных\n');

    // Ищем пользователя
    const user = await User.findOne({ email: SYSTEM_EMAIL }).select('+password');
    
    if (!user) {
      console.log('❌ Пользователь НЕ найден в базе данных');
      console.log(`📧 Искомый email: ${SYSTEM_EMAIL}`);
      console.log('\n💡 Запустите скрипт updatePassword.js для создания пользователя');
    } else {
      console.log('✅ Пользователь найден в базе данных!');
      console.log(`📧 Email: ${user.email}`);
      console.log(`🔑 Пароль: ${user.password ? '*** (захеширован)' : 'не установлен'}`);
      console.log(`🆔 ID: ${user._id}`);
      console.log('\n✅ Пароль успешно хранится в БД (в захешированном виде)');
    }

    // Закрываем соединение
    await mongoose.connection.close();
    console.log('\n✅ Соединение закрыто');
    process.exit(0);

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Запускаем проверку
checkUser();

