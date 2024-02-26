"use strict";

const inputUserName = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");

///////////////////////////////////
// Bắt sự kiện Login
btnSubmit.addEventListener("click", function () {
  // Kiểm tra form
  if (validate(inputUserName.value, inputPassword.value)) {
    // tìm kiếm input đăng nhập có chính xác không
    const currentUser = userArr.find(
      (item) =>
        item.userName === inputUserName.value &&
        item.password === inputPassword.value
    );
    if (currentUser) {
      alert(`Đăng nhập thành công!`);
      window.location.href = "../index.html";
      // lưu lại vào Localstorage
      saveToStorage("currentUser", currentUser);
    } else {
      alert(`Thông tin đăng nhập chưa chính xác!`);
    }
  }
});

// Hàm check form
function validate(user, pass) {
  if (user === "") {
    alert("Vui lòng nhập vào Username!");
    return false;
  }
  if (pass.length <= 8) {
    alert("Password phải có trên 8 kí tự!");
    return false;
  }
  if (pass === "") {
    alert("Vui lòng nhập vào Password!");
    return false;
  }
  return true;
}
