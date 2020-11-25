import qs from 'qs';
import cookie from 'cookie';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from '../../Models/User';
import connectToDb from './db';
import catchErrors from '../../middleware/withErrorHandler';

const signup = async (req, res) => {
  await connectToDb().catch(err => new Error(err));
  const { method } = req;

  switch (method) {
    case 'POST': {
      // post data from db
      const parsedData = qs.parse(req.body);

      const existingEmail = await User.findOne({ email: parsedData.email });

      if (existingEmail) {
        res.json({ action: 'error', message: 'That email is already taken' });
        return res.end();
      }

      if (!existingEmail) {
        hash(parsedData.password, 11, async (err, hashed) => {
          // Store hash in your password DB.
          const dataWithHashBrowns = { ...parsedData, password: hashed };
          const newUser = await new User(dataWithHashBrowns).save();

          const claims = { sub: newUser._id, userEmail: newUser.email };
          const jwt = sign(claims, process.env.JWT_SECRET, { expiresIn: '7d' });
          res.setHeader(
            'Set-Cookie',
            cookie.serialize('auth', jwt, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== 'development',
              sameSite: 'strict',
              maxAge: 604800,
              path: `/`
            })
          );
          // res.writeHead(302, { Location: `/` });
          res.json({ action: 'success', message: 'Account successfully created', url: `/` });
          return res.end();
        });
      } else {
        // res.writeHead(302, { Location: `/signup?status=fail` });
        res.json({ action: 'error', message: 'Something went wrong!' });
        return res.end();
      }

      break;
    }
    default: {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

export default catchErrors(signup);
