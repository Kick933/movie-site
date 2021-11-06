import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function Nav() {
    const [searchTerm, setSearchTerm] = useState('Search...')
    const history = useHistory()

    function handleChange(e) {
        const target = e.target
        setSearchTerm(target.value)
    }
    function search(e) {
        e.preventDefault()
        history.push(`/search/${searchTerm}`)
    }
    function empty(e) {
        const target = e.target
        if (target.value === "Search...") {
            setSearchTerm('')
        }
        if (target.value === '') {
            setSearchTerm('Search...')
        }
    }
    return (
        <nav className="w-full min-h-12 bg-gray-800">
            <ul className="flex justify-between h-12 py-2">
                <li className="text-gray-200 box-border  ml-8 mr-auto h-4 w-16 text-center hidden sm:block"><a className="text-lg block w-32 h-8 mx-auto" href="/">Home</a></li>
                <li className="text-gray-400 sm:ml-auto sm:mr-8 mx-auto">
                    <form onSubmit={search}>
                        <input
                            className="mx-auto h-8 rounded-2xl text-gray-100 bg-gray-900 border-2 border-gray-400 px-3 sm:w-96" type="search"
                            onChange={handleChange}
                            onFocus={empty}
                            onBlur={empty}
                            value={searchTerm}>

                        </input>
                    </form>
                </li>
            </ul>
        </nav >
    )
}

export default Nav
