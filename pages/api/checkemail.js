import qs from 'qs';
import User from '../../Models/User';
import connectToDb from './db';
import catchErrors from '../../middleware/withErrorHandler';

const checkEmail = async (req, res) => {
  await connectToDb().catch(err => new Error(err));
  const { method } = req;

  switch (method) {
    case 'POST': {
      // post data from db
      const parsedData = qs.parse(req.body);
      const emailExists = await User.findOne({ email: parsedData.email });

      if (emailExists) {
        res.json({
          action: 'error',
          unique: false,
          show: true,
          message: 'That email is already taken'
        });
        return res.end();
      }
      res.json({ action: 'success', unique: true, show: true, message: 'Email is available' });
      res.end();
      break;
    }
    default: {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

export default catchErrors(checkEmail);
