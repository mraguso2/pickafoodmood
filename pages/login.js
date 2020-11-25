import { useRef, useState, useContext } from 'react';
import Router, { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { prevDefaultOnEnter, FailedAttempt } from '../components/helpers';
import UserContext from '../components/UserContext';

const Login = () => {
  const router = useRouter();
  const { urlAttempt = '' } = router.query;
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [failedLogin, setLoginAttempt] = useState({ status: false, message: '' });
  const [isDisabled, setDisabled] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const emailInput = useRef(null);
  const pwInput = useRef(null);
  const form = useRef(null);

  const handleChange = e => {
    // console.log(emailInput.current.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setDisabled(true);
    const data = formData;
    try {
      const checksOut = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const res = await checksOut.json();

      // handle error logging in
      if (res.action === 'error') {
        // form.current.reset();
        setDisabled(false);
        setUser('test');

        // show error logging in
        return setLoginAttempt({
          status: true,
          message: 'Username or Password is incorrect'
        });
      }

      // handle successful login
      if (res.action === 'success') {
        setDisabled(false);
        // send to the homepage
        Router.push(`${urlAttempt || res.url}`);
      }
      // welcome message on homepage
      // check if user is logged in and if so do not display signin or signup page
      // disable submit button after clicked - enable once response
    } catch (err) {
      setDisabled(false);
      setLoginAttempt({
        status: true,
        message: 'Something went wrong. Please try again.'
      });
      console.error(err);
    }
  };

  return (
    <Layout className="bg-gray-100 h-full" page="Sign In">
      <div className="mt-12">
        <h1 className="xtraHeadingText flex justify-center text-gray-800 text-4xl m-4 mb-2 tracking-wide">
          Login {user}
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
            <div className="flex items-center justify-center">
              <button
                className={`bg-nxtBlue text-white mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline buttText ${
                  isDisabled ? 'disabled' : ''
                }`}
                type="submit"
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
    const { cookie } = context.req.headers;
    const res = await fetch(`http://localhost:3000/api/authenticated`, {
      headers: {
        cookie
      }
    });

    const data = await res.json();

    // user is authenticated so don't show them LOGIN page
    if (res.status === 200 && context.req && data.action === 'success') {
      context.res.writeHead(302, {
        Location: '/'
      });
      context.res.end();
    }

    return { props: {} };
  } catch (err) {
    console.error('Error: ', err);
    return { props: {} };
  }
}

export default Login;
