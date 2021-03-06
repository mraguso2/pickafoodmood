import { useState, useEffect } from 'react';
import Head from 'next/head';
import NotificationsSystem, { atalhoTheme, useNotifications } from 'reapop';
import HeaderWithAuth from './HeaderWithAuth';
import HeaderNoAuth from './HeaderNoAuth';

const Layout = ({ className, children, page }) => {
  const { notifications, dismissNotification } = useNotifications();

  return (
    <div className={className}>
      <Head>
        <title>Picka-Food-Mood {page ? `- ${page}` : ''}</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://unpkg.com/nprogress@0.2.0/nprogress.css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans|Raleway&display=swap"
          rel="stylesheet"
        />
        <script src="https://unpkg.com/nprogress@0.2.0/nprogress.js" />
        <script
          type="text/javascript"
          src={`https://maps.googleapis.com/maps/api/js?key=${
            process.env.GOOGLEMAP_TOKEN
          }&libraries=places`}
        />
      </Head>

      <HeaderWithAuth />
      {/* <HeaderNoAuth /> */}
      <main>
        <NotificationsSystem
          notifications={notifications}
          dismissNotification={id => dismissNotification(id)}
          theme={atalhoTheme}
        />
        {children}
      </main>
      {/* </NotificationsProvider> */}
      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;
        }
        :global(button.disabled),
        :global(button:disabled),
        :global(button[disabled]) {
          opacity: 0.5 !important;
          cursor: not-allowed !important;
        }
        :global(.reapop__container--top-right) {
          top: 90px !important;
        }
        :global(.reapop__container--top-center) {
          top: 90px !important;
        }
        main {
          min-height: 100vh;
          background-color: #f8fbff;
          position: relative;
        }
        .logo {
          width: 65px;
          height: 65px;
        }
        .pathFill {
          fill: #4c51bf;
        }
        .heading {
          font-family: 'Raleway', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Layout;
