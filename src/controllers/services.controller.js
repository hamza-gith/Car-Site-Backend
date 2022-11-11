const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { servicesService } = require('../services');


const createService = catchAsync(async (req, res) => {
  const service = await servicesService.createService(req.body);
  res.status(httpStatus.CREATED).send(service);
})


const getAllServices = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await servicesService.queryServices(filter, options);
  res.send(result);
});


const getService = catchAsync(async (req, res) => {
  const service = await servicesService.getService(req.params.serviceId);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }
  res.send(service);
});


const updateService = catchAsync(async (req, res) => {
  const service = await servicesService.updateServiceById(req.params.serviceId, req.body);
  res.send(service);
});


const deleteService = catchAsync(async (req, res) => {
  await servicesService.deleteServiceById(req.params.serviceId);
  res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
  createService,
  getAllServices,
  getService,
  updateService,
  deleteService,
};
