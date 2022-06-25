import axios from "axios"
import { useState, useEffect, useRef } from "react"
// Disabled exhaustive deps warning as deps is the dependency array.
/* eslint-disable react-hooks/exhaustive-deps */
export const useFetch = (url, deps = [], initailValue = {}) => {
    const [data, setData] = useState(initailValue)
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState(null)
    let mounted = true
    let ref = useRef(null)
    ref.current = mounted
    useEffect(() => {
        ref.current = true
        if(ref.current){
            setLoading(true)
            setError(null)
            async function getData (){
                try{
                    const res = await axios(url)
                    if(ref.current) setData(res.data)
                } catch(err){
                    if(ref.current) setError(err)
                } finally{
                    if(ref.current) setLoading(false)
                }
            }
            getData()
        }
    
      return () => {
        ref.current = false
      }
    }, deps)

    return { data, setData , loading, error }
}