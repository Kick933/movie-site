import React, { useEffect, useState, Suspense } from 'react'
import {Route, Routes, Navigate, useLocation } from 'react-router-dom'
import {Config} from './context/Config'
import Explore from './components/Explore'
import Home from './components/Home'
import Nav from './components/Nav'
import Loading from './components/Loading'
import Search from './components/Search'
import axios from 'axios'
import Menu from './components/Menu'
const SearchPage = React.lazy(() => import('./components/SearchPage'))
const ErrorPage = React.lazy(() => import('./components/ErrorPage'))
const MoviePage = React.lazy(() => import('./components/MoviePage'))

function App() {
  const [config, setConfig] = useState({})
  const [loading, setLoading] = useState(true)
  const [error,setError] = useState(false)
  const location = useLocation()
  // Get Configuration on load.
  useEffect(() => {
    let mounted = true
    if(loading && !error){
      axios.get(`https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_KEY}`)
      .then((res) =>{
        if(mounted && loading){
          setLoading(false)
          setConfig(res.data)
        }
      })
      .catch((err) => {
        console.log(err)
        setError(true)
      })
    }
    return () => {
      mounted = false
    }
  }, [loading,error])

  if(error && location.pathname !== '/error'){
    console.log(error.message)
      return <Navigate to='/error' replace={true} wrongPath={false} />
  }else {
    return (
    <Config.Provider value={{config, loading, error}}>
            <Routes >
                <Route path="/" exact element={<Nav />}>
                      <Route index element={<Home />} />
                      <Route path="/menu" element ={<Menu />}></Route>
                      <Route path='/search' element={<Search />}/>
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
