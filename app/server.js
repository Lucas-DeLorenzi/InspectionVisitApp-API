const express = require('express')
const { sequelize } = require('./models/index');
const cors = require('cors')
require('dotenv');
const allowCors = require('./middlewares/allowCors')

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors(allowCors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));



app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
    // sequelize.sync({force: false});
    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});