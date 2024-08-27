document.getElementById('addSchoolForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);

    fetch('/addSchool', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, address, latitude, longitude }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('School added successfully!');
                document.getElementById('addSchoolForm').reset(); // Clear the form
            } else {
                alert('Error adding school: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('listSchoolsForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const userLatitude = parseFloat(document.getElementById('userLatitude').value);
    const userLongitude = parseFloat(document.getElementById('userLongitude').value);

    fetch(`/listSchools?latitude=${userLatitude}&longitude=${userLongitude}`)
        .then(response => response.json())
        .then(data => {
            const schoolList = document.getElementById('schoolList');
            schoolList.innerHTML = '';
            if (data.length === 0) {
                const listItem = document.createElement('li');
                listItem.className = "list-group-item text-danger";
                listItem.textContent = 'No schools found near your location.';
                schoolList.appendChild(listItem);
            } else {
                data.forEach(school => {
                    const listItem = document.createElement('li');
                    listItem.className = "list-group-item d-flex justify-content-between align-items-center";
                    listItem.innerHTML = `
                    <strong>${school.name}</strong> 
                    <span class="text-muted">${school.address}</span> 
                    <span class="badge bg-primary rounded-pill">${school.distance/1000} km</span>`;
                    schoolList.appendChild(listItem);
                });
            }
        })
        .catch(error => console.error('Error:', error));
});