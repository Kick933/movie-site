import axios from "axios"
import { useState, useEffect } from "react"


export const useFetch = (type, id, initailValue) => {
    const [data, setData] = useState(initailValue)
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        let mounted = true
        if(mounted){
            (async () => {
                try{
                    const res = await axios(`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_KEY}&language=en-US`)
                    setData(res.data)
                } catch(err){
                    setError(err)
                } finally{
                    setLoading(false)
                }
            })()
        }
    
      return () => {
        mounted = false
      }
    }, [type, id ])
    return { data, loading, error}
}