import Link from 'next/link';
import { useState, useEffect } from 'react';
import Nav from './nav';
import Hamburger from './Hamburger';

const Header = () => {
  const [activeMenu, setMenu] = useState(false);

  return (
    <div className="bigBox flex items-center justify-between pt-2 pb-2 relative">
      <div className="stripes">
        <span className="one" />
        <span className="two" />
        <span className="three" />
        <span />
        <span />
      </div>

      <Link href="/">
        <a className="relative bringUp">
          <div className="flex align-center shrinkIt">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="580 -100 2550 2025"
              className="logo ml-2 twistIt"
            >
              <g transform="matrix(1 0 0 -1 0 1638)">
                <path
                  fill="#ffffff"
                  d="M1073 536v-47h228v31q0 73 28 123q29 50 146 146q60 49 100 85.5t60 62.5q42 53 62 111.5t20 141.5q0 89 -31 160t-91.5 120.5t-149 76t-203.5 26.5q-203 0 -436 -122l86 -189q216 103 346 103q103 0 162 -50.5t59 -141.5q0 -85 -35 -143q-17 -30 -56 -68t-101 -87 q-57 -45 -95 -85.5t-58 -79.5q-41 -79 -41 -174zM1381 520v-110h-387v126q0 114 47 205q25 47 69 95t109 101q100 80 122 109t31 59t9 68q0 50 -34 82.5t-109 31.5q-36 0 -75.5 -8.5t-81.5 -22.5q-42 -15 -98 -39.5t-128 -59.5l-152 326q299 169 539 169q257 0 405 -124 q75 -63 112.5 -146t37.5 -192q0 -137 -59 -238q-29 -51 -82.5 -106.5t-132.5 -117.5q-49 -39 -79 -68t-41 -46q-12 -17 -17 -41t-5 -53zM1201 210q-166 0 -166 -158q0 -44 12.5 -74.5t34.5 -49.5t52 -27.5t65 -8.5q81 0 123 42.5t42 117.5q0 158 -163 158zM1201 -186 q-115 0 -180.5 61.5t-65.5 176.5t66 175.5t178 60.5q116 0 180.5 -62t64.5 -174q0 -54 -16.5 -98t-48 -75t-76.5 -48t-102 -17z"
                />
              </g>
              <g transform="matrix(1 0 0 -1 1200 1638)">
                <path
                  fill="#ffffff"
                  d="M1073 536v-47h228v31q0 73 28 123q29 50 146 146q60 49 100 85.5t60 62.5q42 53 62 111.5t20 141.5q0 89 -31 160t-91.5 120.5t-149 76t-203.5 26.5q-203 0 -436 -122l86 -189q216 103 346 103q103 0 162 -50.5t59 -141.5q0 -85 -35 -143q-17 -30 -56 -68t-101 -87 q-57 -45 -95 -85.5t-58 -79.5q-41 -79 -41 -174zM1381 520v-110h-387v126q0 114 47 205q25 47 69 95t109 101q100 80 122 109t31 59t9 68q0 50 -34 82.5t-109 31.5q-36 0 -75.5 -8.5t-81.5 -22.5q-42 -15 -98 -39.5t-128 -59.5l-152 326q299 169 539 169q257 0 405 -124 q75 -63 112.5 -146t37.5 -192q0 -137 -59 -238q-29 -51 -82.5 -106.5t-132.5 -117.5q-49 -39 -79 -68t-41 -46q-12 -17 -17 -41t-5 -53zM1201 210q-166 0 -166 -158q0 -44 12.5 -74.5t34.5 -49.5t52 -27.5t65 -8.5q81 0 123 42.5t42 117.5q0 158 -163 158zM1201 -186 q-115 0 -180.5 61.5t-65.5 176.5t66 175.5t178 60.5q116 0 180.5 -62t64.5 -174q0 -54 -16.5 -98t-48 -75t-76.5 -48t-102 -17z"
                />
              </g>
            </svg>
            <h1 className="headingText flex items-center justify-center ml-2 text-2xl tracking-wide leading-7">
              Picka <br /> Food Mood
            </h1>
          </div>
        </a>
      </Link>
      <Hamburger setActive={setMenu} isActive={activeMenu} />
      <Nav isActive={activeMenu} auth="noAuth" />
      <style jsx>{`
        .bigBox {
          height: 400px;
        }
        .stripes {
          display: grid;
          grid: repeat(5, 80px) / repeat(10, 1fr);
          background: #5658ff;
          transform: skewY(-10deg);
          transform-origin: 0;
          overflow: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .stripes .one {
          grid-column: span 3;
          background: linear-gradient(160deg, #6f71ff, #94d3ff);
        }

        .stripes .two {
          grid-area: 3 / span 3 / auto / -1;
          background: linear-gradient(90deg, #6f71ff, #94f5ff);
        }

        .stripes .three {
          grid-row: 4;
          grid-column: span 5;
          background: linear-gradient(-90deg, #5960ff, #8cd5ff);
        }
        .logo {
          width: 125px;
          height: 125px;
        }
        .twistIt {
          transform: rotate(-15deg);
        }
        .pathFill {
          fill: #4c51bf;
        }
        .headingText {
          font-family: 'Open Sans', sans-serif;
          color: #ffffff;
          line-height: 3.5rem;
          font-size: 3rem;
        }
        .bringUp {
          z-index: 999999;
        }
        @media only screen and (max-width: 515px) {
        }
        @media only screen and (max-width: 485px) {
          .logo {
            width: 65px;
            height: 65px;
          }
          .headingText {
            line-height: 1.75rem;
            font-size: 1.5rem;
          }
          .shrinkIt > svg {
            width: 45px;
          }
          .shrinkIt > h1 {
            font-size: 1.25rem;
            margin-left: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;
