const validation = (Schema) => async (req, res, next) => {
  try {
    const parsebody = await Schema.parseAsync(req.body);
    req.body = parsebody; // Assign the validated body back to req.body
    next();
  } catch (err) {
    const status = 422;
    const message = 'Enter Valid Details';
    const extraDetails = err.errors ? err.errors[0].message : 'Validation error';

    const error = {
      status,
      message,
      extraDetails,
    };
    res.status(status).json(error); // Send the error response directly
  }
}

module.exports = validation;
