import express from 'express';
import routerTask from './routes/task.route.js'
import cors from 'cors'

const app = express()

app.use(express.urlencoded());
app.use(express.json());
// app.use(cors('*'))
app.use(cors());
app.use(routerTask)
app.listen(3000, ()=>{
    console.log('Server Listening');    
});