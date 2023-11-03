import axios from 'axios'
import React, { Suspense, lazy } from 'react'
import Layout from './layouts/Layout'
import Loader from './components/body/Loader'
const Path  = lazy(()=> import('./routes/Path'))

function App() {

  return (
    <>
      <Suspense fallback={<Loader/>}>
        <Path/>
      </Suspense>    
    </>
  )
}

export default App