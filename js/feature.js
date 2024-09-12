function scrollLeft(containerId) {
    const container = document.getElementById(containerId);
    container.scrollBy({
        left: -300,  // Cuộn sang trái
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

function toggleBookmark(element, movieName) {
    let currentUser = JSON.parse(localStorage.getItem('CurrentUser'));

    if (!currentUser) {
        console.error('Không có người dùng đăng nhập');
        return;
    }

    if (!currentUser.savedMovies) {
        currentUser.savedMovies = [];
    }

    const isSaved = currentUser.savedMovies.includes(movieName);

    if (isSaved) {
        const index = currentUser.savedMovies.indexOf(movieName);
        if (index > -1) {
            currentUser.savedMovies.splice(index, 1);
        }
        // Update bookmark icon
        element.classList.remove('fa-solid');
        element.classList.add('fa-regular');
        element.style.backgroundColor = '#ffcc00';
        element.style.color = '#fff';
    } else {
        currentUser.savedMovies.push(movieName);
        // Update bookmark icon
        element.classList.remove('fa-regular');
        element.classList.add('fa-solid');
        element.style.backgroundColor = '#fff';
        element.style.color = '#ffcc00';
    }

    // Save updated user data back to localStorage
    localStorage.setItem('CurrentUser', JSON.stringify(currentUser));
}

const saveMovie = () => {
    const search = document.getElementById("search").value;
    localStorage.setItem('movie-search', search);
    window.location.href = '../search.html';
};

document.getElementById("search").addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        saveMovie();
    }
});

const hreftoIndex = () => {
    window.location.href = '../index.html';
};

const hreftoSignup = () => {
    window.location.href = '../signup/signup.html';
};

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    const user = document.getElementById('user');
    const user2 = document.getElementById('user2');

    const userDisplay = () => {
        if (!currentUser || Object.keys(currentUser).length === 0) {
            // Default display when no user is logged in
            user.innerHTML = `
                <h3>User name</h3>
                <img src="../user.png" alt="Default Avatar">
            `;
            user2.innerHTML = `
                <h3>User name</h3>
                <img src="../user.png" alt="Default Avatar">
            `;
        } else {
            // Display user information if logged in
            user.innerHTML = `
                <h3>${currentUser.username}</h3>
                <img src="${currentUser.avatar}" alt="User Avatar">
            `;
            user2.innerHTML = `
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
            "Action", "Adventure", "Animation", "Anime", "Biography",
            "Comedy", "Crime", "Documentary", "Drama", "Family",
            "Fantasy", "Film-Noir", "History", "Horror", "Music",
            "Musical", "Mystery", "Romance", "Sci-Fi", "Short",
            "Sport", "Thriller", "War", "Western"
        ];

        genres.forEach(genre => {
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = genre;
            a.onclick = (event) => {
                event.preventDefault();
                localStorage.setItem('genresMovies', genre);
                window.location.href = '../genres.html';
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
                window.location.href = '../year.html';
            };
            a.textContent = year;
            yearList.appendChild(a);
        }

        yearList.style.display = 'flex';
        genreList.style.display = 'none';
        yearList.style.left = showYears.getBoundingClientRect().left + 'px';
        yearList.style.top = showYears.getBoundingClientRect().bottom + 'px';
    });

    // Close the dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInsideGenres = genreList.contains(e.target) || showGenres.contains(e.target);
        const isClickInsideYears = yearList.contains(e.target) || showYears.contains(e.target);

        if (!isClickInsideGenres) {
            genreList.style.display = 'none';
        }

        if (!isClickInsideYears) {
            yearList.style.display = 'none';
        }
    });
});


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
        phim.addEventListener('dblclick', saveMovieTitle);
    });
}

// Responsive

const populateDropdowns = () => {
    const genres = [
        "Action", "Adventure", "Animation", "Anime", "Biography",
        "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy",
        "Film-Noir", "History", "Horror", "Music", "Musical", "Mystery",
        "Romance", "Sci-Fi", "Short", "Sport", "Thriller", "War", "Western"
    ];
    
    const years = Array.from({ length: 2024 - 1999 + 1 }, (_, i) => i + 1999);

    const sideGenresDropdown = document.getElementById('genresDropdown');
    const sideYearsDropdown = document.getElementById('yearsDropdown');

    genres.forEach(genre => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = genre;
        link.onclick = (event) => {
            event.preventDefault();
            localStorage.setItem('genresMovies', genre);
            window.location.href = '../genres.html';
        };
        sideGenresDropdown.appendChild(link);
    });

    years.forEach(year => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = year;
        link.onclick = (event) => {
            event.preventDefault();
            localStorage.setItem('yearsMovies', year);
            window.location.href = '../year.html';
        };
        sideYearsDropdown.appendChild(link);
    });
};

populateDropdowns();

// Toggle side navigation
function toggleNav() {
    const sideNav = document.getElementById("sideNav");
    sideNav.style.width = sideNav.style.width === "250px" ? "0" : "250px";
}

function closeNav() {
    document.getElementById("sideNav").style.width = "0";
}

// Event listeners for navigation
document.getElementById('showGenres').addEventListener('click', function(e) {
    e.preventDefault();
    toggleDropdown('genreList', this);
});

document.getElementById('showYears').addEventListener('click', function(e) {
    e.preventDefault();
    toggleDropdown('yearList', this);
});

function toggleDropdown(dropdownId, triggerElement) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
    dropdown.style.left = triggerElement.getBoundingClientRect().left + 'px';
    dropdown.style.top = triggerElement.getBoundingClientRect().bottom + 'px';
}
const hreftoWatch = (id)=>{
 localStorage.setItem('MovieType',id)
 window.location.href='../phimbo/movie.html'
}
console.log('file đã được tải');
