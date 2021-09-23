var http = require('http');                         //página HTTP 
var url = require('url');
var fs = require('fs');                            //Buscar Archivos
var dgram = require('dgram');
var s_UDP = dgram.createSocket("udp4");           //Socket UDP
var net = require('net');                          //Net
var s_TCP = new net.Socket();                       //Socket TCP

const mime = {
   'html' : 'text/html',
   'css'  : 'text/css',
   'jpeg' : 'image/jpeg',
   'png'  : 'image/png',
   'jpg'  : 'image/jpg',
   'ico'  : 'image/x-icon',
   'mp4'  : 'video/mp4',
};

var server=http.createServer((pedido, respuesta) => {
    var objetourl = url.parse(pedido.url);
    dato = objetourl.query;
    if(dato!=null){
        dato = dato.split("=");
        if(dato[1]=="Go"){
            s_TCP.destroy();
            console.log("Conexión iniciada");
            s_TCP.connect(2000,'127.0.0.1');  
        }
        else if(dato[1]=="Stop"){
            s_TCP.destroy();
            console.log("Conexión cerrada");
            s_UDP.send(String(0),5000,"127.0.0.1");
        }
      }
    let camino='static'+objetourl.pathname;
    if (camino=='static/')
    camino='static/index.html';
    //camino='static/index2.html';      //Error Recurso Inexistente
    fs.stat(camino, error => {
      if (!error){
        fs.readFile(camino, (error,contenido) =>{		  
          if(error){
            respuesta.writeHead(500, {'Content-Type': 'text/plain'});
            respuesta.write('Error interno');
            respuesta.end();					
          }else{
            var vec = camino.split('.');
            var extension=vec[vec.length-1];
            var mimearchivo=mime[extension];
            respuesta.writeHead(200, {'Content-Type': mimearchivo});
            respuesta.write(contenido);
            respuesta.end();
          }
        });
      } else {
        respuesta.writeHead(404, {'Content-Type': 'text/html'});
        respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');		
        respuesta.end();
      };
  });
}).listen(1000);
console.log('Servidor web iniciado');

//Servidor websocket
var io = require('socket.io')(server);

function generar_tiempo(){
  momentoActual= new Date();
  hora = momentoActual.getHours();
  minuto= momentoActual.getMinutes();
  segundo= momentoActual.getSeconds();
  año=momentoActual.getFullYear();
  mes=(momentoActual.getMonth() + 1); 
  dia=momentoActual.getDate();
  return horaImprimible ="("+dia+"/"+mes+"/"+año+")"+"("+hora + ":" + minuto + ":"+segundo+")";
};

//Recibo dato desde servidor
s_TCP.on('data', function(data){
  data= data.toString();
  console.log('Temperatura recibida: '+ data+"°C");
  io.emit('lectura',data);
  var dato1=data;
  dato2= String(dato1);
  s_UDP.send(dato2,5000,"127.0.0.1");
  fs.appendFile('data_sensor.txt','\n'+generar_tiempo()+' Temperatura almacenada: '+data+'°C', (error)=>{
    if(error) console.log(error);
  })
});