const express = require("express");
const app = express();
const cors = require("cors")
const port = 5000 || process.env.PORT;



//mongodb


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.SECRET_USER}:${process.env.SECRET_PASS}@cluster0.s7vy7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        client.connect();
        console.log('mongo connected')
    }
    catch {

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Red onion server is running')
})
app.listen(port, (req, res) => {
    console.log('listening to red onion port', port)
})