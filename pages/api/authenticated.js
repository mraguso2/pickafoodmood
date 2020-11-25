import middleware from '../../middleware/withMiddleware';

const authenticated = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      // go through the auth middleware
      res.json({ action: 'success', message: 'User is logged in', user: req.user });
      res.end();
      break;
    }
    default: {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

export default middleware(authenticated);
