import { apiKey } from "./env.js"

const searchIcon = document.getElementById("search-icon")
const input = document.getElementById("search")

async function getMoviesAPI() {
	await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`)
		.then((result) => {
			return result.json()
		})
		.then((data) => {
			console.log(data)
			const movies = data.results
			let movieList = document.getElementById("movie-list")
			movieList.innerHTML = ""
			movies.map((movie) => {
				renderMovie(movie)
			})
		})
}
async function searchMovie(param) {
	await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${param}`)
		.then((result) => {
			return result.json()
		})
		.then((data) => {
			const movies = data.results
			let movieList = document.getElementById("movie-list")
			movieList.innerHTML = ""
			movies.map((movie) => {
				renderMovie(movie)
			})
		})
}
getMoviesAPI()

function renderMovie({ poster_path, title, release_date, vote_average, overview, isFavorited }) {
	let year = release_date.slice(0, 4)
	isFavorited = false
	let movieList = document.getElementById("movie-list")

	let item = document.createElement("li")
	let template = `
    <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="" />
    <div class="movie-data">
        <span class="movie-title">${title} (${year})</span>
        <div class="rating-favorite-container">
            <div class="rating">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#D7A82F" viewBox="0 0 24 24" stroke-width="1.5" stroke="#D7A82F" width="24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                </svg>
                ${vote_average}
            </div>
            <div class="favorite">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                </svg>
                Favoritar
            </div>
        </div>
    </div>
    <p>
        ${overview}
    </p>
    `
	item.innerHTML = template
	movieList.appendChild(item)
}

searchIcon.addEventListener("click", (e) => {
	searchMovie(input.value)
})

input.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		e.preventDefault()
		searchMovie(input.value)
	}
})
