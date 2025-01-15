
const errorsMiddleware = (err, req, res, next) => {
  
  const status = err.status || 500;
  const message = err.message || "Backend Errors"
  const extraDetails = err.extraDetails || "Error from Backend";

  console.error(`Error: ${message}, Details: ${extraDetails}`);

  return res.status(status).json({message, extraDetails});

}

module.exports = errorsMiddleware
