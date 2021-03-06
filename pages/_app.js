import App from 'next/app';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'react-datepicker/dist/react-datepicker.css';
import { NotificationsProvider, setUpNotifications } from 'reapop';
import UserContext from '../components/UserContext';
// import FlashWrapper from '../components/FlashWrapper';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      console.log(`App is changing to ${url} ${shallow ? 'with' : 'without'} shallow routing`);
      NProgress.start();
    };

    router.events.on('routeChangeStart', handleRouteChange);
    // route change complete
    router.events.on('routeChangeComplete', () => NProgress.done());
    // route change error
    router.events.on('routeChangeError', () => NProgress.done());

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', () => NProgress.done());
      router.events.off('routeChangeError', () => NProgress.done());
      NProgress.done();
    };
  }, []);

  setUpNotifications({
    defaultProps: {
      position: 'top-right',
      dismissible: true,
      showDismissButton: true,
      dismissAfter: 4000,
      singleContainer: false // adding to remove HMR error about server classNames not matching client
    }
  });

  return (
    <UserContext.Provider value={userValue}>
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
    </UserContext.Provider>
  );
}
