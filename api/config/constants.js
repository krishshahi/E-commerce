const config = {
    DB_URL: "mongodb://localhost:27017",
    DB_NAME: "stack-7",
    JWT_SECRET: "Sandesh",
    ASSETS_URL: "http://localhost:9001/images",
   
    SMTP_HOST: "smtp.mailtrap.io",
    SMTP_PORT: 2525,
    SMTP_USER: "025b087bc187dd",
    SMTP_PWD: "1a5eaad072af1d",
   
    FE_URL: "http://localhost:3000",
    ADMIN_EMAIL: "noreply@test.com"
};

// ecs 
// enviornment.js
module.exports = config;