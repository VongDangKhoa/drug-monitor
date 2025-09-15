const express = require('express');// As in the server.js
const route = express.Router(); //Allows us use express router in this file

// Import đúng các hàm render (nếu sai đường dẫn => undefined)
const services = require('../services/render');//uses the render.js file from services here

console.log('render services exported keys:', Object.keys(services));


const controller = require('../controller/controller');//uses the render.js file from services here
//middelware
const validateDrug = require('../../middleware/validateDrug');

//web
route.get('/', services.homeRoutes);
route.get('/add-drug', services.addDrug);
route.get('/update-drug', services.updateDrug);
route.get('/check-dosage', services.checkDosage);
route.get('/manage', services.manage);
route.get('/purchase', services.purchase);


// API for CRUD operations
route.post('/api/drugs', validateDrug, controller.create);
route.get('/api/drugs', controller.find);
route.put('/api/drugs/:id', validateDrug, controller.update);
route.delete('/api/drugs/:id', controller.delete);

module.exports = route;//exports this so it can always be used elsewhere
