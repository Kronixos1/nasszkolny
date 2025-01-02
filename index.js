const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views'));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files'); // Save files in public/files folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    }
});
const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    const { label, content, files, dateDue, background, subject, type, uploadDate } = req.body;
    const filePath = req.file ? `files/${req.file.filename}` : null;

    let newId = 0;
    for (block of testObjects) {
        if (block.id > newId) {
            newId = block.id;
        }
    }
    newId++;
    let backgroundImg;
    switch(type) {
        case "sprawdzian":
            backgroundImg = "/assets/backgrounds/s.png"
            break;
        case "notatka":
            backgroundImg = "/assets/backgrounds/n.png"
            break;
        case "pracaDomowa":
            backgroundImg = "/assets/backgrounds/pd.png"
            break;
        case "kartkowka":
            backgroundImg = "/assets/backgrounds/k.png"
            break;
        case "prezentacja":
            backgroundImg = "/assets/backgrounds/p.png"
            break;
        case "inne":
            backgroundImg = "/assets/backgrounds/i.png"
            break;
        default:
            backgroundImg = "/assets/backgrounds/err.png";
      } 
    const newObject = {
        id: newId,
        label,
        content,
        files: filePath,
        dateDue,
        background: backgroundImg, // Default background
        subject,
        type,
        uploadDate: getCurrentDate()
    };

    testObjects.push(newObject);

    // Save the updated array to the JSON file
    fs.writeFile('pseudoDB/files.json', JSON.stringify(testObjects, null, 2), (err) => {
        if (err) {
            console.error('Error saving data:', err);
            return res.status(500).send('Error saving data');
        }
        console.log('Data written to file');
        res.redirect('/'); // Redirect to home page or another confirmation page
    });
});


app.get('/upload', (req, res) => {
    res.render('upload'); // Render the upload.ejs file
});

testObj1 = {
    id: 1,
    label: "Sprawdzian lalka",
    content: "łeeeeełęęęęęęęęęęęęęę",
    files: "pseudoDB/files/a.jpg",
    dateDue: "2021-06-30",
    background: "/assets/backgrounds/err.png",
    subject: "Polski",
    type: "sprawdzian",
    uploadDate: "2024-10-30/00:00:00"
}
//notatka, sprawdzian, praca domowa, kartkówka, prezentacja, inne

testObj2 = {
    id: 2,
    label: "zdjęcie sprawdzianu z aplikacji dekstopowych",
    content: "abcdefgsss",
    files: "pseudoDB/files/a.jpg",
    dateDue: "2024-05-30",
    background: "/assets/backgrounds/err.png",
    subject: "Matematyka",
    type: "sprawdzian",
    uploadDate: "2025-12-30/00:00:15"

}
testObj3 = {
    id: 3,
    label: "kupa w dupie",
    content: "abcdefgsss",
    files: "pseudoDB/files/a.jpg",
    dateDue: "2024-09-30",
    background: "/assets/backgrounds/err.png",
    subject: "Angielski",
    type: "inne",
    uploadDate: "2024-11-30/00:00:10"

}
testObj4 = {
    id: 4,
    label: "kupa w dupie",
    content: "abcdefgsss",
    files: "pseudoDB/files/a.jpg",
    dateDue: "2024-09-30",
    background: "/assets/backgrounds/err.png",
    subject: "Angielski",
    type: "inne",
    uploadDate: "2024-11-30/00:00:10"

}
testObj5 = {
    id: 5,
    label: "kupa w dupie",
    content: "abcdefgsss",
    files: "pseudoDB/files/a.jpg",
    dateDue: "2024-09-30",
    background: "/assets/backgrounds/err.png",
    subject: "Angielski",
    type: "inne",
    uploadDate: "2024-11-30/00:00:10"

}
testObj6 = {
    id: 6,
    label: "kupa w dupie",
    content: "abcdefgsss",
    files: "pseudoDB/files/a.jpg",
    dateDue: "2024-09-30",
    background: "/assets/backgrounds/err.png",
    subject: "Angielski",
    type: "inne",
    uploadDate: "2024-11-30/00:00:10"

}
testObj7 = {
    id: 7,
    label: "kupa w dupie",
    content: "abcdefgsss",
    files: "pseudoDB/files/a.jpg",
    dateDue: "2024-09-30",
    background: "/assets/backgrounds/err.png",
    subject: "Angielski",
    type: "inne",
    uploadDate: "2024-11-30/00:00:10"

}
testObj8 = {
    id: 8,
    label: "kupa w dupie",
    content: "abcdefgsss",
    files: "pseudoDB/files/a.jpg",
    dateDue: "2024-09-30",
    background: "/assets/backgrounds/err.png",
    subject: "Angielski",
    type: "inne",
    uploadDate: "2024-11-30/00:00:10"

}

