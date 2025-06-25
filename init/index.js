// ✅ Load environment variables
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

// ✅ Import required packages & files
const mongoose = require('mongoose');
const initData = require('./data.js');         // relative path to data.js
const Listing = require('../models/listings'); // relative path to listings model

// ✅ Get MongoDB URL
const dbUrl = process.env.ATLASDB_URL;
console.log('ATLASDB_URL:', dbUrl); // ✅ Debug — check if this is defined

// ✅ Connect to Mongo
main()
  .then(() => {
    console.log('Connected to DB');
    return initDB();
  })
  .catch((err) => {
    console.error('Connection Error:', err);
  });

async function main() {
  if (!dbUrl) {
    throw new Error('ATLASDB_URL is undefined. Check your .env file.');
  }
  await mongoose.connect(dbUrl); // ✅ Connect to Mongo
}

// ✅ Init DB function
const initDB = async () => {
  try {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: '6741708651889dc07accac75', // ✅ Replace with valid ObjectId
    }));
    await Listing.insertMany(initData.data);
    console.log('Data was initialized successfully ✅');
  } catch (err) {
    console.error('Error initializing data:', err);
  } finally {
    // ✅ Close connection after init
    mongoose.connection.close();
  }
};
