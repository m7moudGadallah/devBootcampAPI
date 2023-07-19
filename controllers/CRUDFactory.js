const {
    catchAsync,
    sendSuccessResponse,
    AppError,
    APIFeatures,
} = require('../utils');

/**
 * Factory function for creating controller methods for CRUD operations on a specified model.
 * @function factory
 * @param {object} options - The options for creating the controller methods.
 * @param {Model} options.model - The model to perform CRUD operations on.
 * @param {string} [options.docName='doc'] - The name to assign to the document in the response data.
 * @returns {object} - The controller methods object.
 */
const factory = function ({ model, docName = 'doc' }) {
    // error used when id isn't passed on req.params
    const idError = new AppError(`Please provide ${docName} id`, 404);

    /**
     * Get all documents from the specified model with advanced querying options.
     * @function getAll
     * @param {object} options - The options for retrieving the documents.
     * @param {string} [options.sortByFields=''] - The fields to sort the documents by. Use the following format: "field1,field2,-field3" (e.g., "id,-name") where a prefix of '-' indicates descending order.
     * @param {string} [options.selectedFields=''] - The fields to include in the returned documents. Use the following format: "field1, field2, -field3" (e.g., "id, name, -password") where a prefix of '-' indicates the field should be excluded from the query result.
     * @param {number} [options.page=1] - The page number for pagination.
     * @param {number} [options.limit=100] - The maximum number of documents per page.
     * @returns {function} - The async middleware function for retrieving the documents.
     */
    const getAll = ({
        sortByFields = '',
        selectedFields = '',
        page = 1,
        limit = 100,
    }) =>
        catchAsync(async (req, res, next) => {
            const apiFeatures = new APIFeatures(req.query, model);

            const docs = await apiFeatures
                .filter()
                .sort(sortByFields)
                .select(selectedFields)
                .paginate(page, limit).query;

            const data = {};
            const docsName = `${docName}s`;
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
     * @param {Array} [options.populates=[]] - The array of fields to populate in the document.
     * @returns {function} - The async middleware function for retrieving the document.
     */
    const getOne = ({ populates = [] }) =>
        catchAsync(async (req, res, next) => {
            const { id } = req.params;

            if (!id) {
                return next(idError);
            }

            const doc = await model.findById(id);
            console.log(doc);

            populates.forEach((item) => doc.populate(item));

            if (!doc) {
                return next(
                    new AppError(`No ${docName} found with that ID`, 404)
                );
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
     * @returns {function} - The async middleware function for creating the document.
     */
    const createOne = () =>
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
     * @returns {function} - The async middleware function for updating the document.
     */
    const updateOne = () =>
        catchAsync(async (req, res, next) => {
            const { id } = req.params;

            if (!id) {
                return next(idError);
            }

            const newDoc = await model.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
            });

            if (!newDoc) {
                return next(
                    new AppError(`No ${docName} found with that ID', 404`)
                );
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
     * @returns {function} - The async middleware function for deleting the document.
     */
    const deleteOne = () =>
        catchAsync(async (req, res, next) => {
            const { id } = req.params;

            if (!id) {
                return next(idError);
            }

            const doc = await model.findByIdAndDelete(id);

            if (!doc) {
                return next(
                    new AppError(`No ${docName} found with that ID`, 404)
                );
            }

            sendSuccessResponse.JSON({
                response: res,
                data: null,
            });
        });

    return {
        getAll,
        getOne,
        createOne,
        updateOne,
        deleteOne,
    };
};

module.exports = factory;
