import React, { useEffect, useState } from 'react'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MoviePage from './components/MoviePage'
import SearchPage from './components/SearchPage'
import Explore from './components/Explore'
import Home from './components/Home'
import Loading from './components/Loading'

function App() {
  const [config, setConfig] = useState({})
  const [loading, setLoading] = useState(true)
  // Get Configuration on load.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_KEY}`)
        const res = await data.json()
        setConfig(res)
        setLoading(false)
      } catch (e) {
        console.log(e.message)
      }
    }
    fetchData()
  }, [])

  return loading ?
    <Loading /> :
    (<Router>
      <div className="bg-gray-800 min-h-screen">
        <Nav />
        <Route path="/" exact>
          <Home config={config} />
        </Route>
        <Route path="/media/:id/:type" exact>
          <MoviePage config={config} />
        </Route>
        <Route path="/search/:query" exact>
          <SearchPage config={config} />
        </Route>
        <Route path="/explore/:key/:type" exact>
          <Explore />
        </Route>
      </div>
    </Router>
    )

}

export default App;
