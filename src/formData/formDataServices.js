var FormData = require("../../models/FormData");

let formDataServices = {
  createFormData: async function (formData) {
    try {
      return await FormData.create(formData);
    } catch (error) {
      return error;
    }
  },
  listFormsData: async function () {
    try {
      return await FormData.find({});
    } catch (error) {
      return error;
    }
  },
  showFormsData: async function (formDataId) {
    try {
      return await FormData.findById(formDataId).populate(
        "myOrders",
        "prouductId paidAmount"
      );
    } catch (error) {
      return error;
    }
  },
  findFormData: async function (formDataId) {
    try {
      return await FormData.findById(formDataId);
    } catch (error) {
      return error;
    }
  },
  updateFormData: async function (formDataId, formData) {
    try {
      return await FormData.findByIdAndUpdate(formDataId, formData, {
        new: true,
      });
    } catch (error) {
      return error;
    }
  },
  deleteFormData: async function (formDataId) {
    try {
      return await FormData.findByIdAndDelete(formDataId);
    } catch (error) {
      return error;
    }
  },
};

module.exports = formDataServices;
