const api = 'https://www.omdbapi.com/?apikey=d99ef580';

const pagination = {
    limit: 3,
    skip: 0,
    total: null,

    next() {
        this.skip += this.limit;
    }
};

async function getDataFromServer() {

    const title = $("#title").val();
    const type = $('#type').find(":selected").text();

    const urlWithParams = `${api}&s=${title}&type=${type}&page=${pagination.skip / pagination.limit + 1}`;

    const response = await fetch(urlWithParams);

    const data = await response.json();

    if (data.Search) {
        $.each(data.Search, function (index, movie) {
            $("#results").append(
                            `<li>
                            <img src="${movie.Poster}" alt="">
                            <div>
                                <p>${movie.Type}</p>
                                <h3>${movie.Title}</h3>
                                <p>${movie.Year}</p>
                
                                <a href="./details.html?id=${movie.imdbID}"><button>Details</button></a>
                            </div>
                        </li>`);
        });

        pagination.total = parseInt(data.totalResults);
        pagination.next();

        if (pagination.skip >= pagination.total) {
            $("#loadMoreBtn").prop("disabled", true);
        }
    } else {
        $("#results").html("No results found.");
    }
}

$("#searchBtn").click(() => {
    $("#results").empty(); 
    pagination.skip = 0;
    $("#loadMoreBtn").prop("disabled", false);
    getDataFromServer();
});

$("#loadMoreBtn").click(() => {
    getDataFromServer();
});
