import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { Edit, Is_online  } from './route.js';
import { AddUser } from './route.js';
import { Delete } from './route.js';
import { User } from './route.js';
import { Login ,Signup } from './route.js';




  //initiate Express and socket 
const App = express();
App.use(cors()); //front normal
const server = http.createServer(App);
var io = new SocketIOServer(server, {
    cors: {
        origin: "*", //socket
    },
});





App.use(bodyParser.json({ extended: true }));
App.use(bodyParser.urlencoded({ extended: true }));



    //socket connection and event
io.on('connection', (socket) => {
    console.log('user connected')


    socket.on('ok', (newArr) => {
        io.emit('ok', newArr);   
    });
    socket.on('disconnect', ()=> {
        console.log('Got disconnect!');
    })
  });



  //APIs
App.post('/is_online' ,Is_online)
App.post('/signup', Signup)
App.get('/user', User)
App.post('/delete',Delete)
App.post('/adduser', AddUser)
App.post('/edit' , Edit)
App.post('/login',Login)



server.listen(8000, () => {
    console.log(`Server is running on port : 8000`);
});