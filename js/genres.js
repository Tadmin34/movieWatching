const genresMovies = localStorage.getItem('genresMovies') || '';
const limit = 20; // Giới hạn số lượng phim hiển thị mỗi lần
let currentOffset = 0; // Biến theo dõi số lượng phim đã hiển thị
let totalMovies = []; // Mảng lưu trữ tất cả các phim dựa trên thể loại

document.getElementById('ketqua').innerText = `Phim của thể loại: "${genresMovies}"`;

async function Moviesgenres() {
    // Xóa nội dung cũ trước khi tải lại
    document.getElementById('movie').innerHTML = '';

    let movies = [];
    switch (genresMovies) {
        case 'Action':
            movies = actionMovies;
            break;
        case 'Adventure':
            movies = adventureMovies;
            break;
        case 'Animation':
            movies = animationMovies;
            break;
        case 'Biography':
            movies = biographyMovies;
            break;
        case 'Comedy':
            movies = comedyMovies;
            break;
        case 'Crime':
            movies = crimeMovies;
            break;
        case 'Documentary':
            movies = documentaryMovies;
            break;
        case 'Drama':
            movies = dramaMovies;
            break;
        case 'Family':
            movies = familyMovies;
            break;
        case 'Fantasy':
            movies = fantasyMovies;
            break;
        case 'Film-Noir':
            movies = filmNoirMovies;
            break;
        case 'History':
            movies = historyMovies;
            break;
        case 'Horror':
            movies = horrorMovies;
            break;
        case 'Music':
            movies = musicMovies;
            break;
        case 'Musical':
            movies = musicalMovies;
            break;
        case 'Mystery':
            movies = mysteryMovies;
            break;
        case 'Romance':
            movies = romanceMovies;
            break;
        case 'Sci-Fi':
            movies = sciFiMovies;
            break;
        case 'Short':
            movies = shortMovies;
            break;
        case 'Sport':
            movies = sportMovies;
            break;
        case 'Thriller':
            movies = thrillerMovies;
            break;
        case 'War':
            movies = warMovies;
            break;
        case 'Western':
            movies = westernMovies;
            break;
        case 'Anime':
            movies = animeMoviesAndSeries;
            break;
        default:
            console.error('Thể loại không hợp lệ');
            return;
    }

    totalMovies = movies; // Lưu trữ tất cả các phim
    currentOffset = 0; // Reset phạm vi hiển thị
    displayMovies(); // Hiển thị phim đầu tiên
}

async function displayMovies() {
    // Hiển thị thanh loading
    document.getElementById('loadingScreen').style.display = 'flex';

    // Chỉ lấy các phim trong phạm vi hiện tại
    const moviesToDisplay = totalMovies.slice(currentOffset, currentOffset + limit);
    const movieContainer = document.getElementById('movie');

    // Tạo một chuỗi HTML để cập nhật DOM sau khi tất cả phim đã được xử lý
    let moviesHTML = '';

    for (const movie of moviesToDisplay) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movie)}&apikey=${apiKey}`);
            if (!response.ok) {
                throw new Error('Không thể tìm thấy phim');
            }
            const data = await response.json();
            if (data.Response === 'True') {
                // Kiểm tra nếu phim đã được lưu
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

    // Cập nhật DOM sau khi tất cả phim đã được xử lý
    movieContainer.innerHTML += moviesHTML;

    // Đính kèm sự kiện cho các phần tử phim mới được tạo
    attachEventListeners(movieContainer);

    // Ẩn thanh loading
    document.getElementById('loadingScreen').style.display = 'none';

    // Cập nhật trạng thái của nút "More"
    if (currentOffset + limit < totalMovies.length) {
        document.getElementById('more').style.display = 'block'; // Hiển thị nút "More"
    } else {
        document.getElementById('more').style.display = 'none'; // Ẩn nút "More"
    }
}

// Hàm kiểm tra nếu phim đã được lưu
function isMovieSaved(movieName) {
    const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    return currentUser && currentUser.savedMovies && currentUser.savedMovies.includes(movieName);
}

// Hàm xử lý sự kiện cho nút "More"
document.getElementById('more').addEventListener('click', () => {
    currentOffset += limit; // Cập nhật phạm vi hiện tại
    displayMovies(); // Tải thêm phim
});

// Đảm bảo rằng hàm từ tệp JavaScript khác đã được nạp
document.addEventListener('DOMContentLoaded', async function () {
    Moviesgenres();
});
