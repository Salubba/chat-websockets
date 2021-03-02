// Variables
const miWebSocket = new WebSocket('ws://localhost:8080');


var app = new Vue({
    el: '#app',
    data: {
        usuario: '',
        nuevoMensaje: '',
        mensajes: []
    },
    mounted: function () {
        this.iniciarWebSockets();
    },
    methods: {
        iniciarWebSockets: function () {
            // Funciones
            function open () {
                // Abre conexión
                console.log("WebSocket abierto.");
            }

            let message = (evento) => {
                // Se recibe un mensaje
                console.log("WebSocket ha recibido un mensaje");
                // Mostrar mensaje en HTML, push anyade un array
                this.mensajes.push(JSON.parse(evento.data));

            }

            function error (evento) {
                // Ha ocurrido un error
                console.error("WebSocket ha observado un error: ", evento);
            }

            function close () {
                // Cierra la conexión
                console.log("WebSocket cerrado.");
            }
            // Eventos de WebSocket
            miWebSocket.addEventListener('open', open);
            miWebSocket.addEventListener('message', message);
            miWebSocket.addEventListener('error', error);
            miWebSocket.addEventListener('close', close);

            },
            enviarMensaje: function () {
                miWebSocket.send(JSON.stringify({
                    usuario: this.usuario,
                    mensaje: this.nuevoMensaje
                }));
                //vaciamos input del nuevo mensaje
                this.nuevoMensaje = '';
            }

    }
})