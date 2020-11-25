import qs from 'qs';
import cookie from 'cookie';
import Location from '../../../Models/Location';
import connectToDb from '../db';
import middleware from '../../../middleware/withMiddleware';

const flashy = (type, text) => ({
  flash: {
    type,
    text
  }
});

const locations = async (req, res) => {
  await connectToDb(); // need a catch on this or in the connectToDb()

  const { method } = req;

  switch (method) {
    case 'GET': {
      // get data from db
      const allLocations = await Location.find();
      res.status(200).json(allLocations);
      break;
    }
    case 'POST': {
      // post data from db
      const parsedData = qs.parse(req.body);
      const newLocation = await new Location(parsedData).save();
      // res.json(newLocation);
      const flashIt = JSON.stringify(flashy('success', 'New Location Created'));
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
      res.writeHead(302, { Location: `/p/${newLocation.slug}` });
      res.end();
      break;
    }
    default: {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

// export default locations;
export default middleware(locations);
