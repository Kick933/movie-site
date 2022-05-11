import axios from "axios"
import { useState, useEffect } from "react"
// Disabled exhaustive deps warning as deps is the dependency array.
/* eslint-disable react-hooks/exhaustive-deps */
export const useFetch = (url, deps = [], initailValue) => {
    const [data, setData] = useState(initailValue)
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        let mounted = true
        if(mounted){
            setLoading(true)
            setError(null)
            async function getData (){
                try{
                    const res = await axios(url)
                    setData(res.data)
                } catch(err){
                    setError(err)
                } finally{
                    setLoading(false)
                }
            }
            getData()
        }
    
      return () => {
        mounted = false
      }
    }, deps)
    return { data, loading, error }
}