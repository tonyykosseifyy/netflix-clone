export const API_KEY = "d3db47f451e0a89699b83c9dd2944439" ;
//https://api.themoviedb.org/3/movie/550?api_key=d3db47f451e0a89699b83c9dd2944439

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2RiNDdmNDUxZTBhODk2OTliODNjOWRkMjk0NDQzOSIsInN1YiI6IjYxNmYwM2ZlYmYwOWQxMDA4ZjIxNmFjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tpwHuxSx9SRPCc73SWlScj_reZtAZ5ujX8bBexk20rs" 

export const base_url = "https://image.tmdb.org/t/p/original" ;

const requests = {
	fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
	fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
	fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
	fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
	fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
	fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
	fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
	fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default requests;