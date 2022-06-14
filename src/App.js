import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Home from './components/routes/Home'
import {Config} from './context/Config'
import { useGetConfig } from './hooks/useGetConfig'
import { useGetSession } from './hooks/useGetSession'

function App() {
  // This component provides necessary config and session details to its child via Config context.
  const session = useGetSession()
  const { config, error, loading } = useGetConfig()
  const location = useLocation()
  if(error && location.pathname !== '/error'){
    console.log(error.message)
    return <Navigate to='/error' replace={true} wrongPath={false} />
  }else {
    return (
    <Config.Provider value={{config, loading, error, session}}>
            <Home />
    </Config.Provider>
    )
    }

}

export default App;
