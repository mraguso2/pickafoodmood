import qs from 'qs';
import { hash } from 'bcrypt';
import User from '../../Models/User';
import connectToDb from './db';
import catchErrors from '../../middleware/withErrorHandler';

const reset = async (req, res) => {
  await connectToDb().catch(err => new Error(err));
  const { method } = req;

  switch (method) {
    case 'GET': {
      const user = await User.findOne({
        resetPasswordToken: req.query.t,
        resetPasswordExpires: { $gt: Date.now() } // check the token is greater than now - $gt mongo fn
      });

      if (!user) {
        res.json({ action: 'error', message: 'Password reset is invalid or has expired' });
        return res.end();
      }

      // // if there is a user, show the reset password form
      res.json({ action: 'success' });
      return res.end();
    }

    case 'POST': {
      // post data from db
      const { resetToken, password } = qs.parse(req.body);

      // See if a user with that token exists and not past expiry date
      const user = await User.findOne({
        resetPasswordToken: resetToken,
        resetPasswordExpires: { $gt: Date.now() } // check the token is greater than now - $gt mongo fn
      });

      // No user found
      if (!user) {
        res.json({ action: 'error', message: 'Password reset is invalid or has expired' });
        return res.end();
      }

      hash(password, 11, async (err, hashed) => {
        // Store hash in your password DB.
        // Save user with new password and clear token and expiry date
        user.password = hashed;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.json({ action: 'success', message: 'Your password has been successfully updated' });
        return res.end();
      });

      break;
    }
    default: {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

export default catchErrors(reset);
