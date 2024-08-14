const express = require('express')
const connectToDb = require('./configs/db')
require('dotenv').config()
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const port = process.env.PORT || 9090
const uri = process.env.MONGO_URI

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


app.get('/', (req, res)=>{
    res.send('This is home route')
})

app.use(notFound);
app.use(errorHandler);

app.listen(port, async()=>{

    try{

        await connectToDb(uri)
        
        console.log('Connected to the connect to the database')
        console.log(`Server is running at port: ${port}`)
    }
    catch(err){
        console.log(err)
    }
})