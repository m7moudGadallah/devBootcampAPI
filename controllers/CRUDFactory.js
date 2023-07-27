const {
    catchAsync,
    sendSuccessResponse,
    AppError,
    APIFeatures,
} = require('../utils');

/**
 * Class representing a CRUD (Create, Read, Update, Delete) factory for a specific model.
 * @class CRUDFactory
 */
class CRUDFactory {
    /**
     * Create a CRUDFactory instance.
     * @constructor
     * @param {Model} model - The Mongoose model for which CRUD operations will be performed.
     * @param {Object} options - Additional options for the CRUDFactory.
     * @param {string} [options.docName='doc'] - The name of the documents managed by the model.
     */
    constructor(model, options = { docName }) {
        const { docName = 'doc' } = options;
        this.model = model;
        this.docName = docName;
    }

    /**
     * Get all documents from the specified model with advanced querying options.
     * @function getAll
     * @async
     * @param {Object} options - The options for retrieving the documents.
     * @param {string} [options.sortByFields=''] - The fields to sort the documents by. Use the following format: "field1,field2,-field3" (e.g., "id,-name") where a prefix of '-' indicates descending order.
     * @param {string} [options.selectedFields=''] - The fields to include in the returned documents. Use the following format: "field1, field2, -field3" (e.g., "id, name, -password") where a prefix of '-' indicates the field should be excluded from the query result.
     * @param {number} [options.page=1] - The page number for pagination.
     * @param {number} [options.limit=100] - The maximum number of documents per page.
     * @param {Array} [options.populates=[]] - The array of fields to populate in the document.
     * @returns {Function} - The async middleware function for retrieving the documents.
     */
    getAll(
        options = {
            sortByFields: '',
            selectedFields: '',
            page: 1,
            limit: 100,
            populates: [],
        }
    ) {
        const { sortByFields, selectedFields, page, limit, populates } = options;

        return catchAsync(async (req, res, next) => {
            // Create a separate count query without pagination
            const countDocs = async () => {
                const countQuery = new APIFeatures(req.query, this.model);
                const totalDocsCount = await countQuery
                    .filter()
                    .query.countDocuments();
                return totalDocsCount;
            };

            const count = await countDocs();

            const apiFeatures = new APIFeatures(req.query, this.model);

            const pagination = {};
            const docs = await apiFeatures
                .filter(populates)
                .sort(sortByFields)
                .select(selectedFields)
                .paginate(page, limit, pagination, count).query;

            sendSuccessResponse({ response: res }).JSON({
                count: docs.length,
                pagination,
                data: docs,
            });
        });
    }

    /**
     * Get a single document by ID from the specified model.
     * @function getOne
     * @async
     * @param {Object} options - The options for retrieving the document.
     * @param {Array} [options.populates=[]] - The array of fields to populate in the document.
     * @returns {Function} - The async middleware function for retrieving the document.
     */
    getOne(options = { populates: [] }) {
        const { populates } = options;

        return catchAsync(async (req, res, next) => {
            const query = this.model.findById(req.params.id);

            populates.forEach((item) => query.populate(item));

            const doc = await query;

            if (!doc) {
                return next(
                    new AppError(`No ${this.docName} found with that ID`, 404)
                );
            }

            doc.__v = undefined;

            sendSuccessResponse({ response: res }).JSON({
                data: doc,
            });
        });
    }

    /**
     * Create a new document in the specified model.
     * @function createOne
     * @async
     * @returns {Function} - The async middleware function for creating the document.
     */
    createOne() {
        return catchAsync(async (req, res, next) => {
            const newDoc = await this.model.create(req.body);

            newDoc.__v = undefined;

            sendSuccessResponse({ response: res, statusCode: 201 }).JSON({
                data: newDoc,
            });
        });
    }

    /**
     * Update a document by ID in the specified model.
     * @function updateOne
     * @async
     * @returns {Function} - The async middleware function for updating the document.
     */
    updateOne() {
        return catchAsync(async (req, res, next) => {
            const newDoc = await this.model.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );

            if (!newDoc) {
                return next(
                    new AppError(`No ${this.docName} found with that ID`, 404)
                );
            }

            newDoc.__v = undefined;

            sendSuccessResponse({ response: res }).JSON({
                data: newDoc,
            });
        });
    }

    /**
     * Delete a document by ID from the specified model.
     * @function deleteOne
     * @async
     * @returns {Function} - The async middleware function for deleting the document.
     */
    deleteOne() {
        return catchAsync(async (req, res, next) => {
            const doc = await this.model.findById(req.params.id);

            if (!doc) {
                return next(
                    new AppError(`No ${this.docName} found with that ID`, 404)
                );
            }

            doc.remove();

            sendSuccessResponse({ response: res }).JSON({
                data: null,
            });
        });
    }
}

module.exports = CRUDFactory;
