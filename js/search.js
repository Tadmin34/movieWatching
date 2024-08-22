// Đảm bảo rằng hàm từ tệp JavaScript khác đã được nạp
document.addEventListener('DOMContentLoaded', async function () {
    const movieSearch = localStorage.getItem('movie-search') || '';
    document.getElementById('ketqua').innerText = `Kết quả cho từ khóa "${movieSearch}"`;

    const savedMovies = JSON.parse(localStorage.getItem('CurrentUser'))?.savedMovies || [];
    
    async function getMovieInfo() {
        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(movieSearch)}&apikey=${apiKey}`);
            if (!response.ok) {
                throw new Error('Không thể tìm thấy phim');
            }
            const data = await response.json();
            if (data.Response === 'True') {
                const movies = data.Search;
                const movieContainer = document.getElementById('movie');

                movieContainer.innerHTML = ''; // Xóa nội dung cũ

                movies.forEach(movie => {
                    const isBookmarked = savedMovies.includes(movie.Title);

                    movieContainer.innerHTML += `
                        <div class="phim">
                            <i class="fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark" 
                               onclick="toggleBookmark(this, '${movie.Title}')"
                               data-movie-title="${movie.Title}"
                               style="background-color: ${isBookmarked ? '#fff' : '#ffcc00'}; color: ${isBookmarked ? '#ffcc00' : '#fff'};">
                            </i>
                            <img src="${movie.Poster}" alt="${movie.Title} Poster">
                            <h4 class="name-movie">Tên phim: ${movie.Title}</h4>
                            <h5 class="year_movie">Năm phát hành: ${movie.Year}</h5>
                        </div>
                    `;
                });
            } else {
                document.getElementById('movie').textContent = 'Không có kết quả nào';
            }
        } catch (err) {
            console.error(err.message);
            document.getElementById('movie').textContent = 'Đã xảy ra lỗi khi tìm kiếm phim';
        } finally {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.style.display = 'none'; // Đảm bảo loadingScreen được định nghĩa
            }
        }
        // Đính kèm sự kiện cho các phần tử phim
        attachEventListeners(document.getElementById('movie'));
    }

    window.addEventListener('load', () => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
        getMovieInfo();
    });
});
