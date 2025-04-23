import '../styles/globals.css'

// we're going to import our AppNotification
import AppNotification from '../components/state/AppNotification'

function MyApp({ Component, pageProps }) {
  return <AppNotification>
    <Component {...pageProps} />
  </AppNotification>

}

export default MyApp
