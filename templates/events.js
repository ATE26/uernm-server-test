document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour ajouter un événement
    function addEvent(eventName, eventDate, eventDescription, eventId) {
        var eventsSection = document.getElementById('allEventsList');
        var eventDiv = document.createElement('div');
        eventDiv.classList.add('col-md-6', 'mb-4');
        var eventContent = `
        <div class="card">
            <div class="card-body">
            <h4>${eventName}</h4>
            <p>Date: ${eventDate}</p>
            <p>Description: ${eventDescription}</p>
             <button class="btn btn-primary" data-event-id="${eventId}" data-event-name="${eventName}" data-event-date="${eventDate}" onclick="registerEvent(this)">S'inscrire</button>
            </div>
        </div>
        `;
        eventDiv.innerHTML = eventContent;
        eventsSection.appendChild(eventDiv);
    }

    // Ajouter tous les événements
    addEvent('Formation en Patisserie', '10 Août 2024', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1);
    addEvent('Formation de Fabrication de Savon', '15 Août 2024', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2);
    addEvent('Formation d\'insertion Professionnelle', '20 Août 2024', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 3);
    addEvent('Excursion', '25 Août 2024', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 4);
});

// Fonction pour enregistrer les informations de l'événement dans le localStorage et rediriger
function registerEvent(button) {
    var eventId = button.getAttribute('data-event-id');
    var eventName = button.getAttribute('data-event-name');
    var eventDate = button.getAttribute('data-event-date');

    // Enregistrer les informations de l'événement dans le localStorage
    localStorage.setItem('selectedEventId', eventId);
    localStorage.setItem('selectedEventName', eventName);
    localStorage.setItem('selectedEventDate', eventDate);

    // Rediriger vers la page d'inscription
    window.location.href = 'registration.html';
}
