import React, {Suspense} from 'react'
import { Route, Routes } from 'react-router-dom'
import FrontPage from '../FrontPage'
import Search from '../Search'
import Nav from '../Nav'
import Loading from '../Loading'
import Explore from '../Explore'
import { useGetUser } from '../../hooks/useGetUser'
import { User } from '../../context/User'
import AccountLists from '../auth-pages/AccountLists'
const SearchPage = React.lazy(() => import('./SearchPage'))
const ErrorPage = React.lazy(() => import('./ErrorPage'))
const MoviePage = React.lazy(() => import('./MoviePage'))
const LoginPage = React.lazy(() => import('../auth-pages/Login'))

export default function Home() {
  const user = useGetUser()
  return (
    <User.Provider value={user} >
    <Routes >
    <Route path="/" exact element={<Nav />}>
          <Route index element={<FrontPage />} />
          <Route path='/search' element={<Search />}/>
          <Route path='/login' element={
          <Suspense fallback={<Loading/>}>
          <LoginPage />
        </Suspense>
          } />
          <Route path='/favorite' element={<AccountLists />} />
          <Route path='/watchlist' element={<AccountLists />} />
          <Route path="/media/:id/:type" element={
              <Suspense fallback={<Loading/>}>
                <MoviePage />
              </Suspense>
            }/>
          <Route path="/search/:query" element={
            <Suspense fallback={<Loading />}>
              <SearchPage />
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
</User.Provider>
  )
}
