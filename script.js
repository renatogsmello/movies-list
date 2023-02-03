const movies = [
	{
		image: "https://img.elo7.com.br/product/original/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg",
		title: "The Batman",
		year: 2022,
		rating: 9.0,
		description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
		isFavorited: false,
	},
	{
		image: "https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg",
		title: "Avengers",
		year: 2019,
		rating: 8.2,
		description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
		isFavorited: false,
	},
	{
		image: "https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg",
		title: "Doctor Strange in the Multiverse of Madness",
		year: 2022,
		rating: 8.5,
		description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
		isFavorited: false,
	},
]

function renderMovie({ image, title, year, rating, description, isFavorited }) {
	let movieList = document.getElementById("movie-list")
	let item = document.createElement("li")
	let template = `
    <img src="${image}" alt="" />
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
                ${rating}
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
        ${description}
    </p>
    `
	item.innerHTML = template
	movieList.appendChild(item)
}

movies.map((movie) => {
	renderMovie(movie)
})
