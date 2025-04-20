

function loadTrips() {
  return JSON.parse(localStorage.getItem('trips') || '[]');
}

function saveTrips(data) {
  localStorage.setItem('trips', JSON.stringify(data));
}

function renderTripTable(targetId) {
  const data = loadTrips();
  const tableBody = document.querySelector(`#${targetId} tbody`);
  if (!tableBody) return;

  tableBody.innerHTML = '';

  if (data.length === 0) {
    const row = tableBody.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 5;
    cell.textContent = 'No trip records found.';
    return;
  }

  const path = window.location.pathname;

  data.forEach((trip, index) => {
    const row = tableBody.insertRow();

    if (path.includes('modify')) {
      row.innerHTML = `
        <td><input value="${trip.destination}"></td>
        <td><input value="${trip.country}"></td>
        <td><input value="${trip.duration}"></td>
        <td><input value="${trip.budget}"></td>
        <td><button onclick="updateTrip(${index}, this)">Update</button></td>
      `;
    } else if (path.includes('delete')) {
      row.innerHTML = `
        <td>${trip.destination}</td>
        <td>${trip.country}</td>
        <td>${trip.duration}</td>
        <td>${trip.budget}</td>
        <td><button onclick="deleteTrip(${index})">Delete</button></td>
      `;
    } else {
      row.innerHTML = `
        <td>${trip.destination}</td>
        <td>${trip.country}</td>
        <td>${trip.duration}</td>
        <td>${trip.budget}</td>
      `;
    }
  });
}

function updateTrip(index, btn) {
  const row = btn.closest('tr');
  const inputs = row.querySelectorAll('input');
  const updatedTrip = {
    destination: inputs[0].value.trim(),
    country: inputs[1].value.trim(),
    duration: inputs[2].value.trim(),
    budget: inputs[3].value.trim()
  };

  const trips = loadTrips();
  trips[index] = updatedTrip;
  saveTrips(trips);

  alert('Trip updated successfully!');
  renderTripTable('tripTable');
}

function deleteTrip(index) {
  const trips = loadTrips();
  if (confirm('Are you sure you want to delete this trip?')) {
    trips.splice(index, 1);
    saveTrips(trips);
    alert('Trip deleted successfully!');
    renderTripTable('tripTable');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('tripForm');
  const successMsg = document.getElementById('successMsg');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const trip = {
        destination: form.destination.value.trim(),
        country: form.country.value.trim(),
        duration: form.duration.value.trim(),
        budget: form.budget.value.trim()
      };

      const trips = loadTrips();
      trips.push(trip);
      saveTrips(trips);

      form.reset();
      renderTripTable('tripTable');

      if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.textContent = 'Trip added successfully!';
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 2500);
      }
    });
  }

  renderTripTable('tripTable');
});
