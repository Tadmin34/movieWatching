async function displaySavedMovies() {
    const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));

    if (!currentUser || !currentUser.savedMovies || currentUser.savedMovies.length === 0) {
        document.getElementById('movie').innerHTML = 'Không có phim nào được lưu';
        return;
    }

    const savedMovies = currentUser.savedMovies;

    for (const movie of savedMovies) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movie)}&apikey=${apiKey}`);
            if (!response.ok) {
                throw new Error('Không thể tìm thấy phim');
            }
            const data = await response.json();
            if (data.Response === 'True') {
                
                const isSaved = isMovieSaved(data.Title);
                document.getElementById('movie').innerHTML += `
                    <div class="phim">
                        <i class="fa${isSaved ? '-solid' : '-regular'} fa-bookmark" 
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
        finally{
            loadingScreen.style.display = 'none';
        }
    }
}

// Hàm kiểm tra nếu phim đã được lưu
function isMovieSaved(movieName) {
    const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    return currentUser && currentUser.savedMovies && currentUser.savedMovies.includes(movieName);
}

// Gọi hàm để hiển thị phim đã lưu khi trang được tả
window.addEventListener('load', () => {
    loadingScreen.style.display = 'flex';
    
    // Gọi hàm để hiển thị thông tin phim
    displaySavedMovies();
});
