import React, { useEffect, useState } from 'react'

function Reviews(props) {
    const [reviews, setReviews] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const rawData = await fetch(`https://api.themoviedb.org/3/credit/${props.id}?api_key=${process.env.REACT_APP_KEY}`)
            const data = await rawData.json()
            setReviews(data)
        }
        fetchData()
    }, [props.id])


    console.log(reviews)
    return (
        <p>Hello</p>
    )
}

export default Reviews
