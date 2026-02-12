function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function addUser(user) {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
}

function deleteUser(email) {
  const users = getUsers().filter(u => u.email !== email);
  saveUsers(users);
}
