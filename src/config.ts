// config.ts
const config = {
  apiBaseUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : "https://jdszr16-random-forest-rangers-be.onrender.com",
};

export default config;
