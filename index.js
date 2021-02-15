const app = require('express')();
const http = require('http').createServer(app);
const { log } = require('console');
const { v4: uuidv4 } = require('uuid');
var cors = require('cors')
app.use(cors())

const io = require('socket.io')(http, {
  cors: {
    // origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true,
  }
});

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

rooms = []

// socket.io stuff
io.on("connection", (socket)=>{
    console.log("User connected");

    // User joins the room
    socket.on("joined_room", (roomID) => {
        if(rooms.includes(roomID)){
            socket.join(roomID);
        }
        else{
            console.log("Room doesn't exist");
        }
    });

    // User leaves the room
    // socket.on('disconnect', () => {
    // }); 

    // User pauses video
    socket.on("pause_video", (roomID) => {
        io.to(roomID).emit("_pause_video") 
    });

    // User plays video
    socket.on("play_video", (roomID) => {
        io.to(roomID).emit("_play_video") 
    });

    // User skips video 
    socket.on("skip_video", (roomID, timestamp) => {
        io.to(roomID).emit("_skip_video", timestamp) ;
    });

    // User sets video
    socket.on("set_video", (roomID, vidCode) => {
        io.to(roomID).emit("_set_video", vidCode) ;
    });
});


// HTTP stuff
app.get('/create_room',(req, res) => {
    var roomID = makeid(8);
    if(!rooms.includes(roomID))
        rooms.push(roomID);
    else{
        roomID = makeid(8);
        rooms.push(roomID);
    }
        
    console.log("Created room " + roomID);
    return res.send({'roomID':roomID})
});

app.get('/room_exists/:roomID',(req, res) => {
    if (rooms.includes(req.params.roomID)){
        return res.sendStatus(200); 
    }
    else{
        return res.sendStatus(404);
    }
});


app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

