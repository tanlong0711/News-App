"use strict";

// Hàm lưu vào localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Hàm lấy dữ liệu từ localStorage
function getFromStorage(key, defaultVal) {
  return JSON.parse(localStorage.getItem(key) ?? defaultVal);
}

// Lấy dữ liệu từ local
const users = getFromStorage("userArr", "[]");

// Chuyển đổi data về Class instance
const userArr = users.map((user) => parseUser(user)); // return về 1 mảng chứa các instance của Class

// Tạo mảng todoArr
const todos = getFromStorage("todoArr", "[]");

// Chuyển đổi data về Class instance
const todoArr = todos.map((todo) => parseTodo(todo)); // return về 1 mảng chứa các instance của Class

// Hàm chuyển đổi data từ JS OB sang Class instance
function parseTodo(todoData) {
  const todo = new Task(todoData.task, todoData.owner, todoData.isDone);

  return todo;
}

// Hàm chuyển đổi data từ JS OB sang Class instance
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.password
  );

  return user;
}

// lấy data User đang đăng nhập
let activeUser = getFromStorage("currentUser", null);

// hàm xóa một phần tử trong localStorage
function deleteItem(key) {
  localStorage.removeItem(key);
}
