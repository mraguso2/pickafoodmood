export const choices = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Bar',
  'Truck/Cart',
  'Pizza',
  'American',
  'Thai',
  'Chinese',
  'Greek',
  'Italian',
  'Mexican'
];

export const prevDefaultOnEnter = e => {
  if (e.keyCode === 13) e.preventDefault();
};

export const passwordValidator = (password = '') => {
  // build attributes
  const rxUpper = /[A-Z]/;
  const rxLower = /[a-z]/;
  const rxNums = /[0-9]/;

  const response = {
    // maxLength: { status: true, message: 'Max 60 characters long' },
    minLength: { status: false, message: 'Min 8 characters long' },
    upper: { status: false, message: 'At least 1 UPPERCASE' },
    lower: { status: false, message: 'At least 1 lowercase' },
    numbers: { status: false, message: 'At least 1 number' }
  };

  response.minLength.status = password.length > 7;
  // response.maxLength.status = password.length < 60;
  response.upper.status = Boolean(password.match(rxUpper));
  response.lower.status = Boolean(password.match(rxLower));
  response.numbers.status = Boolean(password.match(rxNums));

  return response;
};

export const FailedAttempt = ({ message = '' }) => (
  <div className="flex justify-center w-full max-w-xs bg-red-200 text-red-900 rounded p-5 m-auto mt-6 mb-6 text-sm ">
    <p>{message}</p>
    <style jsx>{`
      .heading {
        font-family: 'Raleway', sans-serif;
      }
    `}</style>
  </div>
);

export const check = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-check">
    <path
      className="secondary"
      d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z"
    />
    <style jsx>{`
      .icon-check {
        fill: #4fd1c5;
        width: 24px;
        height: 24px;
        padding-right: 5px;
      }
    `}</style>
  </svg>
);

export const crissCross = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-close">
    <path
      className="secondary"
      fillRule="evenodd"
      d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
    />
    <style jsx>{`
      .icon-close {
        fill: #f56565;
        width: 24px;
        height: 24px;
      }
    `}</style>
  </svg>
);

export const checkAuth = async context => {
  const { cookie } = context.req.headers;
  const res = await fetch(`http://localhost:3000/api/locations`, {
    headers: {
      cookie
    }
  });
};
