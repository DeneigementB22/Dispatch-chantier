const current = getCurrentUser();
if (!current || current.role !== "admin") {
  window.location.href = "login.html";
}

const list = document.getElementById("userList");
getUsers().forEach(u => {
  const li = document.createElement("li");
  li.textContent = `${u.email} (${u.role})`;

  if (u.role !== "admin") {
    const btn = document.createElement("button");
    btn.textContent = "Supprimer";
    btn.onclick = () => {
      deleteUser(u.email);
      location.reload();
    };
    li.appendChild(btn);
  }

  list.appendChild(li);
});
