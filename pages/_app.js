import App from 'next/app';
import { useState, useMemo, useEffect } from 'react';
import Router from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import UserContext from '../components/UserContext';
import FlashWrapper from '../components/FlashWrapper';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  // console.log(document.cookie);
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  // useEffect(async () => {
  //   try {
  //     console.log('in here');
  //     const { cookie } = context.req.headers;
  //     const res = await fetch(`http://localhost:3000/api/authenticated`, {
  //       headers: {
  //         cookie
  //       }
  //     });

  //     const data = await res.json();

  //     // user is authenticated so don't show them LOGIN page
  //     if (res.status === 200 && context.req && data.action === 'success') {
  //       context.res.writeHead(302, {
  //         Location: '/'
  //       });
  //       context.res.end();
  //     }

  //     return { props: { user2: 'not authenticated' } };
  //   } catch (err) {
  //     console.error('Error: ', err);
  //     return { props: {} };
  //   }
  //   return;
  // }, [])

  const handleRouteChange = url => {
    console.log('App is changing to: ', url);
  };

  Router.events.on('routeChangeStart', handleRouteChange);
  return (
    <UserContext.Provider value={userValue}>
      <FlashWrapper>
        <Component {...pageProps} />
      </FlashWrapper>
    </UserContext.Provider>
  );
}

// MyApp.getInitialProps = async appContext => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//   // console.log(appContext.ctx.req.headers.cookie);
//   // return { ...appProps };
//   try {
//     const { cookie } = appContext.ctx.req.headers;
//     const res = await fetch(`http://localhost:3000/api/authenticated`, {
//       headers: {
//         cookie
//       }
//     });

//     // client side but not needed with "getServerSideProps"
//     // if (res.status === 401 && !context.req) {
//     //   Router.replace('/signin');
//     //   return;
//     // }

//     const data = await res.json();
//     console.log({ ...appProps, usr: data.user });
//     // user is authenticated so don't show them LOGIN page
//     // if (res.status === 200 && appContext.req && data.action === 'success') {
//     //   appContext.res.writeHead(302, {
//     //     Location: '/'
//     //   });
//     //   appContext.res.end();
//     // }
//     appProps.pageProps = { ...appProps.pageProps, usr: data.user };

//     return { ...appProps };
//   } catch (err) {
//     console.error('Error: ', err);
//     return { ...appProps };
//   }
// };
