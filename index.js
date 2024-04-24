const express = require('express');
const userRoute = require('./src/routes/userRoute');
const loginRoute = require('./src/routes/loginRoute');
const app = express();
const port = 3000;
const connectDB = require('./src/database/database');
const cors = require('cors');

connectDB();

app.use(cors());
app.use(express.json());
app.use('/auth', userRoute);
app.use('/users', loginRoute);

app.listen(port, () => {
  console.log(`Server rodando na ${port}`);
})