let testObjects = [];
testObjects.push(testObj1);
testObjects.push(testObj2);
testObjects.push(testObj3);
testObjects.push(testObj4);
testObjects.push(testObj5);
testObjects.push(testObj6);
testObjects.push(testObj7);
testObjects.push(testObj8);

app.get('/', (req, res) => {
    fs.readFile('pseudoDB/files.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading files.json:', err);
            return res.status(500).send('Internal Server Error');
        }

        try {
            const jsonData = JSON.parse(data);

            if (Array.isArray(jsonData)) {
                const blocks = jsonData.map(obj => ({
                    id: obj.id,
                    label: obj.label,
                    content: obj.content,
                    files: obj.files,
                    dateDue: obj.dateDue,
                    background: obj.background,
                    subject: obj.subject,
                    type: obj.type,
                    uploadDate: obj.uploadDate
                }));
                const blocks2 = jsonData.map(obj => ({
                    id: obj.id,
                    label: obj.label,
                    content: obj.content,
                    files: obj.files,
                    dateDue: obj.dateDue,
                    background: obj.background,
                    subject: obj.subject,
                    type: obj.type,
                    uploadDate: obj.uploadDate
                }));
                
                sortByUploadDate(blocks2);
                blocks.sort((a, b) => b.dateDue.localeCompare(a.dateDue));


                res.render('index', { blocks, blocks2 }); // Pass the data to the EJS template

                //console.log('Blocks sent to index.ejs:', blocks);
                //console.log('Blocks sent to index.ejs:', blocksSortedByUpload);
            } else {
                console.error('Error: Data in files.json is not an array.');
                res.status(400).send('Bad Data in JSON');
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).send('Internal Server Error');
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    
    fs.writeFile('pseudoDB/files.json', JSON.stringify(testObjects), (err) => {
        if (err) throw err;
        console.log('Data written to file2');
        
        
    });
});

app.post('/remove-object', (req, res) => {
    const idToRemove = req.body.id; // Get the ID from the request body

    fs.readFile('pseudoDB/files.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).json({ error: 'Error reading the file' });
        }

        try {
            const jsonData = JSON.parse(data);

            if (Array.isArray(jsonData)) {
                const updatedData = jsonData.filter(obj => obj.id !== idToRemove);

                fs.writeFile('pseudoDB/files.json', JSON.stringify(updatedData, null, 2), 'utf8', writeErr => {
                    if (writeErr) {
                        console.error('Error writing to the file:', writeErr);
                        return res.status(500).json({ error: 'Error writing to the file' });
                    }

                    console.log(`Object with id ${idToRemove} has been removed.`);
                    res.json({ success: true, message: `Object with id ${idToRemove} removed.` });
                });
            } else {
                console.error('Data in the JSON file is not an array.');
                res.status(400).json({ error: 'Invalid data format in JSON file' });
            }
        } catch (parseErr) {
            console.error('Error parsing the JSON file:', parseErr);
            res.status(500).json({ error: 'Error parsing the JSON file' });
        }
    });
});



function getCurrentDate() {
    const today = new Date(); // Get the current date
    const year = today.getFullYear(); // Get the current year
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the current month (0-11), add 1 to match the correct month, and pad it to ensure it's 2 digits
    const day = String(today.getDate()).padStart(2, '0'); // Get the current day and pad to ensure it's 2 digits
    
    const hours = String(today.getHours()).padStart(2, '0'); // Get the current hours and pad to ensure it's 2 digits
    const minutes = String(today.getMinutes()).padStart(2, '0'); // Get the current minutes and pad to ensure it's 2 digits
    const seconds = String(today.getSeconds()).padStart(2, '0'); // Get the current seconds and pad to ensure it's 2 digits

    return `${year}-${month}-${day}/${hours}:${minutes}:${seconds}`; // Return the date and time in the format YYYY-MM-DD/HH:MM:SS
}
function sortByUploadDate(arr) {
    return arr.sort((a, b) => {
        // Convert the uploadDate strings into Date objects for sorting
        const dateA = new Date(a.uploadDate.replace('/', 'T'));  // Convert to valid ISO format
        const dateB = new Date(b.uploadDate.replace('/', 'T'));  // Convert to valid ISO format

        // Sort in descending order (latest to earliest)
        return dateB - dateA;
    });
}