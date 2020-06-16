const moviesDiv = document.querySelector('.peliculas');
const main = document.querySelector('main');
const LoginForm = `
<form class="loginForm">
            <input type="email" name="email" placeholder="Introduce el email">
            <input type="password" name="password"
            placeholder="Introduce el password">
            <button type="submit">Log in</button>
        </form>
`
const SignUpForm = `
<form class="signupForm" onsubmit="signUp(event)">
            <input type="text" name="name" placeholder="Introduce el nombre">
            <input type="email" name="email" placeholder="Introduce el email">
            <input type="password" name="password" placeholder="Introduce el password">
            <button type="submit">Sign Up</button>
        </form>
`
const signUp = event => {
    event.preventDefault();
    const user = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
        }
        //axios es un cliente http como fetch
        // hacemos petición POST, primer argumento endpoint y como segundo argumento 
    axios.post('http://localhost:3000/users/signup', user)

}
const showLogin = () => {
    main.innerHTML = LoginForm;
}
const showSignUp = () => {
    main.innerHTML = SignUpForm;
}
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
    // getMovies();