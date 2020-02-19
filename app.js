//Initiallising node modules
const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const app = express();
const cors          = require('cors');
let login = false;

let proposedEndDate_Casted;
let actualStartedOn_Casted;
let actualEndedOn_Casted;
let assignedOn_Casted;

let actualStartedOnEdit_Casted;
let actualEndedOnEdit_Casted;
let assignedOnEdit_Casted;
let proposedEndDateEdit_Casted;

// Setting Base directory
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
//CORS Middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});



//Initiallising connection string
var dbConfig = {
    user: 'alok.kumar',
        password: 'infy@6176',
        server: 'spiderdevdbsrv.centralindia.cloudapp.azure.com',
        database: 'G7CR-SPIDERS-V1-Dev',
        port:25282
};

sql.connect(dbConfig, function (err) {
  if (err) {
    console.log("Error while connecting database :- " + err);
    res.send(err);
  }
  else{
    console.log('connected successfully nw as')
    login =true;
  }

});



//ALLOW PATHS WITHOUT TOKEN AUTHENTICATION


/* CREATE TOKEN FOR USE */

  app.get("/api/comment", function(req , res,next){

			var request = new sql.Request();
			// query to the database
			request.query("select * from ReadOnly.HelloWorld", function (err, recordset) {
				if (err) {
					console.log("Error while querying database :- " + err);
					res.send(err);
				}
				else {
          const attnd=[];
          let abc=recordset
          //console.log(abc.recordset)
          res.status(200).json({
            message:'hello world fetched successfully!!',
            attnd:abc.recordset
          })
				}
			});
	//	}
  });

  ///////////////////////////////////////////////////////////////////////////////
//Setting up server
var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
