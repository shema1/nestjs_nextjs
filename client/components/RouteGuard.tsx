import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTypedSelector } from '../hooks/useTypedSelector';
export { RouteGuard };

function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const { isLogin } = useTypedSelector(state => state.auth);

  // // const isLogin = false
  // useEffect(() => {
  //   // on initial load - run auth check 
  //   authCheck(router.asPath);

  //   // on route change start - hide page content by setting authorized to false  
  //   const hideContent = () => setAuthorized(false);
  //   router.events.on('routeChangeStart', hideContent);

  //   // on route change complete - run auth check 
  //   router.events.on('routeChangeComplete', authCheck)

  //   // unsubscribe from events in useEffect return function
  //   return () => {
  //     router.events.off('routeChangeStart', hideContent);
  //     router.events.off('routeChangeComplete', authCheck);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (!isLogin) {
      router.push({
        pathname: '/login'
      });
    }
  }, [])

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in 
    const publicPaths = ['/login'];
    const path = url.split('?')[0];
    if (!isLogin) {
      setAuthorized(false);
      router.push({
        pathname: '/login'
      });
    } else {
      setAuthorized(true);
    }
  }

  return (children);
}