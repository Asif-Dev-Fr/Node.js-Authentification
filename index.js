const express = require('express');
const app = express();
const router = require('./routes/auth');
const mongoose = require('mongoose');

// Connect to DB : 
mongoose.connect(`${process.env.DB_LINK}`,  () => console.log('Connected to DB'));

// Import Routes : 
const authRoute = require('./routes/auth');

// Route Middlewares : 
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server is running'));