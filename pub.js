let mqtt = require('mqtt');
let client = mqtt.connect('mqtt://localhost:1500');

let topic = "topic1"
let message = "1"

client.on('connect', () => {
    setInterval(() => {
        client.publish(topic, message);

        console.log('published:', message)
    }, 5000);
})