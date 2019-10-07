const express = require("express");

const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require("./controllers/SessionController");
const SpotController = require("./controllers/SpotController");
const DashboardController = require("./controllers/DashboardController");
const BookingController = require("./controllers/BookingController");

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post("/sessions", SessionController.store );

routes.get("/spot", SpotController.index );
routes.post("/spot", upload.single('thumbnail'), SpotController.store );

routes.get("/dashboard", DashboardController.show );

routes.post("/spot/:spot_id/booking", BookingController.store );

module.exports = routes;
