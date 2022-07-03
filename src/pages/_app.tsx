import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import { UserProfileProvider } from '../contexts/ProfileDataGithubContext';
import '../styles/globals.css'
//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());  

function MyApp({ Component, pageProps }) {
  return (
  <UserProfileProvider>
    <Component {...pageProps} />
  </UserProfileProvider>
  )
}

export default MyApp
