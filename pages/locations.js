import { useContext } from 'react';
import { parse } from 'cookie';
import Layout from '../components/Layout';
import LocationCard from '../components/LocationCard';
import NoLocations from '../components/NoLocations';
import UserContext from '../components/UserContext';
import { getAllLocations } from './api/locations/index';
import { getOuttaHere } from '../components/helpers';

// const AllLocations = ({ locations = [] }) => {
const AllLocations = props => {
  const { locations } = props;

  const { user } = useContext(UserContext);
  // console.log({ user });
  return (
    <Layout className="bg-gray-100 h-full" page="Locations">
      <h1 className="xtraHeadingText flex justify-center text-gray-800 text-4xl m-4 mb-2 tracking-wide">
        All The Locations
      </h1>
      <p className="text-xs italic flex justify-center text-indigo-600 tracking-wide uppercase mb-6">
        Oh, the places you'll go...for a bite to eat
      </p>
      <div className="flex flex-wrap justify-center w-full">
        <div className="w-full mt-8 mb-8">
          <ul className="flex justify-center flex-wrap">
            {locations && locations.length >= 1 ? (
              locations.map(loc => <LocationCard key={loc._id} location={loc} />)
            ) : (
              <NoLocations />
            )}
          </ul>
        </div>
      </div>
      <style jsx>
        {`
          .xtraHeadingText {
            font-family: 'Open Sans';
          }
        `}
      </style>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  try {
    const { url, headers: { cookie = '' } = {} } = context.req;
    const encodedURL = encodeURI(url);
    const cookieObj = parse(cookie);

    if (!cookieObj.auth) return getOuttaHere(encodedURL);

    const output = await getAllLocations(cookieObj);

    if (output.status === 401 && context.req) {
      return getOuttaHere(encodedURL);
    }

    const { data = {}, locations = '[]' } = output;

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    const noCerealizedLocs = JSON.parse(locations);
    return { props: { locations: noCerealizedLocs || [] } };
  } catch (err) {
    // TODO redirect to 404 location not find
    console.error('Error1: ', err);
    return { props: {} };
  }
}

export default AllLocations;
