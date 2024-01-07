const message = {
    FEATCH_SUCCESS: ["Item fetched successfully", 200, true],
    CREATE_SUCCESS: ["Item created successfully", 201, true],
    UPDATE_SUCCESS: ["Item updated successfully", 200, true],
    DELETE_SUCCESS: ["Item deleted successfully", 204, true],
    UPDATE_ERROR: ["Item update error", 400, false],
    DUPLICATE_ERROR: ["Item is already in use", 409, false],
    INVALID_STATE: ["Item is not Valid", 422, false],

    NOT_FOUND: ["Item not found", 404, false],
    UNAUTHORIZED: ["Unauthorized access", 401, false],
    FORBIDDEN: ["Access forbidden", 403, false],
    SERVER_ERROR: ["Internal server error", 500, false],
    CUSTOM: ["Item", 500, false],
};
module.exports = { message };