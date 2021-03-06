// import React from 'react';
import { parse } from 'cookie';
import Map from '../components/Map';
import Layout from '../components/Layout';
import { checkAuthFn } from './api/authenticated';
import { getOuttaHere } from '../components/helpers';

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
    const { headers: { cookie = '' } = {} } = context.req;

    const cookieObj = parse(cookie);

    // no auth cookie - who dis?
    if (!cookieObj.auth) return getOuttaHere();

    const res = checkAuthFn(cookieObj);

    // user is not logged in - who dis?
    if (res.status === 401 && context.req && res.data.action === 'error') {
      return {
        // redirect returned from getServerSideProps
        redirect: {
          destination: '/login',
          permanent: false
        }
      };
    }

    return { props: {} };
  } catch (err) {
    console.error('Error: ', err);
    return { props: {} };
  }
}

export default Home;
