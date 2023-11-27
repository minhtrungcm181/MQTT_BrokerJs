let mqtt = require('mqtt');
var settings = {
    mqttServerUrl: "localhost",
    port: 1883,
    topic: "topic1"
}
var client = mqtt.connect('mqtt://' + settings.mqttServerUrl + ":" + settings.port);

client.on('message', function (topic, message) {
    topic = topic.toString()
    message = message.toString();
    console.log(topic + ' ' + message);
})
client.on('connect', () => {
    client.subscribe(settings.topic);
})