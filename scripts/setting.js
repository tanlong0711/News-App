"use strict";
if (activeUser) {
  const btnSetting = document.getElementById("btn-submit");
  const categoryInput = document.getElementById("input-category");
  const pageSizeInput = document.getElementById("input-page-size");

  // Đặt giá trị trước đó
  categoryInput.value = activeUser.category;
  pageSizeInput.value = activeUser.pageSize;

  btnSetting.addEventListener("click", function () {
    // Cập nhật lại giá trị activeUser
    activeUser.pageSize = Number.parseInt(pageSizeInput.value);
    activeUser.category = categoryInput.value;
    saveToStorage("currentUser", activeUser);

    // Cập nhật lại data cho userArr
    const index = userArr.findIndex(
      (item) => item.userName === activeUser.userName
    );
    userArr[index] = activeUser;
    saveToStorage("userArr", userArr);
    // Thông báo người dùng và chuyển qua page News
    alert(`Cài đặt thành công!`);
  });
} else {
  alert(`Mời bạn đăng nhập!`);
  window.location.href = "../index.html";
}
