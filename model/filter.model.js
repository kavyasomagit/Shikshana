const mongoose = require('mongoose');

const filterSchema =  new mongoose.Schema({
    domainName: {type:String, required : true},
    filterName: {type:Array, require:true},
    filterOptions: {
        type: Map,
        of: [String]
      }
})

const Filter = mongoose.model('Filter', filterSchema);

module.exports = Filter;