"use strict";

const inputFirstName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUserName = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordComfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

/////////////////////////////////////////////////////////

// Bắt sự kiện nút Register
btnSubmit.addEventListener("click", function () {
  // lấy data người dùng từ form
  const user = new User(
    inputFirstName.value,
    inputLastName.value,
    inputUserName.value,
    inputPassword.value
  );
  if (validate(user)) {
    // đẩy data vào mảng userArr
    userArr.push(user);
    // Lưu vào LocalStorage
    saveToStorage("userArr", userArr);
    // Chuyển đến trang login
    window.location.href = "../pages/login.html";
    alert(`Đã đăng kí thành công!`);
  }
});

///////////////////////////////////////////////////////////////

// Hàm check form
function validate(data) {
  // firstName không được trống
  if (data.firstName.trim() === "") {
    alert("Please input for firstName");
    return false;
  }
  // lastName không được trống

  if (data.lastName.trim() === "") {
    alert("Please input for lasName");
    return false;
  }
  // userName không được trống

  if (data.userName.trim() === "") {
    alert("Please input for userName");
    return false;
  }
  // password không được trống

  if (data.password === "") {
    alert("Please input for password");
    return false;
  }
  // PasswordComfirm không được trống

  if (inputPasswordComfirm.value === "") {
    alert("Please input for Confirm Password");
    return false;
  }
  // 2 password phải trùng nhau
  if (inputPasswordComfirm.value !== data.password) {
    alert("Password và PasswordComfirm không giống nhau!");
    return false;
  }
  // password phải có hơn 8 kí tự
  if (data.password.length <= 8) {
    alert("Password phải có trên 8 kí tự!");
    return false;
  }
  // check có trung userName chưa
  for (let i = 0; i < userArr.length; i++) {
    if (userArr[i].userName === data.userName) {
      alert("Trùng userName!");
      return false;
      break;
    }
  }
  return true;
}
