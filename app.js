require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const authRoute = require('./routes/auth')
const jobsRoute = require('./routes/jobs')
const connectDB = require('./db/connect')
require('dotenv').config()
const authUser = require('./middleware/authentication')
// error handler
const notFoundMiddleware = require('./middleware/not-found'); 
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/jobs',authUser,jobsRoute)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
