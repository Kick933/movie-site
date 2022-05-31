import React, { Suspense } from 'react'
import {Route, Routes, Navigate, useLocation } from 'react-router-dom'
import {Config} from './context/Config'
import Explore from './components/Explore'
import Home from './components/Home'
import Nav from './components/Nav'
import Loading from './components/Loading'
import Search from './components/Search'
import { useGetConfig } from './hooks/useGetConfig'
const SearchPage = React.lazy(() => import('./components/SearchPage'))
const ErrorPage = React.lazy(() => import('./components/routes/ErrorPage'))
const MoviePage = React.lazy(() => import('./components/routes/MoviePage'))
const LoginPage = React.lazy(() => import('./components/auth-pages/Login'))

function App() {
  const {config, error, loading} = useGetConfig()
  const location = useLocation()

  if(error && location.pathname !== '/error'){
    console.log(error.message)
      return <Navigate to='/error' replace={true} wrongPath={false} />
  }else {
    return (
    <Config.Provider value={{config, loading, error}}>
            <Routes >
                <Route path="/" exact element={<Nav />}>
                      <Route index element={<Home />} />
                      <Route path='/search' element={<Search />}/>
                      <Route path='/login' element={
                        <Suspense fallback={<Loading />}>
                        <LoginPage />
                      </Suspense>
                      }>
                      </Route>
                      <Route path="/media/:id/:type" element={
                          <Suspense fallback={<Loading/>}>
                            <MoviePage config={config} />
                          </Suspense>
                        }/>
                      <Route path="/search/:query" element={
                        <Suspense fallback={<Loading />}>
                          <SearchPage config={config} />
                        </Suspense>
                      } />
                      <Route path="/explore/:key/:type" element={<Explore />} />
                        </Route>
                      <Route path="/error" element={
                        <Suspense fallback={<Loading />}>
                          <ErrorPage />
                        </Suspense>
                      } />
                      <Route path="/error" element={
                        <Suspense fallback={<Loading />}>
                          <ErrorPage wrongPath={true} />
                        </Suspense>
                      } />
                      
            </Routes>
    </Config.Provider>
    )
              }

}

export default App;
