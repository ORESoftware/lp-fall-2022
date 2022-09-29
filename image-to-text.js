
const vision = require('@google-cloud/vision');
const path = require('path');

async function quickstart() {
    // Imports the Google Cloud client library

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Performs label detection on the image file
    const [result] = await client.labelDetection(path.resolve(process.env.HOME + '/Desktop/text.png'));
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
}
quickstart();