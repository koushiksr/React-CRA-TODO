const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  name: String,
  description: String,
  email: String,
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
