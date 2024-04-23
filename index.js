const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let cats = [];

// POST endpoint to add a new cat
app.post('/cats', (req, res) => {
    try {
        const { Id, Name, Age, PictureUrl } = req.body;
        
        if (!Id || !Name || !Age) {
            return res.status(400).send('Id, Name, and Age are required fields');
        }

        if (typeof Id !== 'number' || typeof Age !== 'number') {
            return res.status(400).send('Id and Age must be numbers');
        }

        if (typeof Name !== 'string') {
            return res.status(400).send('Name must be a string');
        }

        const existingCat = cats.find(cat => cat.Id === Id);
        if (existingCat) {
            return res.status(409).send('A cat with the same ID already exists');
        }

        const cat = { Id, Name, Age, PictureUrl };
        cats.push(cat);
        saveCats();
        res.status(201).json(cat);
    } catch (error) {
        console.error('Error adding cat:', error);
        res.status(500).send('Error adding cat');
    }
});


// PUT endpoint to update an existing cat
app.put('/cats/:id', (req, res) => {
    try {
        const catId = req.params.id;
        const { Name, Age, PictureUrl } = req.body;
        
        if (typeof Age !== 'number') {
            return res.status(400).send('Age must be a number');
        }

        if (typeof Name !== 'string') {
            return res.status(400).send('Name must be a string');
        }

        const catIndex = cats.findIndex(cat => cat.Id === parseInt(catId));
        if (catIndex === -1) {
            return res.status(404).send('Cat not found');
        }

        cats[catIndex] = { Id: parseInt(catId), Name, Age, PictureUrl };
        saveCats();

        res.status(200).send('Cat updated successfully');
    } catch (error) {
        console.error('Error updating cat:', error);
        res.status(500).send('Error updating cat');
    }
});

// GET endpoint to retrieve all cats
app.get('/cats', (req, res) => {
    try {
        res.json(cats);
    } catch (error) {
        console.error('Error getting cats:', error);
        res.status(500).send('Error getting cats');
    }
});

// GET endpoint to retrieve a specific cat by ID
app.get('/cats/:id', (req, res) => {
    try {
        const catId = req.params.id;
        const cat = cats.find(cat => cat.Id === parseInt(catId));
        if (!cat) {
            res.status(404).send('Cat not found');
        } else {
            res.json(cat);
        }
    } catch (error) {
        console.error('Error getting cat:', error);
        res.status(500).send('Error getting cat');
    }
});

// DELETE endpoint to delete a cat by ID
app.delete('/cats/:id', (req, res) => {
    try {
        const catId = req.params.id;
        cats = cats.filter(cat => cat.Id !== parseInt(catId));
        saveCats();
        res.status(200).send('Cat deleted successfully');
    } catch (error) {
        console.error('Error deleting cat:', error);
        res.status(500).send('Error deleting cat');
    }
});

function saveCats() {
    fs.writeFileSync('cats.json', JSON.stringify(cats, null, 2));
}

function loadCats() {
    try {
        const data = fs.readFileSync('cats.json');
        cats = JSON.parse(data);
    } catch (error) {
        console.error('Error loading cats:', error);
    }
}

loadCats();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
