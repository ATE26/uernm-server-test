const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const excelJS = require('exceljs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const filePath = 'etudiants.json';

// Créez le fichier JSON si celui-ci n'existe pas
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

app.post('/register', (req, res) => {
  const { name, email, phone, field } = req.body;

  try {
    const data = JSON.parse(fs.readFileSync(filePath));
    data.push({ name, email, phone, field });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.json({ message: 'Inscription réussie' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/get-students', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath));
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des données' });
  }
});

app.get('/download-excel', async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath));

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet('Inscriptions');

    worksheet.columns = [
      { header: 'Nom Complet', key: 'name', width: 30 },
      { header: 'Adresse Email', key: 'email', width: 30 },
      { header: 'Numéro de Téléphone', key: 'phone', width: 20 },
      { header: 'Filière d\'Études', key: 'field', width: 30 },
    ];

    worksheet.addRows(data);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=inscriptions.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du fichier Excel' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
