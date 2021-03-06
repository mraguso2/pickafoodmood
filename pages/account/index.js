import { useState, useRef } from 'react';
import Router from 'next/router';
import { parse } from 'cookie';
import Layout from '../../components/Layout';
import { checkAuthFn } from '../api/authenticated';
import {
  prevDefaultOnEnter,
  passwordValidator,
  check,
  crissCross,
  FailedAttempt
} from '../../components/helpers';

const Profile = () => {
  const [isDisabled, setDisabled] = useState(false);
  const [pw1, setPW1] = useState('');
  const [pw2, setPW2] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    password2: ''
  });
  const [isUniqueEmail, setIsUniqueEmail] = useState({ show: false, status: false });
  const [failedSignup, setSignupAttempt] = useState({
    status: false,
    message: ''
  });
  const [newpwStatus, setnewpwStatus] = useState(passwordValidator());

  const emailInput = useRef(null);
  const fnameInput = useRef(null);
  const lnameInput = useRef(null);
  const pwInput = useRef(null);
  const pw2Input = useRef(null);
  const form = useRef(null);

  const handlepw1Change = () => {
    setPW1(pwInput.current.value);
    const pwMeetStandards = passwordValidator(pwInput.current.value);
    setnewpwStatus(pwMeetStandards);
  };

  const EmailTaken = () => (
    <p>
      Email Already Taken:{' '}
      <span style={{ color: '#067df7', textDecoration: 'underline', cursor: 'pointer' }}>
        Try Again
      </span>
    </p>
  );

  const checkEmail = async e => {
    const reggie = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    const email = emailInput.current.value;

    // check if some type of email before hit API
    if (email.match(reggie)) {
      try {
        const checkEmailUnique = await fetch('/api/checkemail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });

        const { unique, show } = await checkEmailUnique.json();
        setIsUniqueEmail({ ...isUniqueEmail, unique, show });
      } catch (err) {
        console.error(err);
      }
    }
  };

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
        form.reset();
        setDisabled(false);

        // show error logging in
        return setSignupAttempt({
          status: true,
          message: 'Signup failed. Please try again.'
        });
      }

      // handle successful login
      if (res.action === 'success') {
        setDisabled(false);
        // send to the homepage
        Router.push(`res.url`);
      }
    } catch (err) {
      setDisabled(false);
      setSignupAttempt({
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
          Profile
        </h1>
        {failedSignup.status ? <FailedAttempt message={failedSignup.message} /> : ''}
        <div className="flex justify-center w-full">
          <form
            // action="/api/signup"
            // method="POST"
            onSubmit={handleSubmit}
            onChange={handleChange}
            ref={form}
            className="relative w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 formWidth"
          >
            <div className="mb-4">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-5"
                htmlFor="email"
              >
                Your Email
                <input
                  className="shadow appearance-none w-full text-sm bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mt-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  ref={emailInput}
                  onKeyDown={e => prevDefaultOnEnter(e)}
                  onBlur={checkEmail}
                  placeholder="something@gmail.com"
                  autoComplete="email"
                  required
                />
              </label>
              <div
                className={`text-xs -mt-3 text-right font-medium ${
                  isUniqueEmail.show ? 'showMe' : 'hideMe'
                }`}
              >
                <p className={isUniqueEmail.unique ? 'succ' : 'err'}>
                  {isUniqueEmail.unique ? 'Email Available' : 'Email Already Taken'}
                </p>
              </div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-5 -mt-2"
                htmlFor="firstname"
              >
                First Name
                <input
                  className="shadow appearance-none w-full text-sm bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mt-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="firstname"
                  type="text"
                  name="firstname"
                  ref={fnameInput}
                  placeholder="Jack"
                  autoComplete="cc-given-name"
                  required
                />
              </label>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-5"
                htmlFor="lastname"
              >
                Last Name
                <input
                  className="shadow appearance-none w-full text-sm bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mt-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="lastname"
                  type="text"
                  name="lastname"
                  ref={lnameInput}
                  placeholder="Daniels"
                  autoComplete="cc-family-name"
                  required
                />
              </label>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-5"
                htmlFor="password"
              >
                Create Password
                <input
                  className="shadow appearance-none w-full text-sm bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mt-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  ref={pwInput}
                  placeholder="SuperSecretButUnforgettable"
                  autoComplete="new-password"
                  onChange={() => handlepw1Change()}
                  required
                />
              </label>
              <div className="fixWidthPw text-gray-600 bg-gray-100 text-xs m-auto mb-5 rounded">
                <p className="flex items-center">
                  <span>{newpwStatus.minLength.status ? check : crissCross}</span>
                  Min 8 characters long
                </p>
                <p className="flex items-center">
                  <span>{newpwStatus.upper.status ? check : crissCross}</span>
                  At least 1 UPPERCASE
                </p>
                <p className="flex items-center">
                  <span>{newpwStatus.lower.status ? check : crissCross}</span>
                  At least 1 lowercase
                </p>
                <p className="flex items-center">
                  <span>{newpwStatus.numbers.status ? check : crissCross}</span>
                  At least 1 number
                </p>
              </div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-5"
                htmlFor="password"
              >
                Confirm Password
                <input
                  className="shadow appearance-none w-full text-sm bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mt-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="confirmpassword"
                  type="password"
                  name="password2"
                  ref={pw2Input}
                  placeholder="The-Same-Password"
                  autoComplete="new-password"
                  onChange={() => setPW2(pw2Input.current.value)}
                  required
                />
              </label>
              <div
                className={`text-xs -mt-3 font-medium ${
                  pw1 !== '' && pw2 !== '' ? 'showMe' : 'hideMe'
                }`}
              >
                <p className={pw1 === pw2 ? 'succ' : 'err'}>
                  {pw1 === pw2 ? 'Match' : 'Do Not Match'}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                className={`bg-nxtBlue text-white mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline buttText ${
                  isDisabled ? 'disabled' : ''
                }`}
                type="submit"
              >
                Update Your Account
              </button>
            </div>
          </form>
          <style jsx>{`
            .succ {
              color: #4fd1c5;
            }
            .err {
              color: #f56565;
            }
            .showMe {
              opacity: 1;
            }
            .hideMe {
              opacity: 0;
            }
            .fixWidthPw {
              width: 180px;
            }
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

export default Profile;
