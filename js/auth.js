function register(email, password, role) {
  const users = getUsers();
  if (users.find(u => u.email === email)) return false;
  addUser({ email, password, role });
  return true;
}

function login(email, password) {
  const user = getUsers().find(
    u => u.email === email && u.password === password
  );
  if (!user) return null;
  localStorage.setItem("currentUser", JSON.stringify(user));
  return user;
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
