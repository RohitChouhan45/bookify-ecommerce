const express = require("express");
const app = express();
const cors = require("cors");
const Sentry = require('@sentry/node');

const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
require('dotenv').config()

//cHFdUn10JoSbjeCg
const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://helpyourassistant:pqam0Mwv3Vwv8Off@cluster0.qc3bq.mongodb.net/book-store?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

Sentry.init({
  dsn: 'https://5fb7e55413c760bcec6bff9ab1ce3ed8@o4509762427486208.ingest.us.sentry.io/4509762429517824>',
  tracesSampleRate: 1.0, // You can lower it later
});

// middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://bookify-ecommerce.vercel.app/'],
    credentials: true
}))

// routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require("./src/orders/order.route")
const userRoutes =  require("./src/users/user.route")
const adminRoutes = require("./src/stats/admin.stats")

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  app.use("/", (req, res) => {
    res.send("Book Store Server is running!");
  });
}

main().then(() => console.log("Mongodb connect successfully!")).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


// index.js or app.js

