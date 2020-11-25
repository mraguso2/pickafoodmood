import { useState, useEffect } from 'react';

const SuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="fill-current h-6 w-6 mr-4 icon-check"
  >
    <circle cx="12" cy="12" r="10" className="text-teal-300 primary" />
    <path
      className="text-teal-900 secondary"
      d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="fill-current w-6 mr-4 icon-close-circle"
  >
    <circle cx="12" cy="12" r="10" className="text-red-300 primary" />
    <path
      className="text-red-900 secondary"
      d="M13.41 12l2.83 2.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 1 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12z"
    />
  </svg>
);

const FlashWrapper = ({ cookies = '', children }) => {
  const [visibility, setVisibility] = useState(false);
  const [flashType, setType] = useState('');
  const [flashMess, setMessage] = useState('');

  const successBanner = {
    container: 'bg-teal-100 border-teal-500 text-teal-900',
    xOut: 'text-teal-900'
  };
  const errorBanner = {
    container: 'bg-red-100 border-red-500 text-red-900',
    xOut: 'text-red-900'
  };

  const fadeFlash = () => {
    setTimeout(() => {
      setVisibility(false);
    }, 4000);
  };

  const byeFlashNow = () => {
    setVisibility(false);
  };

  return (
    <>
      <div className="max-w-lg m-auto relative transition-all">
        <div
          className={`${
            flashType === 'success' ? successBanner.container : errorBanner.container
          } ${
            visibility ? 'showMe' : 'hideMe'
          } m-auto flash w-full border-t-4 rounded-b px-4 py-3 mt-12 shadow-md absolute transition ease-in-out duration-500`}
          role="alert"
        >
          <div className="flex align-center">
            <div className="py-1">{flashType === 'success' ? <SuccessIcon /> : <ErrorIcon />}</div>
            <div className="py-1">
              <p>{flashMess}</p>
            </div>
          </div>
          <span
            role="button"
            className="absolute top-0 bottom-0 right-0 px-2 py-1"
            onClick={() => byeFlashNow()}
          >
            <svg
              className={`fill-current h-6 w-6 ${
                flashType === 'success' ? successBanner.xOut : errorBanner.xOut
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
        <style jsx>{`
          .flash {
            transition: all 1.5s ease-in-out;
            opacity: 0;
            position: absolute;
            z-index: 99999999;
            transform: translateY(-200px);
          }
          .hideMe {
          }
          .showMe {
            opacity: 1;
            transform: translateY(0px);
          }
        `}</style>
      </div>
      {children}
    </>
  );
};

export default FlashWrapper;
