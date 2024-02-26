"use strict";
// Class User
class User {
  constructor(
    firstName,
    lastName,
    username,
    password,
    pageSize = 10,
    category = "Business"
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = username;
    this.password = password;

    this.pageSize = pageSize;
    this.category = category;
  }
}

// Class Task
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
