import React, { useState } from 'react';
import Link from 'next/link';

const navLinks = {
  noAuth: [
    {
      title: 'Login',
      address: '/login'
    },
    {
      title: 'Sign Up',
      address: '/signup'
    }
  ],
  yesAuth: [
    {
      title: 'Home',
      address: '/'
    },
    {
      title: 'Locations',
      address: '/locations'
    },
    {
      title: 'Add Location',
      address: '/addlocation'
    },
    {
      title: 'Account',
      address: '/account'
    }
  ]
};

const Nav = ({ isActive = false, auth = 'noAuth' }) => (
  <nav className={`navLinksBar relative ${isActive ? 'navLinksBar--isActive' : ''}`}>
    <ul className="flex items-center navLinks">
      {navLinks[auth].map((navLink, i) => (
        <li key={navLink.address} className="oneLink">
          <Link href={navLink.address}>
            <a>{navLink.title}</a>
          </Link>
        </li>
      ))}
    </ul>

    <style jsx>{`
      .navLinksBar {
        text-align: center;
      }
      .navLinks {
        display: flex;
        justify-content: flex-end;
      }
      nav > ul {
        padding: 4px 16px;
      }
      .oneLink {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: ${auth === 'noAuth' ? '#ffffff' : '#067df7'};
        text-decoration: none;
        font-size: 14px;
      }
      @media screen and (max-width: 515px) {
        .navLinksBar {
          display: none;
          position: absolute;
          right: 0;
          top: 0px;
          z-index: 99999;
          background-color: #e9f4ff;
          width: 100%;
          padding-top: 72px;
        }
        .navLinksBar--isActive {
          display: block;
        }
        .navLinks {
          flex-direction: column;
        }
        .oneLink {
          width: 85%;
          display: flex;
          justify-content: center;
        }
        li:not(:last-of-type) {
          border-bottom: 1.5px solid #ffffff;
        }
      }
    `}</style>
  </nav>
);

export default Nav;
