/** @format */

import "./App.css"
import React, { useState, useEffect } from "react"
import SearchIcon from "./search.svg"
import MovieCard from "./components/MovieCard"

const API_URL = process.env.REACT_APP_API_URL

function App() {
	const [searchTerm, setSearchTerm] = useState("")
	const [movies, setMovies] = useState([])

	useEffect(() => {
		searchMovies("Pokemon")
	}, [])

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`)

		const data = await response.json()
		console.log(data)

		setMovies(data.Search)
	}

	return (
		<div className='app'>
			<h1>Movie Stream</h1>
			<div className='search'>
				<input
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value)
					}}
					placeholder='Search for movies'
				/>
				<img
					src={SearchIcon}
					alt='search'
					onClick={() => {
						searchMovies(searchTerm)
					}}
				/>
			</div>
			{movies?.length > 0 ? (
				<div className='container'>
					{movies.map((movie) => (
						<MovieCard movie={movie} />
					))}
				</div>
			) : (
				<div className='empty'>
					<h2>No movies found</h2>
				</div>
			)}
		</div>
	)
}

export default App
