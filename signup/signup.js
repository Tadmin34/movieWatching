document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const password2Input = document.getElementById('password2');
    const avatar = document.getElementById('avatar');
    const errorMessage = document.getElementById('i');

    let users = JSON.parse(localStorage.getItem('user')) || [];

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const password2 = password2Input.value.trim();
        const avatarSrc = avatar.src;

        // Hàm kiểm tra định dạng email
        const isValidEmail = email => {
            return email.includes('@') && email.endsWith('.com');
        };

        // Hàm kiểm tra dữ liệu đăng ký
        const validateRegistration = () => {
            if (username === '' || email === '' || password === '' || password2 === '') {
                errorMessage.innerText = "Vui lòng điền vào chỗ còn thiếu";
                errorMessage.style.display = "block";
                return false;
            }
            if (!isValidEmail(email)) {
                errorMessage.innerText = "Đây không phải email hợp lệ";
                errorMessage.style.display = "block";
                return false;
            }
            if (password.length < 6) {
                errorMessage.innerText = "Mật khẩu phải có ít nhất 6 ký tự";
                errorMessage.style.display = "block";
                return false;
            }
            if (password !== password2) {
                errorMessage.innerText = "Nhập lại mật khẩu không khớp";
                errorMessage.style.display = "block";
                return false;
            }
            return true;
        };

        // Hàm kiểm tra email đã tồn tại
        const isEmailExisting = () => {
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === email) {
                    return true;
                }
            }
            return false;
        };

        if (validateRegistration()) {
            if (isEmailExisting()) {
                errorMessage.innerText = "Email này đã tồn tại";
                errorMessage.style.display = "block";
            } else {
                users.push({
                    username: username,
                    email: email,
                    passWord: password,
                    avatar: avatarSrc
                });
                localStorage.setItem('user', JSON.stringify(users));
                alert("Đăng ký thành công");
                window.location.href = "../login/login.html";
            }
        }
    });

    // Xử lý khi người dùng tải lên ảnh avatar
    document.getElementById('avatarUpload').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('image').src = e.target.result;
                openCropperModal();
            }
            reader.readAsDataURL(file);
        }
    });

    let cropper;

    function openCropperModal() {
        const modal = document.getElementById('cropperModal');
        modal.style.display = 'block';

        const image = document.getElementById('image');
        cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 1,
            autoCropArea: 1,
        });
    }

    document.getElementById('cropButton').addEventListener('click', function() {
        const canvas = cropper.getCroppedCanvas({
            width: 100,
            height: 100,
        });

        const avatar = document.getElementById('avatar');
        avatar.src = canvas.toDataURL();
        document.getElementById('cropperModal').style.display = 'none';
        cropper.destroy();
    });
});
