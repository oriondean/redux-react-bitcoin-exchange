import io from 'socket.io-client';

let Socket = io.connect('http://localhost:8081', { transports: ['websocket']});

export default Socket;