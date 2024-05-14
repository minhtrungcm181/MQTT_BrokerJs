let mqtt = require('mqtt');
let client = mqtt.connect('mqtt://localhost:1883');

// let topic = "topic5"
// let message = '"221.7,120,19.02,30.4,10.0"'
let topic = "topic6"
let message = 'S'


client.on('connect', () => {
    setInterval(() => {
        client.publish(topic, message);

        console.log('published:', message)
        console.log("_____________________________________")
    }, 5000);
})