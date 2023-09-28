var express = require("express");
var controller = require("./controller");

var api = express.Router();

api.get("/", controller.list)
api.post("/", controller.create);
api.delete("/:id", controller.deleteEntity);
api.put("/:id", controller.update);
api.get("/:id", controller.get);

module.exports = api;