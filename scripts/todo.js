"use strict";
if (activeUser) {
  const btnAdd = document.getElementById("btn-add");
  const inputTask = document.getElementById("input-task");
  const listContainer = document.getElementById("todo-list");

  renderTask(todoArr);

  // Bắt sự kiện Add Button
  btnAdd.addEventListener("click", function () {
    if (inputTask.value.trim() === "") {
      alert(`Mời bạn nhập Task!`);
    } else if (!checkInput()) {
      alert(`Task bị trùng!`);
    } else {
      const todo = new Task(inputTask.value, activeUser.userName, false);

      // thêm data vào mảng todoArr
      todoArr.push(todo);

      // Cập nhật lại giá trị mảng trên LocalStorage
      saveToStorage("todoArr", todoArr);

      // Hiển thị Tasks
      renderTask(todoArr);
    }
  });

  // Bắt sự kiện nút xóa Task và completed
  listContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("close")) {
      if (confirm(`Xác nhận xóa Task`)) {
        // Lấy textContent của phần tử <li>
        let liTextContent = e.target.parentElement.textContent;

        // Lấy textContent của phần tử <span>
        const spanTextContent = e.target.textContent;

        // Loại bỏ textContent của phần tử <span> khỏi textContent của phần tử <li>
        liTextContent = liTextContent.replace(spanTextContent, "").trim();

        // Lấy vị trí Task cần xóa trong mảng todoArr
        const index = todoArr.findIndex((item) => item.task === liTextContent);

        // Xóa vị trí Task trong mảng
        todoArr.splice(index, 1);

        // Update data mới
        saveToStorage("todoArr", todoArr);

        // Hiển thị Tasks
        renderTask(todoArr);
      }
    }

    if (e.target.parentElement.id === "todo-list") {
      // Lấy textContent của phần tử <li>
      let liTextContent = e.target.textContent;

      // Lấy textContent của phần tử <span>
      const spanTextContent = e.target.querySelector("span").textContent;

      // Loại bỏ textContent của phần tử <span> khỏi textContent của phần tử <li>
      liTextContent = liTextContent.replace(spanTextContent, "").trim();

      // Lấy  Task cần xóa trong mảng todoArr
      const todo = todoArr.find((item) => item.task === liTextContent);

      // Thêm hoặc xóa class checked
      e.target.classList.toggle("checked");

      // Nếu có checked thì đổi thuộc tính isDone thành true và ngược lại
      todo.isDone = e.target.classList.contains("checked") ? true : false;

      // Cập nhật lại data
      saveToStorage("todoArr", todoArr);
    }
  });

  // Hàm hiển thị Task
  function renderTask(tasks) {
    let html = "";
    tasks.forEach(function (task) {
      if (task.owner === activeUser.userName) {
        html += `
      <li class=${task.isDone ? "checked" : ""}>
      ${task.task}
      <span class="close">×</span>
    </li>
    `;
      }
    });
    listContainer.innerHTML = html;
  }

  // Hàm check input không được trùng
  function checkInput() {
    for (let i = 0; i < todoArr.length; i++) {
      if (todoArr[i].task === inputTask.value) {
        return false;
        break;
      }
    }
    return true;
  }
} else {
  alert(`Mời bạn đăng nhập!`);
  window.location.href = "../index.html";
}
