import { apiKey } from "./env.js"

const searchIcon = document.getElementById("search-icon")
const input = document.getElementById("search")

// Mostra apenas os itens favoritados
const favoritesOnlyCheck = document.querySelector("#favorites-only")
favoritesOnlyCheck.addEventListener("click", (e) => {
	if (e.target.checked) {
		const movies = getMoviesFromLocalStorage()

		cleanList()
		movies.map((movie) => {
			renderMovie(movie)
		})
	} else {
		getMoviesAPI()
	}
})

async function getMoviesAPI() {
	await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`)
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
async function searchMovie(title) {
	await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`)
		.then((result) => {
			return result.json()
		})
		.then((data) => {
			const movies = data.results
			cleanList()
			movies.map((movie) => {
				renderMovie(movie)
			})
		})
}

getMoviesAPI()

function checkMovieIsFavorited(id) {
	const movies = getMoviesFromLocalStorage() || []
	return movies.find((movie) => movie.id == id)
}

function renderMovie(movie) {
	const { id, poster_path, title, release_date, vote_average, overview } = movie
	let year = release_date.slice(0, 4)
	const isFavorited = checkMovieIsFavorited(id)

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
	favoriteIcon.src = isFavorited ? "./images/heart-solid.svg" : "./images/heart-outline.svg"
	favorite.appendChild(favoriteIcon)
	favorite.insertAdjacentText("beforeend", "Favoritar")
	favoriteIcon.addEventListener("click", () => {
		if (isFavorited) {
			favoriteIcon.src = "./images/heart-outline.svg"

			removeFromLocalStorage(movie)
		} else {
			favoriteIcon.src = "./images/heart-solid.svg"

			saveToLocalStorage(movie)
		}
	})

	// Descrição do filme
	let descricao = document.createElement("p")
	descricao.innerText = overview
	item.appendChild(descricao)

	movieList.appendChild(item)
}

// Limpa a lista de Filmes
function cleanList() {
	let movieList = document.getElementById("movie-list")
	movieList.innerHTML = ""
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
	const movies = getMoviesFromLocalStorage() || []
	movies.push(movie)
	const moviesJSON = JSON.stringify(movies)
	localStorage.setItem("movies", moviesJSON)
}

function removeFromLocalStorage(movie) {
	const movies = getMoviesFromLocalStorage() || []
	let findMovie = movies.find((m) => m.id == movie.id)
	let newMovies = movies.filter((m) => m.id !== findMovie.id)
	const moviesJSON = JSON.stringify(newMovies)
	localStorage.setItem("movies", moviesJSON)
}

function getMoviesFromLocalStorage() {
	return JSON.parse(localStorage.getItem("movies")) || []
}
