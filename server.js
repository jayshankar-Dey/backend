const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const color = require('colors');

const connectdb = require('./conf/db');
const router = require('./routes/userRoute');
require('dotenv').config();
const app = express();
///middle wire///
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

///routes/////
connectdb().then(() => {
    app.use("/api/", router)
})

app.listen(process.env.port, (req, res) => {
    console.log("server starting on port http://localhost:5000".bgBlue)
});