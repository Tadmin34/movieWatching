function scrollLeft(containerId) {
    const container = document.getElementById(containerId);
    container.scrollBy({
        left: -300,
        behavior: 'smooth'
    });
}

function scrollRight(containerId) {
    const container = document.getElementById(containerId);
    container.scrollBy({
        left: 300,
        behavior: 'smooth'
    });
}

function toggleBookmark(element) {
    if (element.classList.contains('fa-regular')) {
        element.classList.remove('fa-regular');
        element.classList.add('fa-solid');
        element.style.backgroundColor = '#fff';
        element.style.color = '#ffcc00';
    } else {
        element.classList.remove('fa-solid');
        element.classList.add('fa-regular');
        element.style.backgroundColor = '#ffcc00';
        element.style.color = '#fff';
    }
}

const saveMovie = () => {
    const search = document.getElementById("search").value;
    localStorage.setItem('movie-search', search);
    window.location.href = '../search.html';
}
document.getElementById("search").addEventListener('keydown',function (event){
    if(event.key=== 'Enter'){
        saveMovie()
    }
})
const hreftoIndex = () => {
    window.location.href = '../index.html';
}

const hreftoSignup = () => {
    window.location.href = '../signup/signup.html';
}




document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    const user = document.getElementById('user');
    
    const userDisplay = () => {
        if (!currentUser || currentUser.length === 0) {
            user.innerHTML = `
                <h3>User name</h3>
                <img src="../user.png" alt="Default Avatar">
            `;
        } else {
            // Giả sử `currentUser` là đối tượng người dùng, không phải mảng
            user.innerHTML = `
                <h3>${currentUser.username}</h3>
                <img src="${currentUser.avatar}" alt="User Avatar">
            `;
        }
    };

    userDisplay();
});

document.addEventListener('DOMContentLoaded', () => {
    const showGenres = document.getElementById('showGenres');
    const showYears = document.getElementById('showYears');
    const genreList = document.getElementById('genreList');
    const yearList = document.getElementById('yearList');

    showGenres.addEventListener('click', function(e) {
        e.preventDefault();
        genreList.innerHTML = '';
        const genres = [
            "Action",
            "Adventure",
            "Animation",
            "Anime",
            "Biography",
            "Comedy",
            "Crime",
            "Documentary",
            "Drama",
            "Family",
            "Fantasy",
            "Film-Noir",
            "History",
            "Horror",
            "Music",
            "Musical",
            "Mystery",
            "Romance",
            "Sci-Fi",
            "Short",
            "Sport",
            "Thriller",
            "War",
            "Western",
            
        ];
        genres.forEach(genre => {
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = genre;
            a.onclick = (event) => {
                event.preventDefault();
                localStorage.setItem('genresMovies', genre);
                window.location.href = 'genres.html';
            };
            genreList.appendChild(a);
        });
        genreList.style.display = 'flex';
        yearList.style.display = 'none';
        genreList.style.left = showGenres.getBoundingClientRect().left + 'px';
        genreList.style.top = showGenres.getBoundingClientRect().bottom + 'px';
    });

    showYears.addEventListener('click', function(e) {
        e.preventDefault();
        yearList.innerHTML = '';
        for (let year = 1999; year <= 2024; year++) {
            const a = document.createElement('a');
            a.href = '#';
            a.onclick = (event) => {
                event.preventDefault();
                localStorage.setItem('yearsMovies', year);
                window.location.href = 'year.html';
            };
            a.textContent = year;
            yearList.appendChild(a);
        }
        yearList.style.display = 'flex';
        genreList.style.display = 'none';
        yearList.style.left = showYears.getBoundingClientRect().left + 'px';
        yearList.style.top = showYears.getBoundingClientRect().bottom + 'px';
    })});
    const checkAcc = (event) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ anchor
        const currentUser = JSON.parse(localStorage.getItem('CurrentUser')); // Lấy `currentUser` từ localStorage
    
        if (!currentUser || Object.keys(currentUser).length === 0) {
            window.location.href = "../chxcotk.html";
        } else {
            window.location.href = "../save.html";
        }
    };
    function saveMovieTitle(event) {
        const movieTitle = event.currentTarget.querySelector('.name-movie').textContent.replace('Tên phim: ', '');
        localStorage.setItem('selectedMovie', movieTitle);
        console.log(`Phim đã chọn: ${movieTitle}`);
        window.location.href = '../movie/phim.html';
    }
    
    // Hàm đính kèm sự kiện cho các phần tử phim
    function attachEventListeners(container) {
        const phims = container.querySelectorAll('.phim');
        phims.forEach(phim => {
            phim.addEventListener('click', saveMovieTitle);
        });
    }
    