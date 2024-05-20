let mqtt = require('mqtt');
const pool = require('./dbconnector')
var settings = {
    mqttServerUrl: "localhost",
    port: 1883,
    topic: "topic5"
}
var client = mqtt.connect('mqtt://' + settings.mqttServerUrl + ":" + settings.port);
function connectToDatabase() {
    try {
      // Connect to the database pool
      pool.connect();
      console.log('Connected to PostgreSQL database');
    } catch (err) {
      console.error('Error connecting to PostgreSQL database:', err);
    }
  }
function formatTimestamp(timestamp) {
    const day = String(timestamp.getDate()).padStart(2, '0');
    const month = String(timestamp.getMonth() + 1).padStart(2, '0');
    const year = timestamp.getFullYear();
    const hour = String(timestamp.getHours()).padStart(2, '0');
    const minute = String(timestamp.getMinutes()).padStart(2, '0');
    const second = String(timestamp.getSeconds()).padStart(2, '0');
  
    return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
  }


  var vol, cur, pow, trueP, kwh;

function insertDB(vol, cur, pow, trueP, kwh) {
  if (vol > 0 && vol < 235 && kwh > 0){
  const timestamp = new Date(); 
  const formattedTimestamp = formatTimestamp(timestamp);
  const query = `INSERT INTO power (timestamp, voltage, current, power, true_power, kwh)
          VALUES ($1, $2, $3, $4, $5, $6)`;

        pool.query(query, [formattedTimestamp, vol, cur, pow, trueP, kwh]); 
        console.log('Data inserted successfully');
        console.log('------------------------');  }
} 

  client.on('message', function (topic, message) {
    topic = topic.toString()
    message = message.toString()
   
  
      if (topic == "topic5"){
        dataString = message.replace(/"/g, '');
        let values = dataString.split(',');
   
        vol = parseFloat(values[0]);
        cur = parseFloat(values[1]);
        pow = parseFloat(values[2]);
        trueP = parseFloat(values[3]);
        kwh = parseFloat(values[4]);
      }

 
    //       // Call the function again after 15 seconds
    //     setInterval(() => {
    //         const query = `
    //           INSERT INTO energy_data (timestamp, voltage, current, power, true_power, kwh)
    //           VALUES ($1, $2, $3, $4, $5, $6)
    //         `;
            
    //         pool.query(query, [formattedTimestamp, vol, cur, pow, trueP, kwh]); 
    //         console.log('Data inserted successfully');
    //         console.log('------------------------');   
    //     }, 9000)
       
    
    // }
      
  } 
)
setInterval(() => {
  insertDB(vol, cur, pow, trueP, kwh);
}, 90000);

    

client.on('connect', () => {
    connectToDatabase()
    client.subscribe(settings.topic);
})