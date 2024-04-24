const mongoose = require('mongoose');
require ('dotenv').config();
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const connectDB = async () => {
    console.log(' conectando...');
    
    mongoose.connect(`mongodb+srv://marcoabjr:xb369582@cluster0.oc1ahd0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,

     )
     .then(() => console.log('Conectado ao MongoDB'))
     .catch((error) => console.log('Error connecting to MongoDB', error.message))
};

module.exports = connectDB;