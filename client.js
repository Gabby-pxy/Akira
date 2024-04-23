// Function to handle getting all cats
function getCats() {
    fetch('/cats')
        .then(response => response.json())
        .then(cats => {
            const catDataDiv = document.getElementById('catData');
            catDataDiv.innerHTML = '';
            cats.forEach(cat => {
                catDataDiv.innerHTML += `
                    <p>ID: ${cat.Id}</p>
                    <p>Name: ${cat.Name}</p>
                    <p>Age: ${cat.Age}</p>
                    <hr>
                `;
            });
        })
        .catch(error => console.error('Error getting cats:', error));
}

// Function to handle getting a cat by ID
function getCatById() {
    const catId = prompt('Enter Cat ID:');
    if (catId) {
        fetch(`/cats/${catId}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Cat not found');
                }
            })
            .then(cat => {
                const catDataDiv = document.getElementById('catData');
                catDataDiv.innerHTML = `
                    <p>ID: ${cat.Id}</p>
                    <p>Name: ${cat.Name}</p>
                    <p>Age: ${cat.Age}</p>
                `;
            })
            .catch(error => {
                console.error('Error getting cat by ID:', error);
                const catDataDiv = document.getElementById('catData');
                catDataDiv.innerHTML = `<p>${error.message}</p>`;
            });
    }
}

// Function to handle updating a cat by ID
function updateCat() {
    const catId = prompt('Enter Cat ID:');
    if (catId) {
        const newName = prompt('Enter New Name:');
        const newAge = parseInt(prompt('Enter New Age:'));
        const newPictureUrl = prompt('Enter New Picture URL:');
        const updatedCat = { Name: newName, Age: newAge, PictureUrl: newPictureUrl };

        fetch(`/cats/${catId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCat)
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Update failed');
                }
            })
            .then(message => {
                alert(message);
            })
            .catch(error => {
                console.error('Error updating cat:', error);
                alert(error.message);
            });
    }
}

// Function to handle posting a new cat
function postCat() {
    const Id = parseInt(prompt('Enter Cat ID:'));
    const Name = prompt('Enter Cat Name:');
    const Age = parseInt(prompt('Enter Cat Age:'));
    const PictureUrl = prompt('Enter Cat Picture URL:');

    const newCat = { Id, Name, Age, PictureUrl };

    fetch('/cats', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCat)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Post failed');
            }
        })
        .then(cat => {
            const catDataDiv = document.getElementById('catData');
            catDataDiv.innerHTML = `
                <p>ID: ${cat.Id}</p>
                <p>Name: ${cat.Name}</p>
                <p>Age: ${cat.Age}</p>
            `;
        })
        .catch(error => {
            console.error('Error posting cat:', error);
            alert(error.message);
        });
}

// Function to handle deleting a cat by ID
function deleteCat() {
    const catId = prompt('Enter Cat ID:');
    if (catId) {
        fetch(`/cats/${catId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Delete failed');
                }
            })
            .then(message => {
                alert(message);
            })
            .catch(error => {
                console.error('Error deleting cat:', error);
                alert(error.message);
            });
    }
}
