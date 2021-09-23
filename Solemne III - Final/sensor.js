//Publicador de datos TCP

var net = require('net');

var server = net.createServer();

server.listen(2000);

server.on('connection', function(socket){
    console.log("Conexión iniciada");
    var generar = setInterval(() => {
        numero = Math.floor(Math.random() * (1200 - 900)) + 900;
        console.log("Temperatura registrada : "+numero+"°C");
        socket.write(numero.toString());
    }, 1000);
    socket.on('end',function(){
        clearInterval(generar);
        console.log("Conexión cerrada");
    });
});