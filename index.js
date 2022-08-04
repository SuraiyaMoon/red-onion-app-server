const express = require("express");
const app = express();
const cors = require("cors")
require('dotenv').config();

const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

//middleware

app.use(cors());
app.use(express.json());



//mongodb
const uri = `mongodb+srv://${process.env.SECRET_USER}:${process.env.SECRET_PASS}@cluster0.s7vy7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();

        const breakfastCollection = client.db("red_onion").collection("breakfast");

        app.get('/breakfast', async (req, res) => {
            const query = {};
            const breakfastResult = await breakfastCollection.find(query).toArray();
            res.send(breakfastResult)
        })

        console.log('mongo connected with route')
    }
    finally {

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Red onion server is running')
})
app.listen(port, (req, res) => {
    console.log('listening to red onion port', port)
})