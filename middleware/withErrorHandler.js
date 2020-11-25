const withErrorHandler = fn => async (req, res) => {
  try {
    // return new Promise(resolve => {
    //   fn(req, res, resolve);
    // });
    return await fn(req, res);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ exception: { code: 500, message: error.message } });
      return;
    }
    res.status(error.code || 500).json({ exception: error });
  }
};

export default withErrorHandler;
