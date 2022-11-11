const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const servicesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
servicesSchema.plugin(toJSON);
servicesSchema.plugin(paginate);

/**
 * @typedef Services
 */
const Services = mongoose.model('Services', servicesSchema);

module.exports = Services;
