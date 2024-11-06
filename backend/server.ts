import express from 'express';
import cors from 'cors'
import userRouter from './routers/userRouter';
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

const app = express();

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static('uploads')); // Serve static files (uploads)

mongoose.connect('mongodb://127.0.0.1:27017/basta')
const conn = mongoose.connection
conn.once('open', ()=>{
    console.log("DB ok")
})

const router = express.Router()
router.use('/users', userRouter)

app.use("/" ,router)
app.listen(4000, () => console.log('Express server running on port 4000'));