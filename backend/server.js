require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express()

app.use(cors());
app.use(express.json());

sequelize.authenticate()
  .then(() => console.log('Database is connected...'))
  .catch(err => console.log('Error: ' + err));

const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
    res.send("Hello world");
})
    

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

