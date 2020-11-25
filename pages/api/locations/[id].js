import qs from 'qs';
import cookie from 'cookie';
import Location from '../../../Models/Location';
import connectToDb from '../db';
// import catchErrors from '../../../middleware/withErrorHandler';
import middleware from '../../../middleware/withMiddleware';

const flashy = (type, text) => ({
  flash: {
    type,
    text
  }
});

const locationForm = async (req, res) => {
  await connectToDb();
  const {
    query: { id },
    method
  } = req;

  switch (method) {
    case 'GET': {
      // get one location from db
      const oneLocation = await Location.findOne({ slug: id });
      if (!oneLocation) {
        res.json({
          action: 'error',
          location: 'Not Found',
          message: 'Location could not be found.'
        });
        return;
      }
      res.json({ action: 'success', location: oneLocation });
      break;
    }
    case 'POST': {
      // update one location from db
      const parsedData = qs.parse(req.body);
      parsedData.location.type = 'Point';

      const updatedLocation = await Location.findOneAndUpdate({ _id: id }, parsedData, {
        new: true, // return the new store instead of the old one
        runValidators: true
        // setDefaultsOnInsert: true - this line would allow us to remove setting the location type above
      }).exec();
      const flashIt = JSON.stringify(flashy('success', 'Location Updated'));
      // console.log({ flashIt });
      // res.json({ updatedLocation, flashIt });
      // res.setHeader('X-Foo', 'bar');
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('flash', flashIt, {
          httpOnly: false,
          secure: process.env.NODE_ENV !== 'development',
          // sameSite: 'strict',
          maxAge: 60,
          path: `/`
          // path: `/p/${updatedLocation.slug}`
        })
      );
      res.writeHead(302, { Location: `/p/${updatedLocation.slug}` });
      res.end();
      break;
    }
    case 'DELETE': {
      // get one location from db
      await Location.deleteOne({ _id: id });
      res.json({ message: 'Location successfully deleted' });
      // res.writeHead(302, { Location: `/locations` });
      // res.end();
      break;
    }
    default: {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

export default middleware(locationForm);
