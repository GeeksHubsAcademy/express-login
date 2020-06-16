const moviesDiv = document.querySelector('.peliculas');
const getMovies = async() => {
        try {
            const res = await fetch('http://localhost:3000/movies') //Hace un GET a la url especificada
            const movies = await res.json(); //parsea la respuesta que viene en json
            movies.forEach(movie => {
                moviesDiv.innerHTML += `
                    <div class="pelicula">
                    <h2>${movie.title}</h2>
                    <img src="${movie.poster_path}"/>
                    <p>${movie.overview}</p>
                    </div>
                    `
            });
        } catch (error) {
            console.error(error)
        }
    }
    // getMovies().catch(console.error);
getMovies();