document.addEventListener('DOMContentLoaded', async function () {
    const phimCurrent = localStorage.getItem('selectedMovie');
    
    if (!phimCurrent) {
        document.getElementById('phim').innerHTML = '<p class="error-message">Không có phim nào được chọn.</p>';
        return;
    }

    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(phimCurrent)}&apikey=${apiKey}`);
        
        if (!response.ok) {
            throw new Error('Không thể tìm thấy phim');
        }

        const data = await response.json();
        const translatedPlot = await translatePlot(data.Plot);

        if (data.Response === 'True') {
       
            
            // Tìm trailer của phim trên YouTube
            const trailerUrl = await getYouTubeTrailer(data.Title);

            const rating = data.Ratings[0] ? parseFloat(data.Ratings[0].Value) : 0;
const starPercentage = (rating / 10) * 100;

let starHTML = '';
for (let i = 1; i <= 10; i++) {
    if (i <= rating) {
        starHTML += '<span class="star filled">&#9733;</span>'; // Sao đầy màu vàng
    } else {
        starHTML += '<span class="star">&#9733;</span>'; // Sao trống màu đen
    }
}

document.getElementById('phim').innerHTML = `
    <h2 class="section-title">Thông Tin Phim</h2>
    <div class="movie-details">
        <div class="movie-poster-container">
            <img src="${data.Poster}" alt="${data.Title} Poster" class="movie-poster">
            <a href="#" class="glightbox_video" onclick="openVideoModal('${trailerUrl}'); return false;"> 
                <svg width="131" height="131" viewBox="0 0 131 131" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="inner-circle" d="M65 21C40.1488 21 20 41.1488 20 66C20 90.8512 40.1488 111 65 111C89.8512 111 110 90.8512 110 66C110 41.1488 89.8512 21 65 21Z" fill="white"></path>
                    <circle class="outer_circle" cx="65.5" cy="65.5" r="64" stroke="white"></circle>
                    <path class="play" fill-rule="evenodd" clip-rule="evenodd" d="M60 76V57L77 66.7774L60 76Z" fill="#BF2428"></path>
                </svg>
            </a>
        </div>
        <div class="movie-info">
            <h1 class="movie-title">${data.Title}</h1>
            <p class="movie-genre">Thể loại: ${data.Genre}</p>
            <p class="movie-release-year">Năm phát hành: ${data.Year}</p>
            <p class="movie-description">${translatedPlot}</p>
            <p class="movie-released">Phát hành vào: ${data.Released}</p>
            <div class="movie-rating">
                <p>Điểm số: ${rating}/10 <div class="star-rating">${starHTML}</div></p>
                
            </div>
            <p class='movie-runtime'>Thời lượng: ${data.Runtime}</p>
            <p class="movie-seasons">Mùa phát hành: ${data.totalSeasons ? data.totalSeasons : 'N/A'}</p>
            <div id="Genre-container">
                <h3>Thể loại:</h3>
                <ul class="genre-list">${data.Genre.split(', ').map(genre => `<li class="genre-item" onclick="generSave('${genre}')">${genre}</li>`).join('')}</ul>
            </div>
            <div id="actors-container">
                <h3>Diễn viên:</h3>
                <ul class="actors-list">${data.Actors.split(', ').map(actor => `<li class="actor-item">${actor}</li>`).join('')}</ul>
            </div>
            ${data.totalSeasons && data.totalSeasons > 0 ? `
                <h3>Các mùa:</h3>
                <div class="seasons-container">
                    ${Array.from({ length: parseInt(data.totalSeasons, 10) }).map((_, index) => `<div class="season-item">Mùa ${index + 1}</div>`).join('')}
                </div>
            ` : ''}
        </div>
    </div>
`;
        } else {
            document.getElementById('phim').innerHTML = `<p class="error-message">Không tìm thấy phim: ${phimCurrent}</p>`;
        }
    } catch (error) {
        console.error('Lỗi:', error.message);
        document.getElementById('phim').innerHTML = '<p class="error-message">Đã xảy ra lỗi khi tải thông tin phim.</p>';
    }
});

const generSave = (genre) => {
    localStorage.setItem('genresMovies', genre);
    window.location.href = '../genres.html';
}
async function translatePlot(plot) {
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(plot)}&langpair=en|vi`);
        if (!response.ok) {
            throw new Error('Translation API request failed');
        }
        const data = await response.json();
        return data.responseData.translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        return 'Translation not available';
    }
}


// Hàm tìm kiếm trailer trên YouTube
async function getYouTubeTrailer(movieTitle) {
    const youtubeApiKey = 'AIzaSyBFjjSJ6pY0pIBtSxGOWJhT6QJrJ6GIqEY';
    const query = `${movieTitle} trailer vietsub`;
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${youtubeApiKey}&maxResults=1&type=video`);
    
    if (!response.ok) {
        console.error('Không thể tìm thấy trailer trên YouTube');
        return '#';
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
        const videoId = data.items[0].id.videoId;
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`; // Thêm tham số autoplay=1
    }

    return 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';; // Nếu không tìm thấy video, trả về #
}

function openVideoModal(trailerUrl) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('trailerVideo');

    iframe.src = trailerUrl;
    modal.style.display = 'block';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('trailerVideo');

    iframe.src = ''; 
    modal.style.display = 'none';
}

// Gán sự kiện đóng modal khi nhấn vào nút đóng hoặc bên ngoài video
document.querySelector('.close-btn').addEventListener('click', closeVideoModal);
window.addEventListener('click', function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target == modal) {
        closeVideoModal();
    }
});
