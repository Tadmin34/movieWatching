const phimNoiBat = document.getElementById("Phim-noi-bat");
const phimMoi = document.getElementById("Phim-Moi");
const phimLe = document.getElementById("Phimle-container");
const anime = document.getElementById("Anime-container");


async function fetchAndDisplayMovies(movieList, container) {
    for (const movie of movieList) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movie)}&apikey=${apiKey}`);
            if (!response.ok) {
                throw new Error('Không thể tìm thấy phim');
            }
            const data = await response.json();
            if (data.Response === 'True') {
                const isSaved = isMovieSaved(data.Title); // Kiểm tra nếu phim đã được lưu
                container.innerHTML += `
                    <div class="phim">
                        <i class="fa${isSaved ? '-solid' : '-regular'} fa-bookmark" 
                           data-movie-name="${data.Title}" 
                           onclick="toggleBookmark(this, '${data.Title}')"
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
}

// Hàm kiểm tra nếu phim đã được lưu
function isMovieSaved(movieName) {
    const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    return currentUser && currentUser.savedMovies && currentUser.savedMovies.includes(movieName);
}

// Gọi hàm để hiển thị các loại phim khác nhau
async function getMovieInfo() {
    await fetchAndDisplayMovies(popularMovies2024, phimNoiBat);
    await fetchAndDisplayMovies(moviein2024, phimMoi);
    await fetchAndDisplayMovies(movieSeries, phimLe);
    await fetchAndDisplayMovies(animeSeries, anime);
}

// Gọi hàm để hiển thị thông tin phim
getMovieInfo();
