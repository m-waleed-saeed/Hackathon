const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const contactRoutes = require('./routes/contact');
const heroRoutes = require('./routes/hero');

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/hero', heroRoutes);

app.use('/api/products', productRoutes);

app.use("/api/contacts", contactRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgGreen.bold);
});

connectDB();