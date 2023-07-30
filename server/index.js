
import express from 'express';
import mongoose from "mongoose"
import dotenv from "dotenv"
import router from './routes/User.js';
import videorouter from './routes/Videos.js';
import commentrouter from './routes/Comments.js';
import authrouter from './routes/auth.js'
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config()

const  connect = () => {
  mongoose.connect(process.env.MONGO).then(()=>{
    console.log(" Connected to DB ")
  })
  .catch((err)=>{
    throw err
  })
}
app.get('/', (req, res) => {
  res.send('main_ page');
});
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authrouter )
app.use('/api/users', router )
app.use('/api/video', videorouter )
app.use('/api/comment', commentrouter )

// error handling 
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8800 , () => {
  connect()
console.log("connected to server ")
});
