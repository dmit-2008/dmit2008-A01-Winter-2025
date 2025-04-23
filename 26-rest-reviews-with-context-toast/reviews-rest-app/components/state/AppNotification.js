// we're going to do a few things.
// 1. create a componetn that will wrap the _app.js
// 2. create a context with an empty object (export it as well)
// 3. in the component we'll create a Context provider (this is has changed we'll make a note)

export default function AppNotification({children}) {

  // we're going to wrap all components in this provider
  return <>
    {children}
  </>
}