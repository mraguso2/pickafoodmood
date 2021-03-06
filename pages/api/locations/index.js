import qs from 'qs';
import cookie from 'cookie';
import Location from '../../../Models/Location';
import connectToDb from '../db';
import middleware from '../../../middleware/withMiddleware';
import { checkAuthFn } from '../authenticated';

const flashy = (type, text) => ({
  flash: {
    type,
    text
  }
});

const locations = async (req, res) => {
  await connectToDb(); // need a catch on this or in the connectToDb()

  const { method, cookies } = req;

  // return;
  switch (method) {
    case 'POST': {
      // post data from db
      const parsedData = qs.parse(req.body);

      const updatedData = { ...parsedData, author: req.user.sub };

      const newLocation = await new Location(updatedData).save();
      // res.json(newLocation);
      // const flashIt = JSON.stringify(flashy('success', 'New Location Created'));
      // res.setHeader(
      //   'Set-Cookie',
      //   cookie.serialize('flash', flashIt, {
      //     httpOnly: false,
      //     secure: process.env.NODE_ENV !== 'development',
      //     // sameSite: 'strict',
      //     maxAge: 60,
      //     path: `/`
      //     // path: `/p/${updatedData.slug}`
      //   })
      // );
      // console.log(process.ENV);
      res.writeHead(200, { Location: `http://localhost:3000/p/${newLocation.slug}` });
      res.end();
      break;
    }
    default: {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

// export default locations;
export default middleware(locations);

// Rah Rah Rah Rewrite it as FN instead of Api call
// Get All Locations
export const getAllLocations = async cookie => {
  await connectToDb();

  // check if user is logged in
  const authorizer = checkAuthFn(cookie);
  if (authorizer.status === 401) return authorizer;

  const allLocations = await Location.find();
  const cerealizedLocs = JSON.stringify(allLocations);

  return {
    status: 200,
    data: { action: 'success', message: 'All locations found' },
    locations: cerealizedLocs
  };
};
