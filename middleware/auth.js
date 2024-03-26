exports.authenticateUser = async (req, res, next) => {
    try {
      // const data = req.body;
      //  AUTHENTICATE USER HERE
      next();
    } catch (error) {
      res.status(500).json({'status': "Not updated!"});
    }
  }