const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { dataBaseAdress } = require("../utils/config");

// Модель пользователя (упрощенная версия)
const userSchema = new mongoose.Schema(
    {
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    { versionKey: false }
);

const User = mongoose.model("user", userSchema);

// Email захардкожен в системе (см. userSchema.js строка 29)
const SYSTEM_EMAIL = "hellonm4@mail.ru";

// Функция для установки/обновления пароля
async function setPassword(newPassword) {
    try {
        // Подключаемся к БД
        await mongoose.connect(dataBaseAdress, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Подключено к базе данных");

        // Хешируем новый пароль
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log("✅ Пароль захеширован");

        // Ищем пользователя или создаем нового
        let user = await User.findOne({ email: SYSTEM_EMAIL });

        if (!user) {
            // Создаем нового пользователя
            user = await User.create({
                email: SYSTEM_EMAIL,
                password: hashedPassword
            });
            console.log("✅ Пользователь создан");
        } else {
            // Обновляем пароль существующего пользователя
            user.password = hashedPassword;
            await user.save();
            console.log("✅ Пароль обновлен");
        }

        console.log("");
        console.log("✅ Готово! Пароль установлен/обновлен");
        console.log(`📧 Email: ${SYSTEM_EMAIL}`);
        console.log(`🔑 Пароль: ${newPassword}`);
        console.log("");

        // Закрываем соединение
        await mongoose.connection.close();
        console.log("✅ Соединение закрыто");
        process.exit(0);
    } catch (error) {
        console.error("❌ Ошибка:", error.message);
        console.error(error);
        process.exit(1);
    }
}

// Получаем параметры из командной строки
const args = process.argv.slice(2);

if (args.length < 1) {
    console.log("📝 Использование:");
    console.log("   node scripts/updatePassword.js <новый_пароль>");
    console.log("");
    console.log("Пример:");
    console.log("   node scripts/updatePassword.js myNewPassword123");
    console.log("");
    console.log("ℹ️  Email захардкожен в системе: hellonm4@mail.ru");
    process.exit(1);
}

const newPassword = args[0];

// Запускаем установку пароля
setPassword(newPassword);
