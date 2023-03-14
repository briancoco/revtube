const express = require('express');
const app = express();
require('express-async-errors');
require('dotenv').config();
const morgan = require('morgan');

//db
const connectDB = require('./database/dbConnect');

//routers
const videoRouter = require('./routes/videoRouter');
const authRouter = require('./routes/authRouter');

//middleware
const fileParser = require('express-fileupload');
const cookieParser = require('cookie-parser');
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');
const notFoundMiddleware = require('./middleware/notFoundMiddleware');

app.use(morgan('tiny'));
app.use(express.static('./public'));
app.use(express.json());
app.use(fileParser());
app.use(cookieParser());

app.use('/api/videos', videoRouter);
app.use('/api/auth', authRouter);

app.use(notFoundMiddleware); //hit if request does not match any defined routes
app.use(errorHandlerMiddleware); //hit if error in handling request

const start = async () => {
    //connects to db and starts web server
    try {
        await connectDB();
        app.listen(3000, () => {
            console.log('listening on port 3000')
        })
    } catch (error) {
        console.log(error.message);
    }
}

start();

