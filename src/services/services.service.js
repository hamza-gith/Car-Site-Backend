const httpStatus = require('http-status');
const { Services } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * create a service
 * @param {Object} serviceBody 
 * @return {Promise<Service>}
*/
const createService = async (serviceBody) => {
  const service = await Services.create(serviceBody);
  return service;
}

/**
 * Query for services
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryServices = async (filter, options) => {
  const services = await Services.paginate(filter, options);
  return services;
};

/**
 * Get service by id
 * @param {ObjectId} id
 * @returns {Promise<Service>}
 */
const getService = async (id) => {
  return Services.findById(id);
};

/**
 * Update service by id
 * @param {ObjectId} serviceId
 * @param {Object} updateBody
 * @returns {Promise<Service>}
 */
const updateServiceById = async (serviceId, updateBody) => {
  const service = await getService(serviceId);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }
  Object.assign(service, updateBody);
  await service.save();
  return service;
};

/**
 * Delete service by id
 * @param {ObjectId} serviceId
 * @returns {Promise<Service>}
 */
const deleteServiceById = async (serviceId) => {
  const service = await getService(serviceId);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }
  await service.remove();
  return service;
};

module.exports = {
  createService,
  queryServices,
  getService,
  updateServiceById,
  deleteServiceById,
};
