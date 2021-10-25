import React from 'react'

function Nav() {
    return (
        <nav className="w-full min-h-12 bg-gray-800">
            <ul className="flex justify-between p-4">
                <li className="text-white mx-4 my-auto"><a href="/">Home</a></li>
                <li className="text-white">About me</li>
            </ul>
        </nav>
    )
}

export default Nav
