const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`[${new Date().toISOString()}] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] MongoDB Connection Error:`, error.message);
    process.exit(1);
  }
};

module.exports = connectDB;