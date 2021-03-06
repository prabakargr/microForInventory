const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const db = 'mongodb://kirupa:raja12@ds245772.mlab.com:45772/passportauth'


//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate our app
const app = express();
//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Error handlers & middlewares
if(!isProduction) {
    app.use(errorHandler());
  }

//Configure Mongoose
mongoose.connect(db,()=>{
    console.log('MongoDB connected')
});

// Models & routes
require('./models/inventory');
app.use(require('./routes'));

//Error handlers & middlewares
if(!isProduction) {
    app.use((err, req, res) => {
      res.status(err.status || 500);
  
      res.json({
        errors: {
          message: err.message,
          error: err,
        },
      });
    });
  }


  app.use((err, req, res) => {
    res.status(err.status || 500);
  
    res.json({
      errors: {
        message: err.message,
        error: {},
      },
    });
  });

  var port=process.env.PORT || (8001);

  app.listen(port, () => console.log(`Running on localhost:8001`));