let mqtt = require('mqtt');
let client = mqtt.connect('mqtt://localhost:1883');

let topic = "topic5"
let message = '"222.94,160,25.02,35.83,4"'
// let topic = "topic6"
// let message = 'S'


client.on('connect', () => {
    setInterval(() => {
        client.publish(topic, message);

        console.log('published:', message)
        console.log("_____________________________________")
    }, 5000);
})