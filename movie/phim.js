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

        if (data.Response === 'True') {
            const translatedPlot = await translateText(data.Plot); // Translate plot
            
            document.getElementById('phim').innerHTML = `
                <h2 class="section-title">Thông Tin Phim</h2>
                <div class="movie-details">
                    <img src="${data.Poster}" alt="${data.Title} Poster" class="movie-poster">
                    <div class="movie-info">
                        <h1 class="movie-title">${data.Title}</h1>
                        <p class="movie-genre">Thể loại: ${data.Genre}</p>
                        <p class="movie-release-year">Năm phát hành: ${data.Year}</p>
                        <p class="movie-description">${translatedPlot}</p>
                        <p class="movie-released">Phát hành vào: ${data.Released}</p>
                        <p class="movie-rating">Điểm số: ${data.Ratings[0] ? data.Ratings[0].Value : 'N/A'}</p>
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
                            <div class="seasons-container">
                                <h3>Các mùa:</h3>
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
