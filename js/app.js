let patients = [];

function addPatient() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const sys = document.getElementById("systolic").value;
  const dia = document.getElementById("diastolic").value;
  const hr = document.getElementById("heartRate").value;

  if (!name || !age || !sys || !dia || !hr) {
    alert("All fields are required");
    return;
  }

  const status = getStatus(sys, dia, hr);

  const patient = {
    id: Date.now(),
    name,
    age,
    bp: `${sys}/${dia}`,
    hr,
    status
  };

  patients.push(patient);
  renderTable();
  checkAlert();
}

function getStatus(sys, dia, hr) {
  if (sys < 90 || dia < 60 || hr < 40 || hr > 120) {
    return "CRITICAL";
  }
  return "Normal";
}

function renderTable() {
  const table = document.getElementById("patientTable");
  table.innerHTML = "";

  patients.forEach(p => {
    const row = document.createElement("tr");
    row.className = p.status === "CRITICAL" ? "critical" : "normal";

    row.innerHTML = `
      <td>${p.name}</td>
      <td>${p.age}</td>
      <td>${p.bp}</td>
      <td>${p.hr}</td>
      <td>${p.status}</td>
      <td><button class="delete-btn" onclick="deletePatient(${p.id})">Delete</button></td>
    `;

    table.appendChild(row);
  });
}

function deletePatient(id) {
  const patient = patients.find(p => p.id === id);
  if (confirm(`Are you sure you want to delete patient record: ${patient.name}?`)) {
    patients = patients.filter(p => p.id !== id);
    renderTable();
    checkAlert();
  }
}

function checkAlert() {
  const alertBox = document.getElementById("alertBox");
  const critical = patients.find(p => p.status === "CRITICAL");

  if (critical) {
    alertBox.textContent = `ALERT: Patient ${critical.name} has critical health values!`;
    alertBox.classList.remove("hidden");
  } else {
    alertBox.classList.add("hidden");
  }
}
