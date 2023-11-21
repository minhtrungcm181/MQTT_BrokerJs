let mosca = require('mosca');
var settings = {
    port: 1883,
    stats: false,
    logger: {
    },
    http: {
        port: 1884,
        bundle: true
    },
};
let broker = new mosca.Server(settings);

broker.on('ready', () => {
    console.log('Broker ready !');
})
broker.on('published', (packet) => {
    topic = packet.topic.toString();
    message = packet.payload.toString();
    console.log(topic + ' ' + message);
})