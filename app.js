require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const routes = require('./src/routes');
const cookieParser = require('cookie-parser');


const app = express();

connectDB();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(cookieParser());
// if (process.env.NODE_ENV === "development") {
//     app.use(morgan("dev"));
// }

app.use(morgan(process.env.NODE_ENV === "production" ? "tiny" : "dev"));


app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.get('/', (req, res) => {
    res.status(200).json({ message: "API is running..." });
})

module.exports = app;