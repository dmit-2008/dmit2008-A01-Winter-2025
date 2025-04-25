import '@/styles/globals.css'

import AppNotification from '@/components/state/AppNotification'

export default function App({ Component, pageProps }) {
  return <AppNotification>
    <Component {...pageProps} />
  </AppNotification>

}
