document.addEventListener('DOMContentLoaded', function () {
    fetch('/get-students')
      .then(response => response.json())
      .then(data => {
        const table = document.createElement('table');
        table.classList.add('table', 'table-bordered', 'table-striped');
  
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
  
        ['Nom Complet', 'Adresse Email', 'Numéro de Téléphone', 'Filière d\'Études'].forEach(headerText => {
          const th = document.createElement('th');
          th.textContent = headerText;
          headerRow.appendChild(th);
        });
  
        thead.appendChild(headerRow);
        table.appendChild(thead);
  
        const tbody = document.createElement('tbody');
  
        data.forEach(student => {
          const row = document.createElement('tr');
  
          ['name', 'email', 'phone', 'field'].forEach(key => {
            const td = document.createElement('td');
            td.textContent = student[key];
            row.appendChild(td);
          });
  
          tbody.appendChild(row);
        });
  
        table.appendChild(tbody);
        document.getElementById('studentsTable').appendChild(table);
      });
  
    document.getElementById('downloadExcel').addEventListener('click', function () {
      window.location.href = '/download-excel';
    });
  });
  