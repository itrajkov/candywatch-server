const app = require('express')();
const http = require('http').createServer(app);
var cors = require('cors')
app.use(cors())

const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:8080",
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

class Room{

  constructor(roomID, videoCode){
    this.roomID = roomID;
    this.videoCode = videoCode;
  }
  
}

var rooms = {}

// socket.io stuff


// http stuff
app.get('/create_room',(req, res) => {
  var roomID = makeid(6);
  rooms[roomID] = new Room(roomID, "GMIQ8ZWRQXo");
  console.log("Created room " + rooms[roomID].roomID);
    return res.send(rooms[roomID]);
});

app.get('/get_room/:roomID',(req, res) => {
    if (rooms[req.params.roomID]){
        return res.send(rooms[req.params.roomID]);
    }
    else{
        return res.sendStatus(404)
    }
});


app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

