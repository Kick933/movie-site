import React, { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Trending from './components/Trending'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MoviePage from './components/MoviePage'
import SearchPage from './components/SearchPage'

function App() {
  const [config, setConfig] = useState({})

  // Get Configuration on load.
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_KEY}`)
      const res = await data.json()
      setConfig(res)
    }
    fetchData()
  }, [])


  return (
    <Router>
      <div className="bg-white min-h-screen">
        <Nav />
        <Route path="/" exact>
          <Trending config={config} find="trending" type='movie' text="in Movies" />
          <Trending config={config} find="trending" type='tv' text="on TV" />
          <Trending config={config} find="discover" type='movie' text="Movies" />
          <Trending config={config} find="discover" type="tv" text="Shows" />
        </Route>
        <Route path="/media/:id/:type" exact>
          <MoviePage config={config} />
        </Route>
        <Route path="/search/:query" exact>
          <SearchPage config={config} />
        </Route>
      </div>
    </Router>
  )

}

export default App;
