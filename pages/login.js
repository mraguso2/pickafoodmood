import { useRef, useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parse } from 'cookie';
import Layout from '../components/Layout';
import { prevDefaultOnEnter, FailedAttempt } from '../components/helpers';
import { checkAuthFn } from './api/authenticated';
import UserContext from '../components/UserContext';

const Login = () => {
  const router = useRouter();
  const { urlAttempt = '' } = router.query;
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [failedLogin, setLoginAttempt] = useState({ status: false, message: '' });
  const [isDisabled, setDisabled] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const emailInput = useRef(null);
  const pwInput = useRef(null);
  const form = useRef(null);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // send to the homepage or urlattempt
    // const gotoURL = urlAttempt || res.url;
    if (isLoggedIn) {
      router.push(`${urlAttempt || '/'}`);
    }
  }, [isLoggedIn]);

  const handleSubmit = async e => {
    e.preventDefault();
    setDisabled(true);
    const data = formData;
    try {
      const checksOut = await fetch('/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const res = await checksOut.json();

      // handle error logging in
      if (res.action === 'error') {
        setDisabled(false);
        setUser('');
        pwInput.current.value = '';

        // show error logging in
        return setLoginAttempt({
          status: true,
          message: 'Username or Password is incorrect'
        });
      }

      // handle successful login
      if (res.action === 'success') {
        setDisabled(false);
        setUser(res.user);
        setLoggedIn(true);
        // router.push('/', undefined, { shallow: true });
        // router.reload();
      }
    } catch (err) {
      setDisabled(false);
      setUser('');
      setLoginAttempt({
        status: true,
        message: 'Something went wrong. Please try again.'
      });
      console.error(err);
    }
  };

  return (
    <Layout className="bg-gray-100 h-full" page="Login">
      <div className="mt-12">
        <h1 className="xtraHeadingText flex justify-center text-gray-800 text-4xl m-4 mb-2 tracking-wide">
          Login
        </h1>
        {failedLogin.status ? <FailedAttempt message={failedLogin.message} /> : ''}
        <div className="flex justify-center w-full">
          <form
            // action="/api/login"
            // method="POST"
            onSubmit={handleSubmit}
            onChange={handleChange}
            className="relative w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 formWidth"
            ref={form}
          >
            <div className="mb-4">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-5"
                htmlFor="email"
              >
                Email
                <input
                  className="shadow appearance-none w-full text-sm bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mt-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  ref={emailInput}
                  onKeyDown={e => prevDefaultOnEnter(e)}
                  placeholder="something@gmail.com"
                  autoComplete="email"
                  required
                />
              </label>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-5"
                htmlFor="password"
              >
                Password
                <input
                  className="shadow appearance-none w-full text-sm bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mt-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  ref={pwInput}
                  placeholder="SuperSecretButUnforgettable"
                  autoComplete="current-password"
                  required
                />
              </label>
            </div>
            <Link href="/forgot">
              <a className="forgot text-right block">Forgot your password?</a>
            </Link>
            <div className="flex items-center justify-center">
              <button
                className="bg-nxtBlue text-white mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline buttText "
                type="submit"
                disabled={isDisabled}
              >
                Sign In
              </button>
            </div>
          </form>
          <style jsx>{`
            .xtraHeadingText {
              font-family: 'Open Sans';
            }
            .moveUp {
              top: -3.5rem;
            }
            .bg-nxtBlue {
              background-color: #2a4365;
              border: 1px solid #2a4365;
            }
            .bg-nxtBlue:hover {
              background-color: #2a4365;
              border: 1px solid #2a4365;
            }
            .forgot {
              color: #067df7;
              text-decoration: none;
              font-size: 14px;
            }
            @media only screen and (max-device-width: 480px) {
              .formWidth {
                width: 340px;
                padding-left: 1.5rem;
                padding-right: 1.5rem;
              }
              .buttText {
                font-size: 14px;
              }
            }
          `}</style>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  try {
    const { headers: { cookie = '' } = {} } = context.req;
    const cookieObj = parse(cookie); // parse string of cookies

    // no auth cookie - who dis?
    if (!cookieObj.auth) return { props: {} };

    const res = checkAuthFn(cookieObj);

    // user is authenticated so don't show them LOGIN page
    if (res.status === 200 && context.req && res.data.action === 'success') {
      return {
        // redirect returned from getServerSideProps
        redirect: {
          destination: '/',
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

export default Login;
