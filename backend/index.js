const express = require('express');
const router = require("./routers/routes")
require('./db/config');
const cors = require('cors');
const { isAuthorized } = require('./middleware/auth');
const app = express();

app.use(express.json());
app.use(cors());

const connectDB = async () => {
    // app.use('/api', isAuthorized)
    app.use('/', router);
}

connectDB();

app.listen(5000);