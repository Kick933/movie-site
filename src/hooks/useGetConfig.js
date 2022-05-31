import {useState, useEffect} from 'react'
import axios from 'axios'

export function useGetConfig() {
  const [config, setConfig] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() =>{
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
              setError({err})
            })
          }

        return () => mounted = false
  })

  return {config, loading, error}
}
