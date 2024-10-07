const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log error stack
  
    // Send a generic response to the client
    res.status(err.status || 500).json({
      message: err.message || 'Something went wrong!',
      status: err.status || 500,
    });
  };
  
  module.exports = errorHandler;