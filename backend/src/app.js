import express from 'express';
import { createServer } from 'node:http';
// import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';

import { connectToSocket } from './controllers/socketManager.js';

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({limit: '40kb'}));    
app.use(express.urlencoded({extended: true, limit: '40kb'}));




const start = async () => {
    const connectionDB = await mongoose.connect('mongodb+srv://akshanshs2000learn:akshansh2000@cluster0.g3kca6j.mongodb.net/');
    console.log(`Connected to MongoDB: ${connectionDB.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log('Server is running on port 8000');
    });
};

start();