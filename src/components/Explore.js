import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Explore(props) {
    const { type, key } = useParams()
    const [data, setData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            let time = '/day'
            if (key === 'discover') time = ""
            const data = await fetch(`https://api.themoviedb.org/3/${key}/${type}${time}?api_key=${process.env.REACT_APP_KEY}&page=2`)
            const res = await data.json()
            setData(res)
        }
        fetchData()
    }, [key, type])
    if (data.results) {
        return data.results.map(item => <div className="p-4 m-2 text-center bg-gray-600 rounded-xl" key={item.id}>{item.title}</div>)
    } else {
        return <p>Loading</p>
    }
}

export default Explore
