import qs from 'qs';
import cookie from 'cookie';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from '../../Models/User';
import connectToDb from './db';
import catchErrors from '../../middleware/withErrorHandler';

const flashy = (type, text) => ({
  flash: {
    type,
    text
  }
});

const login = async (req, res) => {
  await connectToDb().catch(err => new Error(err));
  const { method } = req;

  switch (method) {
    case 'POST': {
      // post data from db
      const parsedData = qs.parse(req.body);

      const user = await User.findOne({ email: parsedData.email });

      // validate that user is defined and then check password
      if (!user) {
        return res.json({ action: 'error', message: 'Wrong Email or Password' });
      }

      const match = await compare(parsedData.password, user.password);

      // successful match sign jwt and cookie monster
      if (match) {
        const claims = { sub: user._id, userEmail: user.email, userFirstName: user.firstname };
        const jwt = sign(claims, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('auth', jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            // secure: false,
            sameSite: 'strict',
            maxAge: 604800,
            path: `/`
          })
        );
        res.json({ action: 'success', message: 'Successful Login', url: `/`, user: claims });
        return res.end();
      }
      // incorrect credentials
      res.json({ action: 'error', message: 'Something went wrong!' });
      res.end();
      break;
    }
    default: {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

export default catchErrors(login);
// export default signin;
