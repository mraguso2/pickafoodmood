import { parse } from 'cookie';
import Layout from '../components/Layout';
import LocationForm from '../components/LocationForm';
import { checkAuthFn } from './api/authenticated';
import styles from '../styles/addlocation.module.css';

const AddLocation = () => (
  <Layout className="bg-gray-100 h-full" page="Add Location">
    <h1
      className={`text-white shadow-md headingPop text-5xl sm:text-6xl flex justify-center m-5 tracking-wide ${
        styles.headingBkg
      }`}
    >
      Add a Location
    </h1>
    <LocationForm />
    <style jsx>{`
      .headingPop {
        // background is being pulled in from 'styles'
        margin: 0 0 1.25rem;
        padding: 2rem 0 5rem;
        font-weight: 700;
        text-shadow: 2px 2px #2a4365;
        text-align: center;
        line-height: normal;
        background-color: #eff3ff;
      }
    `}</style>
  </Layout>
);

export async function getServerSideProps(context) {
  try {
    const { headers: { cookie = '' } = {} } = context.req;
    const cookieObj = parse(cookie);
    const res = checkAuthFn(cookieObj);
    // user is not logged in - who dis?
    if (res.status === 401 && context.req && res.data.action === 'error') {
      return {
        // redirect returned from getServerSideProps
        redirect: {
          destination: `/login`,
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

export default AddLocation;

// linear-gradient(135deg, #097cf6, #4dd9ff);
// linear-gradient(135deg, #4d51bf, #4dd9ff);
// linear-gradient(135deg, #4d51bf, #4dd9ff);
