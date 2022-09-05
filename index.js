const express = require("express");
const app = express();
const cors = require("cors")
require('dotenv').config();

const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
        const lunchCollection = client.db("red_onion").collection("lunch");
        const dinnerCollection = client.db("red_onion").collection("dinner");
        const orderCollection = client.db("red_onion").collection("order");

        //get all breakfast
        app.get('/breakfast', async (req, res) => {
            const query = {};
            const breakfastResult = await breakfastCollection.find(query).toArray();
            res.send(breakfastResult)
        })

        //get all lunch
        app.get('/lunch', async (req, res) => {
            const query = {};
            const lunchResult = await lunchCollection.find(query).toArray();
            res.send(lunchResult)
        })
        //get all dinner
        app.get('/dinner', async (req, res) => {
            const query = {};
            const dinnerResult = await dinnerCollection.find(query).toArray();
            res.send(dinnerResult)
        });

        //get breakfast by id
        app.get('/breakfast/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const breakfast = await breakfastCollection.findOne(query);
            res.send(breakfast)
        })
        //get lunch by id
        app.get('/lunch/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const lunch = await lunchCollection.findOne(query);
            res.send(lunch)
        })
        //get dinner by id
        app.get('/dinner/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const dinner = await dinnerCollection.findOne(query);
            res.send(dinner)
        });

        //order post api
        app.post('/order', async (req, res) => {
            const order = req.body;
            const newOrder = await orderCollection.insertOne(order)
            res.send(newOrder)

        });
        //get order by email
        app.get('/orderByEmail', async (req, res) => {
            const email = req.query.email;
            const searchQuery = { email: email }
            const orders = await orderCollection.find(searchQuery).toArray();
            res.send(orders)
        });

        app.delete('/order/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await orderCollection.deleteOne(query);
            res.send(result)
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