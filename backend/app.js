//Function that iterates over each patent to get legal status
const executeGetLegalInfo = require('./utils/legalInfoIterator.js')
const express = require('express')
const path= require('path')
const hbs = require('hbs')
const bodyParser = require("body-parser");


//Setup a new app
const app = new express()

const port = process.env.PORT || 3000;
//Important file paths defined
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsDirectoryPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Configuring express applications to use specific paths
app.use(bodyParser.json());
app.use(express.static(publicDirectoryPath))
app.set('view engine','hbs')
app.set('views',viewsDirectoryPath)
hbs.registerPartials(partialsPath)

//Route to display index page of Browser
app.get('',(req,res)=>{
    res.render('index', {
    })
})

//Route to handle information received from client side JavaScript
app.post('/submit', async (req, res) => {
    const data = req.body.data;
      const dataTobeSent = await executeGetLegalInfoAsync(data);
      debugger
      res.send(dataTobeSent);
  });
  
  // create promise to wait until response from API is received
  function executeGetLegalInfoAsync(data) {
    return new Promise((resolve, reject) => {
      executeGetLegalInfo(data, response => {
        resolve(response);
      }, error => {
        reject(error);
      });
    });
  }
  


app.listen(port,()=>{
    console.log('Server started correctly at '+port);
})

// executeGetLegalInfo(number, numberType, (data)=>{
//     console.log(data);
// });
  
