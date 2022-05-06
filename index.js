const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

//database connection


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vpx0e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run () {
try{
    await client.connect();
    const bookCollection = client.db('bookManagement').collection('collection');
    app.get('/book' , async(req, res) => {
        const query = {};
        const cursor = bookCollection.find(query);
        const books = await cursor.toArray();
        res.send(books);

    } );
    app.get('/book/:id', async(req, res) =>{
        const id = req.params.id;
        const query={_id: ObjectId(id)};
        const books = await bookCollection.findOne(query);
        res.send(books);

    });

//post

app.post('/book' , async(res, res) => {
    const newBook = req.body;
    const result = await bookCollection.insertOne(newBook);
    res.send(result);
})


}
finally{

}
}
run().catch(console.dir);

//middle ware
app.use(cors());
app.use(express.json());

app.get('/', (req , res) => {
    res.send('Runnign car service server');
});

app.listen( port , () => {
    console.log("listern the port" , port);
})