const apiUrl =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const pageApiUrl =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=";
const posterApi = "https://image.tmdb.org/t/p/w1280";
const searchApi =
    "https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=";
const loader = document.querySelector("#preloader");
const genres = [{
        id: 28,
        name: "Action",
    },
    {
        id: 12,
        name: "Adventure",
    },
    {
        id: 16,
        name: "Animation",
    },
    {
        id: 35,
        name: "Comedy",
    },
    {
        id: 80,
        name: "Crime",
    },
    {
        id: 99,
        name: "Documentary",
    },
    {
        id: 18,
        name: "Drama",
    },
    {
        id: 10751,
        name: "Family",
    },
    {
        id: 14,
        name: "Fantasy",
    },
    {
        id: 36,
        name: "History",
    },
    {
        id: 27,
        name: "Horror",
    },
    {
        id: 10402,
        name: "Music",
    },
    {
        id: 9648,
        name: "Mystery",
    },
    {
        id: 10749,
        name: "Romance",
    },
    {
        id: 878,
        name: "Science Fiction",
    },
    {
        id: 10770,
        name: "TV Movie",
    },
    {
        id: 53,
        name: "Thriller",
    },
    {
        id: 10752,
        name: "War",
    },
    {
        id: 37,
        name: "Western",
    },
];

let resultId = genres.map((ids) => ids.id);
let resultName = genres.map((names) => names.name);

// console.log(resultId, resultName);

const main = document.querySelector(".main");
const search = document.querySelector("#search");
const form = document.querySelector("#form");



getMovies(apiUrl);



async function getMovies(url) {
    const response = await fetch(url);
    data = await response.json();
    showInfo(data.results);
}



const ratingArray = [];

function showInfo(moviesData) {



    main.innerHTML = "";

    // console.log(genres.find(x => x.id))
    moviesData.forEach((dataMovie) => {
        const { original_title, overview, poster_path, vote_average, genre_ids, } =
        dataMovie;

        // const genreNames = genre_ids.map(
        //     (x) => genres.find((y) => y.id === x).name);
        // console.log(genreNames);

        const newMain = document.createElement("div");
        newMain.classList.add("movie");
        newMain.innerHTML = `<img src="${posterApi + poster_path}" alt="${original_title}">
        <h3 id="title">${original_title}</h3>
        <p class="rating">${vote_average}</p> 
        `
        newMain.role = "button";
        // newMain.onclick = popUp;
        main.appendChild(newMain);
        ratingArray.push(vote_average);



    });




    // GET INDEX //


    const posters = document.querySelector('#poster-page')
    const titlePage = document.querySelector('.title')
    const runtime = document.querySelector('#runtime')
    const releaseDate = document.querySelector('#release-date')
    const genrePage = document.querySelector('#page-genre')
    const ratingPage = document.querySelector('#page-rating')
    const overviewPage = document.querySelector('#overview-page')

    const cast = document.querySelector('#cast')




    function getPopUp() {

        data.results.forEach((pageData) => {
            const { poster_path, original_title, release_date, genre_ids, id } = pageData
            posters.src = `${posterApi + poster_path}`
            titlePage.textContent = original_title
                // console.log(data.results);



        })


    }



    const popUp = function() {

        getPopUp()
        darken.style.display = 'block'
        pagePopUp.style.transform = 'scale(1)'
    }

    closeEl.onclick = () => {
        darken.style.display = 'none'
        pagePopUp.style.transform = 'scale(0)'
    }



    for (var i = 0, len = main.children.length; i < len; i++) {

        (function getIndex(indexHere) {
            main.children[i].onclick = function() {
                popUp()

                const resultData = data.results[indexHere]

                const clickedMovieId = resultData.id
                const creditApi = `https://api.themoviedb.org/3/movie/${clickedMovieId}/credits?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`
                const detailsApi = `https://api.themoviedb.org/3/movie/${clickedMovieId}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`
                getCredit(creditApi)

                async function getCredit(creditUrl) {
                    const res = await fetch(creditUrl)
                    const creditData = await res.json()


                    const crewData = creditData.crew;

                    const castCredits = creditData.cast


                    const directors = [];
                    for (chechkDirector in crewData) {

                        if (crewData[chechkDirector].department.includes('Directing')) {
                            console.log('12345');
                            directors.push(crewData[chechkDirector].original_name)
                            const director = document.querySelector('#director')
                        }
                    }
                    director.textContent = directors.splice(0, 1)

                    console.log(directors.splice(0, 1), 'done');


                    const output = castCredits.map(x => x.name)
                    cast.textContent = output.slice(0, 3)




                }
                getDetails(detailsApi)
                async function getDetails(detailsUrl) {
                    const detailsRes = await fetch(detailsUrl)
                    const detailsData = await detailsRes.json()
                    genrePage.textContent = detailsData.genres.map(x => x.name);
                    runtime.textContent = detailsData.runtime;
                }


                const titleData = resultData.original_title;
                titlePage.textContent = titleData;
                posters.src = posterApi + resultData.poster_path
                releaseDate.textContent = resultData.release_date;
                ratingPage.textContent = resultData.vote_average
                overviewPage.textContent = resultData.overview

            }
        })(i);

    }


}

