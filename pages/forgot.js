import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const Forgot = () => {
  const router = useRouter();
  const [userEmail, setEmail] = useState({});
  const [isDisabled, setDisabled] = useState(false);

  const emailInput = useRef(null);
  const form = useRef(null);

  const handleChange = e => {
    setEmail({ email: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setDisabled(true);
    const data = userEmail;
    try {
      const forgetful = await fetch('/api/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const res = await forgetful.json();

      // handle error logging in
      // if (res.action === 'error') {
      //   // form.current.reset();
      //   setDisabled(false);

      //   // show error logging in
      //   return setLoginAttempt({
      //     status: true,
      //     message: 'Username or Password is incorrect'
      //   });
      // }

      // handle successful login
      if (res.action === 'success') {
        setDisabled(false);
        // send to the homepage
        window.location = 'http://localhost:3000/login';
        // router push is not working for some reason
        // router.push('../login');
      }
      // welcome message on homepage
      // check if user is logged in and if so do not display signin or signup page
      // disable submit button after clicked - enable once response
    } catch (err) {
      setDisabled(false);
      // setLoginAttempt({
      //   status: true,
      //   message: 'Something went wrong. Please try again.'
      // });
      console.error(err);
    }
  };

  return (
    <Layout className="bg-gray-100 h-full" page="Forgot Password">
      <div className="mt-12">
        <h1 className="xtraHeadingText flex justify-center text-gray-800 text-4xl m-4 mb-2 tracking-wide">
          Forgot Password?
        </h1>
        <div className="flex flex-col items-center justify-center w-full">
          <form
            // action="/api/login"
            // method="POST"
            onSubmit={handleSubmit}
            onChange={handleChange}
            className="relative w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 formWidth"
            ref={form}
          >
            <div className="mb-4">
              <p className="tracking-wide text-gray-700 text-sm mb-5">
                Enter your email and we will send you a password reset link
              </p>
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
                  placeholder="something@email.com"
                  autoComplete="email"
                  required
                />
              </label>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-nxtBlue text-white mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline buttText "
                type="submit"
                disabled={isDisabled}
              >
                Send a Reset Link
              </button>
            </div>
          </form>
          <div className="flex flex-col justify-center items-center">
            <h4 className="text-gray-800 text-xl m-4 mb-2 tracking-wide">Other Account Options</h4>
            <div className="flex justify-between w-40">
              <Link href="/login">
                <a className="text-gray-600 underline">Login</a>
              </Link>
              <Link href="/signup">
                <a className="text-gray-600 underline">Sign Up</a>
              </Link>
            </div>
          </div>
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

export default Forgot;
