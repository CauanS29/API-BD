import { MongoClient } from "mongodb";
import swagger from 'swagger-ui-express'
import swaggerJson from '../swagger.json'
import cors from 'cors'; 
const express = require('express'); 
const body = require('body-parser'); 

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204 || 200, 
  };
  
 
  

async function start() {
    try{

        const app = express(); 

        const mongo = await MongoClient.connect('mongodb://localhost:27017/users-api');

        await mongo.connect(); 

        app.db = mongo.db()

        app.use(body.json({
            limit: '500kb'
        }))

        app.use('/users', require('./routes/users')); 

        app.use(cors(corsOptions));

        app.use(swagger.serve, swagger.setup(swaggerJson))

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });

    }catch(error){
        console.log(error); 
    }
    
}

start();
