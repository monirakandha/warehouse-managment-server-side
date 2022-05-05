const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

//database connection


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vpx0e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log("Book Service DB Connected");
  // perform actions on the collection object
  client.close();
});

//middle ware
app.use(cors());
app.use(express.json());

app.get('/', (req , res) => {
    res.send('Runnign car service server');
});

app.listen( port , () => {
    console.log("listern the port" , port);
})