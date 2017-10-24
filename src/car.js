const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CarSchema = new Schema({
   color: {
       type: String
   },
   branch: {
       type: String
   }
});

module.exports = CarSchema;