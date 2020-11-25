import { useContext } from 'react';
import Router from 'next/router';
import Layout from '../components/Layout';
import LocationCard from '../components/LocationCard';
import NoLocations from '../components/NoLocations';
import UserContext from '../components/UserContext';

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
            {locations.length >= 1 ? (
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
    const { cookie } = context.req.headers;
    const res = await fetch(`http://localhost:3000/api/locations`, {
      headers: {
        cookie
      }
    });

    // client side but not needed with "getServerSideProps"
    // if (res.status === 401 && !context.req) {
    //   Router.replace('/signin');
    //   return;
    // }

    if (res.status === 401 && context.req) {
      context.res.writeHead(302, {
        Location: '/login'
      });
      context.res.end();
    }

    const data = await res.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }
    return { props: { locations: data } };
  } catch (err) {
    // TODO redirect to 404 location not find
    console.error('Error1: ', err);
    return { props: {} };
  }
}

export default AllLocations;
