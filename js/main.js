function handleRegister() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  const ok = register(email, password, role);
  document.getElementById("msg").textContent =
    ok ? "Compte créé" : "Utilisateur existe déjà";
}

function handleLogin() {
  const email = loginEmail.value;
  const password = loginPassword.value;

  const user = login(email, password);

  if (!user) {
    loginMsg.textContent = "Identifiants invalides";
    return;
  }

  if (user.role === "admin") {
    window.location.href = "admin.html";
  } else {
    alert("Connecté comme " + user.role);
  }
}
