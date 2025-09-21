const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const contactRoutes = require('./routes/contact');
const heroRoutes = require('./routes/hero');
const subscriberRoutes = require('./routes/subscriber');
const campaignRoutes = require('./routes/campaign');
const donorRoutes = require('./routes/donor');

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/donor', donorRoutes);
app.use('/api/hero', heroRoutes);

app.use("/api/contacts", contactRoutes);
app.use("/api/subscribers", subscriberRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgGreen.bold);
});

connectDB();