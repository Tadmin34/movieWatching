const yearsMovies = localStorage.getItem('yearsMovies') || '';
const limit = 20;
let currentOffset = 0;
let totalMovies = [];

document.getElementById('ketqua').innerText = `Phim của năm: "${yearsMovies}"`;

async function MoviesByYear() {
    document.getElementById('movie').innerHTML = '';

    let movies = [];
    switch (yearsMovies) {
        case '1999':
            movies = movies1999;
            break;
        case '2000':
            movies = movies2000;
            break;
        case '2001':
            movies = movies2001;
            break;
        case '2002':
            movies = movies2002;
            break;
        case '2003':
            movies = movies2003;
            break;
        case '2004':
            movies = movies2004;
            break;
        case '2005':
            movies = movies2005;
            break;
        case '2006':
            movies = movies2006;
            break;
        case '2007':
            movies = movies2007;
            break;
        case '2008':
            movies = movies2008;
            break;
        case '2009':
            movies = movies2009;
            break;
        case '2010':
            movies = movies2010;
            break;
        case '2011':
            movies = movies2011;
            break;
        case '2012':
            movies = movies2012;
            break;
        case '2013':
            movies = movies2013;
            break;
        case '2014':
            movies = movies2014;
            break;
        case '2015':
            movies = movies2015;
            break;
        case '2016':
            movies = movies2016;
            break;
        case '2017':
            movies = movies2017;
            break;
        case '2018':
            movies = movies2018;
            break;
        case '2019':
            movies = movies2019;
            break;
        case '2020':
            movies = movies2020;
            break;
        case '2021':
            movies = movies2021;
            break;
        case '2022':
            movies = movies2022;
            break;
        case '2023':
            movies = movies2023;
            break;
        case '2024':
            movies = movies2024;
            break;
        default:
            console.error('Năm không hợp lệ');
            return;
    }

    totalMovies = movies;
    currentOffset = 0;
    displayMovies();
}

async function displayMovies() {
    document.getElementById('loadingScreen').style.display = 'flex';

    const moviesToDisplay = totalMovies.slice(currentOffset, currentOffset + limit);
    const movieContainer = document.getElementById('movie');

    let moviesHTML = '';

    for (const movie of moviesToDisplay) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movie)}&apikey=${apiKey}`);
            if (!response.ok) {
                throw new Error('Không thể tìm thấy phim');
            }
            const data = await response.json();
            if (data.Response === 'True') {
                const isSaved = isMovieSaved(data.Title);
                moviesHTML += `
                    <div class="phim">
                        <i class="fa${isSaved ? '-solid' : '-regular'} fa-bookmark" 
                           onclick="toggleBookmark(this, '${data.Title}')"
                           data-movie-title="${data.Title}"
                           style="background-color: ${isSaved ? '#fff' : '#ffcc00'}; color: ${isSaved ? '#ffcc00' : '#fff'};">
                        </i>
                        <img src="${data.Poster}" alt="${data.Title} Poster">
                        <h4 class="name-movie">Tên phim: ${data.Title}</h4>
                        <h5 class="year_movie">Năm phát hành: ${data.Year}</h5>
                    </div>
                `;
            } else {
                console.error(`Phim "${movie}" không tìm thấy`);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    movieContainer.innerHTML += moviesHTML;

    attachEventListeners(movieContainer);

    document.getElementById('loadingScreen').style.display = 'none';

    if (currentOffset + limit < totalMovies.length) {
        document.getElementById('more').style.display = 'block';
    } else {
        document.getElementById('more').style.display = 'none';
    }
}

function isMovieSaved(movieName) {
    const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    return currentUser && currentUser.savedMovies && currentUser.savedMovies.includes(movieName);
}

document.getElementById('more').addEventListener('click', () => {
    currentOffset += limit;
    displayMovies();
});

document.addEventListener('DOMContentLoaded', async function () {
    MoviesByYear();
});
