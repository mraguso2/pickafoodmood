import qs from 'qs';
import crypto from 'crypto';
import User from '../../Models/User';
import connectToDb from './db';
import catchErrors from '../../middleware/withErrorHandler';

const forgot = async (req, res) => {
  await connectToDb().catch(err => new Error(err));
  const { method } = req;

  switch (method) {
    case 'POST': {
      // post data from db
      const parsedData = qs.parse(req.body);

      // 1. See if a user with that email exists
      const user = await User.findOne({ email: parsedData.email });

      if (!user) {
        res.json({ action: 'success', message: 'You have been emailed a password reset link.' });
        return res.end();
      }

      // 2. Set reset tokens and expiry on their account - values saved to user model
      user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
      await user.save();

      // 3. send them an email with the token
      const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
      console.log(resetURL);
      res.json({
        action: 'success',
        message: 'You have been emailed a password reset link.',
        url: `/login`
      });
      return res.end();
    }
    default: {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

export default catchErrors(forgot);
