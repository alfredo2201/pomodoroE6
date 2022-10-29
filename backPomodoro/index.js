import express from 'express';
import routerTask from './routes/task.route.js'

const app = express()

app.use(express.urlencoded());
app.use(express.json());

app.use(routerTask)
app.listen(3000, ()=>{
    console.log('Server Listening');    
});