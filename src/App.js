import React, { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Trending from './components/Trending'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MoviePage from './components/MoviePage'

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
      <div className="bg-black">
        <Nav />
        <Route path="/" exact>
          <Trending config={config} type='movie' text="in Movies" />
          <Trending config={config} type='tv' text="on TV" />
        </Route>
        <Route path="/media/:id/:type" exact>
          <MoviePage config={config} />
        </Route>
      </div>
    </Router>
  )

}

export default App;
