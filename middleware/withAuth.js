import { verify } from 'jsonwebtoken';
import { parse } from 'cookie';

const withAuth = fn => async (req, res) => {
  // const { auth } = parse(req.headers.cookie);
  const { auth: auth2 } = req.cookies;
  return verify(auth2, process.env.JWT_SECRET, async (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).json({ action: 'error', message: 'Sorry, you are not authenticated' });
    }

    console.log('running handler after auth');

    // add user to the req object
    req.user = decoded;

    await fn(req, res);
  });
};

export default withAuth;
