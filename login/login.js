document.addEventListener('DOMContentLoaded', () => {
   
    const form = document.querySelector('form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const avatar = document.getElementById('avatar');

    // Lấy danh sách người dùng từ localStorage
    let users = JSON.parse(localStorage.getItem('user')) || [];

    // Kiểm tra nếu người dùng đã đăng nhập khi tải trang và xóa CurrentUser
    const checkLoggedIn = () => {
        const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
        if (currentUser) {
            localStorage.removeItem('CurrentUser'); // Xóa thông tin người dùng hiện tại khỏi localStorage
        }
    };

    // Gọi hàm checkLoggedIn để xóa currentUser khi tải trang
    checkLoggedIn();

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form để xử lý kiểm tra dữ liệu

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Hàm kiểm tra người dùng
        const validateLogin = () => {
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === email && users[i].username === username) {
                    if (users[i].passWord === password) {
                        avatar.src = users[i].avatar; // Hiển thị ảnh đại diện của người dùng
                        localStorage.setItem('CurrentUser', JSON.stringify(users[i])); // Lưu thông tin người dùng hiện tại vào localStorage
                        alert("Đăng nhập thành công");
                        return true;
                    } else {
                        alert("Mật khẩu không đúng");
                        return false;
                    }
                }
            }
            alert("Tên đăng nhập hoặc email không đúng");
            return false;
        };

        // Kiểm tra thông tin đăng nhập
        if (validateLogin()) {
            window.location.href = "../index.html"; // Thay đổi đường dẫn sau khi đăng nhập thành công
        }
    });

    // Xử lý khi người dùng gõ vào trường email
    emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        let found = false;

        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                avatar.src = users[i].avatar; // Hiển thị ảnh đại diện của tài khoản có email này
                found = true;
                break;
            }
        }

        if (!found) {
            avatar.src = "../user.png"; // Ảnh mặc định nếu không tìm thấy người dùng
        }
    });
});
window.onload = function () {
    document.getElementById("backgroundMusic").play();
  };