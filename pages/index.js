import React from 'react';
import Router from 'next/router';
import Map from '../components/Map';
import Layout from '../components/Layout';

const Home = ({ locations = [] }) => (
  <Layout page="Home">
    <div className="hero">
      <h2 className="title text-gray-700 text-4xl">
        What's Your Food Mood?
        <br />
        <div className="text-2xl">
          <span className="pr-3" aria-label="Burger" role="img">
            🍔
          </span>
          <span className="pr-3" aria-label="Salad" role="img">
            🥗
          </span>
          <span className="pr-3" aria-label="Taco" role="img">
            🌮
          </span>
          <span aria-label="Pizza" role="img">
            🍕
          </span>
        </div>
      </h2>
    </div>
    <div className="flex justify-center m-4">
      <Map locations={locations} />
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        text-align: center;
        font-weight: 300;
      }
      div.mapboxgl-map ~ div > div {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
      }
    `}</style>
  </Layout>
);

export async function getServerSideProps(context) {
  try {
    // const { cookie } = context.req.headers;
    const { headers: { cookie } = {} } = context.req;

    const res = await fetch(`http://localhost:3000/api/authenticated`, {
      headers: {
        cookie
      }
    });

    const data = await res.json();

    // user is not logged in - who dis?
    if (res.status === 401 && context.req && data.action === 'error') {
      context.res.writeHead(302, {
        Location: `/login`
      });
      context.res.end();
    }

    return { props: {} };
  } catch (err) {
    console.error('Error: ', err);
    return { props: {} };
  }
}

// export async function getServerSideProps(context) {
//   const { cookie } = context.req.headers;
//   try {
//     const res = await fetch(`http://localhost:3000/api/locations`, {
//       headers: {
//         cookie
//       }
//     });

//     // if (res.status === 401) {
//     //   Router.replace('/signin');
//     //   return;
//     // }

//     const data = await res.json();
//     return { props: { locations: data } };
//   } catch (err) {
//     // TODO redirect to 404 location not find
//     console.error('Error: ', err);
//     return { props: {} };
//   }
// }

export default Home;
