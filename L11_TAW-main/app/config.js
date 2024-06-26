const config = {
  port: process.env.PORT || 3100,
  databaseUrl:
    process.env.MONGODB_URI ||
    "mongodb+srv://jchamielec303:12345678Kc@projekt.lb7caye.mongodb.net/",
  JwtSecret: process.env.JWT_SECRET || "secret",
};

export default config;
