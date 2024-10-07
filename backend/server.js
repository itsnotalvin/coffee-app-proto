require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

const app = express()

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Welcome to Merlin");
})

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.use(errorHandler);

sequelize.authenticate()
  .then(() => {
    console.log('Database is connected...');

    const PORT = process.env.PORT || 4000

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })

  })
  .catch(err => console.log('Error: ' + err));



