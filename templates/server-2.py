from flask import Flask, request, jsonify, send_file
import pandas as pd
import os

app = Flask(__name__)
file_path = 'etudiants.xlsx'

# Créez le fichier Excel si celui-ci n'existe pas
if not os.path.exists(file_path):
    df = pd.DataFrame(columns=['Nom Complet', 'Adresse Email', 'Numéro de Téléphone', 'Filière d\'Études'])
    df.to_excel(file_path, index=False)

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    new_entry = pd.DataFrame({
        'Nom Complet': [data['name']],
        'Adresse Email': [data['email']],
        'Numéro de Téléphone': [data['phone']],
        'Filière d\'Études': [data['field']]
    })

    df = pd.read_excel(file_path)
    df = df.append(new_entry, ignore_index=True)
    df.to_excel(file_path, index=False)

    return jsonify({'message': 'Inscription réussie'})

@app.route('/download-excel', methods=['GET'])
def download_excel():
    return send_file(file_path, as_attachment=True)

if __name__ == '__main__':
    app.run(port=5000)
