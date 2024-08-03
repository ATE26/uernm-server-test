<?php
$servername = "localhost";
$username = "root"; // Remplacez par votre nom d'utilisateur MySQL
$password = ""; // Remplacez par votre mot de passe MySQL
$dbname = "etudiants";

// Créer une connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Récupérer les données du formulaire
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$field = $_POST['field'];
$otherField = $_POST['otherField'];

// Si la filière est "Autre", utiliser la valeur du champ "otherField"
if ($field === "Autre") {
  $field = $otherField;
}

// Préparer et exécuter la requête d'insertion
$sql = "INSERT INTO inscriptions (nom_complet, email, telephone, filiere) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $email, $phone, $field);

if ($stmt->execute()) {
  echo "Inscription réussie !";
} else {
  echo "Erreur: " . $sql . "<br>" . $conn->error;
}

// Fermer la connexion
$stmt->close();
$conn->close();
?>
