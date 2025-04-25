import '@/styles/globals.css'

import AppNotification from '@/components/state/AppNotification'
import AuthProvider from '@/components/state/AuthProvider'

export default function App({ Component, pageProps }) {
  return <AppNotification>
    {/* we're doing a similiar thing here to the AppNotification except we'll
    make the user and associated auth data and functions available to all of the
    components. */}
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </AppNotification>

}
