let mosca = require('mosca');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const CSV_FILE = "mqtt_data.csv";
let message;
const csvWriter = createCsvWriter({
    path: CSV_FILE,
    header: [
        { id: 'value1', title: 'Value1' },
        { id: 'value2', title: 'Value2' },
        { id: 'value3', title: 'Value3' },
        { id: 'value4', title: 'Value4' }
    ]
});
function parseAndWriteToCsv(message) {
    const values = message.split(',').map(parseFloat);
    const record = {
        value1: values[0],
        value2: values[1],
        value3: values[2],
        value4: values[3]
    };
    csvWriter.writeRecords([record])
        .then(() => {
            console.log('Data written to CSV file');
        })
        .catch((err) => {
            console.error('Error writing data to CSV:', err);
        });
}

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

    // if (topic == "topic5"){
    // message = packet.payload.toString();
    // dataString = message.replace(/"/g, '');
    // let values = dataString.split(',');
//     const timestamp = new Date(); 
//     const formattedTimestamp = formatTimestamp(timestamp);
// // Convert the strings to numbers and assign them to variables
//     let vol = parseFloat(values[0]);
//     let cur = parseFloat(values[1]);
//     let pow = parseFloat(values[2]);
//     let trueP = parseFloat(values[3]);
//     const query = `
//       INSERT INTO energy_data (timestamp, voltage, current, power, true_power)
//       VALUES ($1, $2, $3, $4, $5)
//     `;
    
//     pool.query(query, [formattedTimestamp, vol, cur, pow, trueP]);
    // parseAndWriteToCsv(dataString)


// }

    message = packet.payload.toString();
   
    console.log(topic + ' ' + message);
})