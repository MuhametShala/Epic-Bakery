const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
    trim: true,
  },
  results: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

const Search = mongoose.model('Search', searchSchema);

module.exports = Search;
