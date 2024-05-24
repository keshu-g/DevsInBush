const message = {
  FETCH_SUCCESS: ["Item fetched successfully.", 200, true],
  CREATE_SUCCESS: ["Item created successfully", 201, true],
  CREATE_ERROR: ["Item creation error", 400, false],
  UPDATE_SUCCESS: ["Item updated successfully", 200, true],
  DELETE_SUCCESS: ["Item deleted successfully", 200, true],
  UPDATE_ERROR: ["Item update error", 400, false],
  DUPLICATE_ERROR: ["Item is already in use.", 409, false],
  INVALID_STATE: ["Item is not Valid", 422, false],
  REQUIRED: ["Item is required", 400, false],

  NOT_FOUND: ["Item not found", 404, false],
  SERVER_ERROR: ["Internal server error", 500, false],
  CUSTOM: ["Item", 500, false],

  ACCESS_DENIED: ["Access Denied", 403, false],
  INVALID_TOKEN: ["Invalid Token", 401, false],
  INVALID_LOGIN: ["Invalid Email or Password", 400, false],
  LOGIN_SUCCESS: ["Login successfully", 200, true],
};
module.exports = { message };
