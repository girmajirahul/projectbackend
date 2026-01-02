const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
  
const userRoutes = require('./routes/userRoutes');
const jobRoutes= require('./routes/jobRoutes')
const adminRoutes =require('./routes/adminRoutes')

app.get('/', (req, res) => {
    return res.json("Backend Side");
});



app.use('/users', userRoutes);
app.use('/jobs',jobRoutes);
app.use('/admin',adminRoutes);

app.listen(8081, () => {
    console.log("running on port 8081");
});
