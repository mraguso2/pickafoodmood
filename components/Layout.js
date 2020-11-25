import Head from 'next/head';
import HeaderWithAuth from './HeaderWithAuth';
import HeaderNoAuth from './HeaderNoAuth';

const Layout = ({ className, children, page }) => (
  <div className={className}>
    <Head>
      <title>Picka-Food-Mood {page ? `- ${page}` : ''}</title>
      <link rel="icon" href="/favicon.ico" />
      <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans|Raleway&display=swap"
        rel="stylesheet"
      />
      <script
        type="text/javascript"
        src={`https://maps.googleapis.com/maps/api/js?key=${
          process.env.GOOGLEMAP_TOKEN
        }&libraries=places`}
      />
    </Head>
    {/* <HeaderWithAuth /> */}
    <HeaderNoAuth />
    <main>{children}</main>
    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;
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

export default Layout;
