const mongoose = require("mongoose");

const RoleSchemaDef = new mongoose.Schema({
    name: String
});

const Role = mongoose.model("Role", RoleSchemaDef);

module.exports = Role;