window.addEventListener("load", () => {
    loader.style.display = "none";
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchItem = search.value;
    if (searchItem && searchItem !== "") {
        getMovies(searchApi + searchItem);
        console.log(searchApi + searchItem);
        search.textContent = searchItem;
    } else {
        window.location.reload();
    }

    console.log(searchItem);
});

// SET GENRE//

const tagsContainer = document.querySelector(".tags-container");

function setGenre() {
    const storeGenre = [];

    tagsContainer.innerHTML = "";

    genres.forEach((genre) => {
        const newTag = document.createElement("p");
        newTag.classList.add("tag");
        newTag.textContent = genre.name;
        tagsContainer.appendChild(newTag);

        newTag.addEventListener("click", () => {
            newTag.classList.toggle("active");

            if (storeGenre.length == 0) {
                storeGenre.push(genre.id);
            } else {
                if (storeGenre.includes(genre.id)) {
                    storeGenre.forEach((id, i) => {
                        if (id == genre.id) {
                            storeGenre.splice(i, 1);
                        }
                    });
                } else {
                    storeGenre.push(genre.id);
                }
            }
            getMovies(apiUrl + "&with_genres=" + encodeURI(storeGenre.join(",")));
        });
    });
}
setGenre();

// TABS //

const ratingApi =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US&page=1";
const upcomingApi =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US&page=1";
const tabAll = document.querySelectorAll(".tab");
const sortByPopularity = document.querySelector(".tab-1");
const sortByRating = document.querySelector(".tab-2");
const upcoming = document.querySelector(".tab-3");

if (getMovies(apiUrl)) {
    tabAll.forEach((tabEl) => tabEl.classList.remove("focus"));
    sortByPopularity.classList.add("focus");
}
sortByPopularity.addEventListener("click", () => {
    getMovies(apiUrl);
    tabAll.forEach((tabEl) => tabEl.classList.remove("focus"));
    sortByPopularity.classList.add("focus");
});

sortByRating.addEventListener("click", () => {
    getMovies(ratingApi);
    tabAll.forEach((tabEl) => tabEl.classList.remove("focus"));
    sortByRating.classList.toggle("focus");
});

upcoming.addEventListener("click", () => {
    getMovies(upcomingApi);
    tabAll.forEach((tabEl) => tabEl.classList.remove("focus"));
    upcoming.classList.toggle("focus");
});

// PAGINATION//

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const current = document.querySelector(".current-page");
const jump = document.querySelector(".jump-input");
const form2 = document.querySelector(".form2");

let currentPage = 0;
let nextPage = 0;
let prevPage = 0;

form2.addEventListener("submit", (e) => {
    e.preventDefault();

    const jumpItem = jump.value;
    getMovies(pageApiUrl + jumpItem);
    current.textContent = jumpItem;
    jump.value = "";
    console.log(jumpItem);
});

next.addEventListener("click", () => {
    console.log("data.page", data.page);
    data.page++;
    getMovies(pageApiUrl + data.page);

    current.textContent = data.page;
    // NAME .scrollIntoView({ behavior: "smooth" })
});

prev.addEventListener("click", () => {
    if (data.page >= 1) {
        data.page--;
        if (data.page === 0) {
            current.textContent = 1;
            getMovies(pageApiUrl + 1);
        } else {
            current.textContent = data.page;
            getMovies(pageApiUrl + data.page);
        }
    }
});

// ON CLICK //

const darken = document.querySelector(".darken");
const pagePopUp = document.querySelector(".page");
const closeEl = document.querySelector(".fa-xmark");
const pageContainer = document.querySelector('.page-container')


// DOM FETCH //