import { useState, useRef, useEffect } from 'react';
import useWindowSize from './Hooks/useWindowSize';

const Hamburger = ({ isActive = false, setActive = () => {} }) => {
  const size = useWindowSize();
  const [showBurg, setBurg] = useState();
  const buttonRef = useRef();

  const handleClick = () => {
    buttonRef.current.classList.toggle('is-active');
    setActive(!isActive);
  };

  useEffect(() => {
    setBurg(size.width <= '515');
  }, [size]);
  return (
    <button
      className={`hamburger hamburger--collapse flex justify-center relative items-center ${
        !showBurg ? 'hideMe' : ''
      }`}
      type="button"
      aria-label="Menu"
      aria-controls="navigation"
      ref={buttonRef}
      onClick={() => handleClick()}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>
      <style jsx>
        {`
          .hamburger {
            padding: 15px 15px;
            cursor: pointer;
            transition-property: opacity, filter;
            transition-duration: 0.15s;
            transition-timing-function: linear;
            font: inherit;
            color: inherit;
            text-transform: none;
            background-color: transparent;
            border: 0;
            margin: 0;
            overflow: visible;
            z-index: 999999;
          }
          .hamburger:hover {
            opacity: 0.7;
          }
          .hamburger.is-active:hover {
            opacity: 0.7;
          }
          .hamburger.is-active .hamburger-inner,
          .hamburger.is-active .hamburger-inner::before,
          .hamburger.is-active .hamburger-inner::after {
            background-color: #2b4365;
          }

          .hamburger-box {
            width: 30px;
            height: 24px;
            display: inline-block;
            position: relative;
          }

          .hamburger-inner {
            display: block;
            top: 50%;
            margin-top: -2px;
          }
          .hamburger-inner,
          .hamburger-inner::before,
          .hamburger-inner::after {
            width: 30px;
            height: 3px;
            background-color: #2b4365;
            border-radius: 4px;
            position: absolute;
            transition-property: transform;
            transition-duration: 0.15s;
            transition-timing-function: ease;
          }
          .hamburger-inner::before,
          .hamburger-inner::after {
            content: '';
            display: block;
          }
          .hamburger-inner::before {
            top: -10px;
          }
          .hamburger-inner::after {
            bottom: -10px;
          }
          .hamburger--collapse .hamburger-inner {
            top: auto;
            bottom: 0;
            transition-duration: 0.13s;
            transition-delay: 0.13s;
            transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
          }
          .hamburger--collapse .hamburger-inner::after {
            top: -20px;
            transition: top 0.2s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
              opacity 0.1s linear;
          }
          .hamburger--collapse .hamburger-inner::before {
            transition: top 0.12s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
              transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19);
          }

          .hamburger--collapse.is-active .hamburger-inner {
            transform: translate3d(0, -10px, 0) rotate(-45deg);
            transition-delay: 0.22s;
            transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
          }
          .hamburger--collapse.is-active .hamburger-inner::after {
            top: 0;
            opacity: 0;
            transition: top 0.2s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
              opacity 0.1s 0.22s linear;
          }
          .hamburger--collapse.is-active .hamburger-inner::before {
            top: 0;
            transform: rotate(-90deg);
            transition: top 0.1s 0.16s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
              transform 0.13s 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
          }
          .hideMe {
            display: none;
          }
        `}
      </style>
    </button>
  );
};

export default Hamburger;
