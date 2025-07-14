const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ DB connection successful');
  } catch (error) {
    console.log('❌ DB connection failed');
    console.error(error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = dbConnect;
