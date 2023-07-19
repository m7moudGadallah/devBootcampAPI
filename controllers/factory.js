const {
    catchAsync,
    sendSuccessResponse,
    AppError,
    APIFeatures,
} = require('../utils');

/**
 * Get all documents from the specified model with advanced querying options.
 * @function getAll
 * @param {object} options - The options for retrieving the documents.
 * @param {Model} options.model - The model to retrieve documents from.
 * @param {string} [options.sortByFields=''] - The fields to sort the documents by. Use the following format: "field1,field2,-field3" (e.g., "id,-name") where a prefix of '-' indicates descending order.
 * @param {string} [options.selectedFields=''] - The fields to include in the returned documents. Use the following format: "field1, field2, -field3" (e.g., "id, name, -password") where a prefix of '-' indicates the field should be excluded from the query result.
 * @param {number} [options.page=1] - The page number for pagination.
 * @param {number} [options.limit=100] - The maximum number of documents per page.
 * @param {string} [options.docsName='docs'] - The name to assign to the array of documents in the response data.
 * @returns {function} - The async middleware function for retrieving the documents.
 */
const getAll = ({
    model,
    sortByFields = '',
    selectedFields = '',
    page = 1,
    limit = 100,
    docsName = 'docs',
}) =>
    catchAsync(async (req, res, next) => {
        const apiFeatures = new APIFeatures(req.query, model);

        const docs = await apiFeatures
            .filter()
            .sort(sortByFields)
            .select(selectedFields)
            .paginate(page, limit).query;

        const data = {};
        data[docsName] = docs;

        sendSuccessResponse.JSON({
            response: res,
            results: docs.length,
            data,
        });
    });

/**
 * Get a single document by ID from the specified model.
 * @function getOne
 * @param {object} options - The options for retrieving the document.
 * @param {Model} options.model - The model to retrieve the document from.
 * @param {Array} [options.populates=[]] - The array of fields to populate in the document.
 * @param {string} [options.docName='doc'] - The name to assign to the document in the response data.
 * @returns {function} - The async middleware function for retrieving the document.
 */
const getOne = ({ model, populates = [], docName = 'doc' }) =>
    catchAsync(async (req, res, next) => {
        const doc = await model.findById(req.params.id);

        populates.forEach((item) => doc.populate(item));

        if (!doc) {
            return next(new AppError(`No ${docName} found with that ID`, 404));
        }

        doc.__v = undefined;

        const data = {};
        data[docName] = doc;

        sendSuccessResponse.JSON({
            response: res,
            data,
        });
    });

/**
 * Create a new document in the specified model.
 * @function createOne
 * @param {object} options - The options for creating the document.
 * @param {Model} options.model - The model to create the document in.
 * @param {string} [options.docName='doc'] - The name to assign to the created document in the response data.
 * @returns {function} - The async middleware function for creating the document.
 */
const createOne = ({ model, docName = 'doc' }) =>
    catchAsync(async (req, res, next) => {
        const newDoc = await model.create(req.body);

        newDoc.__v = undefined;

        data = {};
        data[docName] = newDoc;

        sendSuccessResponse.JSON({
            response: res,
            statusCode: 201,
            data,
        });
    });

/**
 * Update a document by ID in the specified model.
 * @function updateOne
 * @param {object} options - The options for updating the document.
 * @param {Model} options.model - The model to update the document in.
 * @param {string} [options.docName='doc'] - The name to assign to the updated document in the response data.
 * @returns {function} - The async middleware function for updating the document.
 */
const updateOne = ({ model, docName = 'doc' }) =>
    catchAsync(async (req, res, next) => {
        const newDoc = await model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!newDoc) {
            return next(new AppError(`No ${docName} found with that ID', 404`));
        }

        newDoc.__v = undefined;

        const data = {};
        data[docName] = newDoc;

        sendSuccessResponse.JSON({
            response: res,
            data,
        });
    });

/**
 * Delete a document by ID from the specified model.
 * @function deleteOne
 * @param {object} options - The options for deleting the document.
 * @param {Model} options.model - The model to delete the document from.
 * @param {string} [options.docName='doc'] - The name to assign to the deleted document in the response data.
 * @returns {function} - The async middleware function for deleting
 */
const deleteOne = ({ model, docName = 'doc' }) =>
    catchAsync(async (req, res, next) => {
        const doc = await model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new AppError(`No ${docName} found with that ID`, 404));
        }

        sendSuccessResponse.JSON({
            response: res,
            data: null,
        });
    });

module.exports = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
};
