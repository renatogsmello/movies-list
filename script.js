import { apiKey } from "./env.js"

const searchIcon = document.getElementById("search-icon")
const input = document.getElementById("search")

async function getMoviesAPI() {
	await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`)
		.then((result) => {
			return result.json()
		})
		.then((data) => {
			// console.log(data)
			const movies = data.results
			let movieList = document.getElementById("movie-list")
			movieList.innerHTML = ""
			movies.map((movie) => {
				renderMovie(movie)
			})
		})
}
async function searchMovie(title) {
	await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`)
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

function renderMovie(movie) {
	const { id, poster_path, title, release_date, vote_average, overview } = movie
	let year = release_date.slice(0, 4)
	movie.isFavorited = false
	let movieList = document.getElementById("movie-list")

	let item = document.createElement("li")
	item.id = id

	// poster do filme
	let posterImage = document.createElement("img")
	posterImage.src = `https://image.tmdb.org/t/p/w500${poster_path}`
	item.appendChild(posterImage)

	// Container de Dados do filme
	let movieData = document.createElement("div")
	movieData.classList.add("movie-data")
	item.appendChild(movieData)

	// Titulo do filme
	let movieTitle = document.createElement("span")
	movieTitle.classList.add("movie-title")
	movieTitle.textContent = `${title} (${year})`
	movieData.appendChild(movieTitle)

	// Container para nota e favoritos
	let ratingFaforiteContainer = document.createElement("div")
	ratingFaforiteContainer.classList.add("rating-favorite-container")
	movieData.appendChild(ratingFaforiteContainer)

	// Nota do Filme
	let rating = document.createElement("div")
	rating.classList.add("rating")
	rating.innerHTML = `<img src="./images/star.svg"/>${vote_average}`
	ratingFaforiteContainer.appendChild(rating)

	// Favorito
	let favorite = document.createElement("div")
	favorite.classList.add("favorite")
	ratingFaforiteContainer.appendChild(favorite)
	let favoriteIcon = document.createElement("img")
	favoriteIcon.src = movie.isFavorited ? "./images/heart-solid.svg" : "./images/heart-outline.svg"
	favorite.appendChild(favoriteIcon)
	favorite.insertAdjacentText("beforeend", "Favoritar")
	favoriteIcon.addEventListener("click", () => {
		if (movie.isFavorited) {
			favoriteIcon.src = "./images/heart-outline.svg"
			movie.isFavorited = false
			removeFromLocalStorage(movie)
		} else {
			favoriteIcon.src = "./images/heart-solid.svg"
			movie.isFavorited = true
			saveToLocalStorage(movie)
		}
	})

	// Descrição do filme
	let descricao = document.createElement("p")
	descricao.innerText = overview
	item.appendChild(descricao)

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

function saveToLocalStorage(movie) {
	const movies = JSON.parse(localStorage.getItem("movies")) || []

	movies.push(movie)

	const moviesJSON = JSON.stringify(movies)
	localStorage.setItem("movies", moviesJSON)
}

function removeFromLocalStorage(movie) {
	const movies = JSON.parse(localStorage.getItem("movies")) || []
	let findMovie = movies.find((m) => m.id == movie.id)
	let newMovies = movies.filter((m) => m.id !== findMovie.id)
	const moviesJSON = JSON.stringify(newMovies)
	localStorage.setItem("movies", moviesJSON)
}
