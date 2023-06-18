const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const Routes = require('./router/index');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const connectToDatabase = require('./configure/config_db');
connectToDatabase();

app.use('/', Routes);
app.listen(port, ()=>{
    console.log(`Server listening to http://localhost:${port}...`);
});