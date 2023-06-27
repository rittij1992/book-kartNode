const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const Routes = require('./router/index');

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(express.raw());
app.use(express.static("public"));
const connectToDatabase = require('./configure/config_db');
connectToDatabase();

app.use('/', Routes);
app.listen(port, ()=>{
    console.log(`Server listening to http://localhost:${port}...`);
});