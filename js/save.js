async function displaySavedMovies() {
    const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));

    if (!currentUser || !currentUser.savedMovies || currentUser.savedMovies.length === 0) {
        document.getElementById('movie').innerHTML = 'Không có phim nào được lưu';
        return;
    }

    const savedMovies = currentUser.savedMovies;
    const movieContainer = document.getElementById('movie');
    movieContainer.innerHTML = ''; // Xóa nội dung cũ

    for (const movie of savedMovies) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movie)}&apikey=${apiKey}`);
            if (!response.ok) {
                throw new Error('Không thể tìm thấy phim');
            }
            const data = await response.json();
            if (data.Response === 'True') {
                movieContainer.innerHTML += `
                    <div class="phim">
                        <i class="fa${isMovieSaved(data.Title) ? '-solid' : '-regular'} fa-bookmark" 
                           onclick="toggleBookmark(this, '${data.Title}')"
                           style="background-color: ${isMovieSaved(data.Title) ? '#fff' : '#ffcc00'}; color: ${isMovieSaved(data.Title) ? '#ffcc00' : '#fff'};">
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
attachEventListeners(movieContainer)
// Gọi hàm để hiển thị các phim đã lưu khi trang được tải
window.addEventListener('load', () => {
    displaySavedMovies();
});
