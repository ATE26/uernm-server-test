document.addEventListener('DOMContentLoaded', function() {
    // Récupère les informations de l'événement depuis le localStorage
    var eventName = localStorage.getItem('selectedEventName');
    var eventDate = localStorage.getItem('selectedEventDate');

    // Remplit le champ "Événement" avec le nom de l'événement
    var eventNameField = document.getElementById('event');
    if (eventName && eventDate) {
        eventNameField.value = `${eventName} - ${eventDate}`;
    } else {
        eventNameField.value = 'Événement Inconnu';
    }
});
