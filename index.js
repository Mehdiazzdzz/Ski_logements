const express = require('express');
const app = express();

app.use(express.json());

let logements = [
  {
    id: 1,
    nom: "Chalet des Neiges",
    station: "Chamonix",
    prix_par_nuit: 150,
    capacite: 4
  },
  {
    id: 2,
    nom: "Appartement du Lac",
    station: "Annecy",
    prix_par_nuit: 120,
    capacite: 6
  }
];


app.get('/logements', (req, res) => {
  res.json(logements);
});

app.get('/logements/:id', (req, res) => {
  const logementId = parseInt(req.params.id);
  const logement = logements.find(l => l.id === logementId);

  if (logement) {
    res.json(logement);
  } else {
    res.status(404).json({ message: "Logement non trouvé !" });
  }
});



 app.post('/logements', (req, res) => {
  const newLogement = {
    id: logements.length + 1,
    nom: req.body.nom,
    prix_par_nuit: req.body.prix_par_nuit,
    station: req.body.station,
    capacite:req.body.capacite
  };
  logements.push(newLogement);
  res.status(201).json(newLogement);
});


app.put('/logements/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const logement = logements.find(l => l.id === id);

  if (!logement) {
    return res.status(404).json({ message: "Logement non trouvé !" });
  }

  logement.nom = req.body.nom;
  logement.prix_par_nuit = req.body.prix_par_nuit;
  logement.station = req.body.station;
  logement.capacite = req.body.capacite;

  res.json(logement);
});


app.delete('/logements/:id', (req, res) => {
  const id = parseInt(req.params.id);
  logements = logements.filter(l => l.id !== id);
  res.status(204).send();
});



app.listen(3000, () => {
  console.log(`Serveur ski démarré sur 3000`);
});
