/*
 * Main App file App.js
 * @author Aditya Salman
 */

// Dependencies requirements, Express 4
var express = require('express');
var app = express();
var path = require('path');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require("mongoose");
var upload = require("express-fileupload");

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use('/app', express.static(__dirname + '/app'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(methodOverride());
app.use(upload());

app.use('/assets', [
  express.static(__dirname + '/node_modules/jquery/dist/'),
  express.static(__dirname + '/node_modules/bootstrap/dist/'),
  express.static(__dirname + '/node_modules/isotope-layout/dist/'),
  express.static(__dirname + '/node_modules/magnific-popup/dist/'),
  express.static(__dirname + '/node_modules/owl.carousel/'),
  express.static(__dirname + '/node_modules/angular/')
]);

routes = require('./routes/product')(app);
routes = require('./routes/about')(app);
routes = require('./routes/team')(app);

// MongoDB configuration
mongoose.connect('mongodb://localhost/gamatechno', function (err, res) {
  if (err) {
    console.log('error connecting to MongoDB Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

app.listen(8080);
console.log('Im listening on port 8080');


// First example router
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/LandingPage.html'));
});
app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/login.html'));
});
app.post('/dashboard', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  if (email == "admin@gmail.com" && password == '123') {
    res.redirect('/dashboard/');
  } else {
    res.redirect('back');
  }
});
app.get('/dashboard', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});
app.get('/halaman_team', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/team.html'));
});
app.get('/products', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/products.html'));
});
app.get('/clients', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/clients.html'));
});
app.get('/admin_editabout/:id', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/admin_editabout.html'));
});
app.get('/admin_inputteam', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/admin_inputteam.html'));
});
app.get('/admin_editteam', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/admin_editteam.html'));
});
app.get('/admin_editproducts', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/admin_editproducts.html'));
});
app.get('/admin_inputproducts', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/admin_inputproducts.html'));
});
app.get('/admin_editabout', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/admin_editabout.html'));
});
