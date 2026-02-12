const currentUser = getCurrentUser();
const welcome = document.getElementById('welcome');
welcome.innerText = `Bienvenue ${currentUser.email} (${currentUser.role})`;

const adminView = document.getElementById('adminView');
const employeeView = document.getElementById('employeeView');
if (currentUser.role === 'admin') {
  adminView.style.display = 'block';
  employeeView.style.display = 'none';
} else {
  adminView.style.display = 'none';
  employeeView.style.display = 'block';
  loadMySite();
}

// ==== TEAMS ====
function getTeams() {
  return JSON.parse(localStorage.getItem('teams')) || [];
}

function saveTeams(teams) {
  localStorage.setItem('teams', JSON.stringify(teams));
}

function createTeam() {
  const members = [...document.querySelectorAll('#teamMembers input:checked')].map(e => e.value);
  const name = document.getElementById('teamName').value;
  const teams = getTeams();
  teams.push({name, members});
  saveTeams(teams);
  alert('Équipe créée');
  updateSiteTeamSelect();
}

function updateSiteTeamSelect() {
  const select = document.getElementById('siteTeam');
  select.innerHTML = '';
  getTeams().forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.name;
    opt.text = t.name;
    select.add(opt);
  });
}

// ==== SITES ====
function getSites() {
  return JSON.parse(localStorage.getItem('sites')) || [];
}

function saveSites(sites) {
  localStorage.setItem('sites', JSON.stringify(sites));
}

function createSite() {
  const name = document.getElementById('siteName').value;
  const address = document.getElementById('siteAddress').value;
  const team = document.getElementById('siteTeam').value;
  const sites = getSites();
  sites.push({name, address, team});
  saveSites(sites);
  alert('Chantier assigné');
}

// ==== EMPLOYEE VIEW ====
function loadMySite() {
  const sites = getSites();
  const teams = getTeams();
  const myTeam = teams.find(t => t.members.includes(currentUser.email));
  const mySite = sites.find(s => myTeam && s.team === myTeam.name);
  document.getElementById('mySite').innerText = mySite ? `${mySite.name} – ${mySite.address}` : 'Aucun';
}

// ==== PRESENCE ====
function setPresence(v) {
  const presences = JSON.parse(localStorage.getItem('presences')) || {};
  presences[currentUser.email] = v;
  localStorage.setItem('presences', JSON.stringify(presences));
  alert(v ? 'Présent confirmé' : 'Absent confirmé');
}

// ==== SMS SIMULÉ ====
function sendSMS(target) {
  const log = document.getElementById('smsLog');
  const users = getUsers();
  let toSend = users.map(u => u.email);
  if (target !== 'Tous') toSend = [target];
  toSend.forEach(u => {
    const p = document.createElement('p');
    p.textContent = `SMS simulé envoyé à ${u}`;
    log.appendChild(p);
  });
  alert('SMS simulé envoyé');
}

// ==== INITIALISATION ====
updateSiteTeamSelect();
