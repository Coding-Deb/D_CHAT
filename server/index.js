const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 5000
// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;

// // Cloudinary Configuration
// cloudinary.config({ 
//   cloud_name: 'dbbjsrztd', 
//   api_key: '665347456443981', 
//   api_secret: 'GVmkrVkTkuhiH8qX8HNsaJ7PXSc' 
// });

// // Multer Configuration
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });


// MongoDB Connection
mongoose.connect('mongodb+srv://debanshu1234:debanshu1234@cluster0.mswzdgw.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRoutes = require('./Routes/authRoutes');
app.use('/api/auth', authRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))