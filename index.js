const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const cors = require("cors");

const app = express();

const fileUpload = require('express-fileupload')
const port = process.env.PORT || 8000;
// middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}>@cluster0.he93e.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.he93e.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("RealStateBD");
    const projectsCollection = database.collection("projects");
    const jobPostCollection = database.collection("jobPost");
    const blogDataCollection = database.collection("blogData");
    const appoinmentCollection = database.collection('appoinment');
    const ContactCollection = database.collection('contactRequest');
    const LandWonerCollection = database.collection('landWoner');
    const BuyerCollection = database.collection('buyer');
    const applicationCollection = database.collection('application');

    // GET API FOR PROJECTS
    app.get("/projects", async (req, res) => {
      const cursor = projectsCollection.find({});
      const projects = await cursor.toArray();
      res.send(projects);
    });
    // POST API FOR PROJECTS
    app.post("/projects", async (req, res) => {
      const product = req.body;
      const result = await projectsCollection.insertOne(product);
      console.log(result);
      res.json(result);
    });
    // DELETE API FOR PROJECTS
    app.delete("/projects/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const result = await projectsCollection.deleteOne(query);
      console.log(result);
      console.log("deleting user with id ", result);
      res.json(result);
    });
    // GET API JOB POST
    app.get("/jobPost", async (req, res) => {
      const cursor = jobPostCollection.find({});
      const jobPost = await cursor.toArray();
      res.send(jobPost);
    });
    // POST API FOR JOB POST
    app.post("/jobPost", async (req, res) => {
      const product = req.body;
      const result = await jobPostCollection.insertOne(product);
      console.log(result);
      res.json(result);
    });
    // DELETE API FOR JOB POST
    app.delete("/jobPost/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const result = await jobPostCollection.deleteOne(query);
      console.log(result);
      console.log("deleting user with id ", result);
      res.json(result);
    });
    // GET API FOR BLOG DATA
    app.get("/blogData", async (req, res) => {
      const cursor = blogDataCollection.find({});
      const blogData = await cursor.toArray();
      res.send(blogData);
    });
    // POST API FOR BLOG DATA
    app.post("/blogData", async (req, res) => {
      const product = req.body;
      const result = await blogDataCollection.insertOne(product);
      console.log(result);
      res.json(result);
    });
    // DELETE API FOR BLOG DATA
    app.delete("/blogData/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const result = await blogDataCollection.deleteOne(query);
      console.log(result);
      console.log("deleting user with id ", result);
      res.json(result);
    });

//Post method for appointment ---------------------------------------------Appoinment request
app.post("/appoinment", async(req,res)=>{
  const appoinment = req.body;
  const result = await appoinmentCollection.insertOne(appoinment);
  res.send(result);
  
})
app.get("/appoinment", async (req, res) => {
  const cursor = appoinmentCollection.find({});
  const appoinment = await cursor.toArray();
  res.json(appoinment);
});
 // DELETE API FOR Appoinment
 app.delete("/appoinment/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await appoinmentCollection.deleteOne(query);
  res.json(result);
});
//Post method for user contact -------------------------------------------user Contact request
app.post("/contactRequest", async(req,res)=>{
  const contactRequest = req.body;
  const result = await ContactCollection.insertOne(contactRequest);
  res.send(result);
  
})
app.get("/contactRequest", async (req, res) => {
  const cursor = ContactCollection.find({});
  const contactRequest = await cursor.toArray();
  res.json(contactRequest);
});
 // DELETE API FOR Appoinment
 app.delete("/contactRequest/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await ContactCollection.deleteOne(query);
  res.json(result);
});

//Post method for user LandWoner Contact ----------------------------------------LandWoner Contact
app.post("/landWoner", async(req,res)=>{
  const landWoner = req.body;
  const result = await LandWonerCollection.insertOne(landWoner);
  res.send(result);
  
})
app.get("/landWoner", async (req, res) => {
  const cursor = LandWonerCollection.find({});
  const landWoner = await cursor.toArray();
  res.json(landWoner);
});
 // DELETE API FOR Appoinment
 app.delete("/landWoner/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await LandWonerCollection.deleteOne(query);
  res.json(result);
});

//Post method for user Buyer Contact ----------------------------------------Buyer Contact

app.post("/buyer", async(req,res)=>{
  const buyer = req.body;
  const result = await BuyerCollection.insertOne(buyer);
  res.send(result);
})
app.get("/buyer", async (req, res) => {
  const cursor = BuyerCollection.find({});
  const buyer = await cursor.toArray();
  res.json(buyer);
});
 // DELETE API FOR Appoinment
 app.delete("/buyer/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await BuyerCollection.deleteOne(query);
  res.json(result);
});

//Post method for user Buyer Contact ---------------------------------------jobApplication

app.post("/application", async(req,res)=>{
  const application = req.body;
  const names= req.body.names;
  const number= req.body.number;
  const email= req.body.email;
  const position= req.body.position;
  const exp= req.body.exp;
  const resume = req.files.resume;
  const resumeData = resume.data;
  const encodeResume = resumeData.toString('base64');
  const resumeBuffer = Buffer.from(encodeResume, 'base64')
  const candidate={
    names,
    number,
    email,
    position,
    exp,
    resume:resumeBuffer
  }
  console.log(candidate)
  const result = await applicationCollection.insertOne(candidate)
  res.json({success:true});
  res.send(result);
  console.log(result);
  
})
//------------------------------------------get candidate
app.get('/application', async(req, res)=>{
  const cursor = applicationCollection.find({});
  const application = await cursor.toArray([]);
  res.json(application)
})
 // DELETE API FOR Appoinment
 app.delete("/application/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await applicationCollection.deleteOne(query);
  res.json(result);
});


  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Real estate Bangladesh Server is running ...");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
