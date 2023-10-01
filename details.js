const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const url = `https://www.omdbapi.com/?i=${id}&apikey=d99ef580`;

async function getMovieInfo() {

    const res = await fetch(url);
    const movie = await res.json();

    $("#poster").attr("src",movie.Poster)
    $("#title").html(movie.Title);
    $("#released").html(movie.Released);
    $("#genre").html(movie.Genre);
    $("#country").html(movie.Country);
    $("#director").html(movie.Director);
    $("#writer").html(movie.Writer);
    $("#actors").html(movie.Actors);
    $("#awards").html(movie.Awards);
}

getMovieInfo();