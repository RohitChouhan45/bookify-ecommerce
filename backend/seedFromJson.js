const mongoose = require('mongoose');
const Book = require('./src/books/book.model');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const seedFromJson = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Read books.json file
    const booksPath = path.join(__dirname, '../frontend/public/books.json');
    const booksData = JSON.parse(fs.readFileSync(booksPath, 'utf8'));
    
    // Clear existing books
    await Book.deleteMany({});
    console.log('Cleared existing books');
    
    // Insert books (remove _id field as MongoDB will generate it)
    const booksToInsert = booksData.map(book => {
      const { _id, ...bookWithoutId } = book;
      return bookWithoutId;
    });
    
    const result = await Book.insertMany(booksToInsert);
    console.log(`Seeded ${result.length} books successfully`);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedFromJson(); 