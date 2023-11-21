let mqtt = require('mqtt');
var settings = {
    mqttServerUrl: "localhost",
    port: 1500,
    topic: "topic1"
}
var client = mqtt.connect('mqtt://' + settings.mqttServerUrl + ":" + settings.port);

client.on('message', function (topic, message) {
    message = message.toString();
    console.log(message);
})
client.on('connect', () => {
    client.subscribe(settings.topic);
})