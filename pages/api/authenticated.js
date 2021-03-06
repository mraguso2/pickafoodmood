import { verify } from 'jsonwebtoken';
import middleware from '../../middleware/withMiddleware';

const authenticated = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      // go through the auth middleware
      console.log('in authenticed GET');
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

// Rah Rah Rah Rewrite
// getServerSideProps() on the poages runs server side so do not need to fetch authenticate API
// can just run the auth verification directly in ServerSideProps fn
export const checkAuthFn = cookies => {
  const failedStatus = {
    status: 401,
    data: { action: 'error', message: 'Sorry, you are not authenticated' },
    user: undefined
  };

  if (!cookies) return failedStatus;

  const { auth: auth2 } = cookies;

  const res = verify(auth2, process.env.JWT_SECRET, (err, decoded) => {
    if (err || !decoded) {
      return failedStatus;
    }

    return {
      status: 200,
      data: { action: 'success', message: 'User is logged in' },
      user: decoded
    };
  });

  return res;
};
