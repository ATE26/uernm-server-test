document.addEventListener('DOMContentLoaded', function() {
   // Fonction pour ajouter un événement
   function addEvent(eventName, eventDate, eventDescription, eventId) {
    var eventsSection = document.getElementById('eventList');
    var eventDiv = document.createElement('div');
    eventDiv.classList.add('col-md-6', 'mb-4');
    var eventContent = `
        <div class="card">
            <div class="card-body">
                <h4>${eventName}</h4>
                <p>Date: ${eventDate}</p>
                <p>${eventDescription}</p>
                <a href="registration.html?event-id=${eventId}" class="btn btn-primary">S'inscrire</a>
            </div>
        </div>
    `;
    eventDiv.innerHTML = eventContent;
    eventsSection.appendChild(eventDiv);
}
    // Ajouter les deux premiers événements à la page d'accueil
    addEvent('Formation en Patisserie', '10 Août 2024', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'eventList');
    addEvent('Formation de Fabrication de Savon', '15 Août 2024', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'eventList');

    // Gestion du bouton "Voir plus"
    var voirPlusButton = document.getElementById('voirPlusButton');
    voirPlusButton.addEventListener('click', function() {
        window.location.href = 'events.html';
    });

    // Gestion des liens de navigation actifs
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.forEach(function(link) {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
});
// Gestion des liens des vidéos
document.querySelectorAll('.video-thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        const videoUrl = thumbnail.getAttribute('data-video-url');
        const videoType = thumbnail.getAttribute('data-video-type');
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        let videoIframe = '';
        if (videoType === 'youtube') {
            videoIframe = `<iframe class="embed-responsive-item" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        } else if (videoType === 'local') {
            videoIframe = `<video class="embed-responsive-item" controls><source src="${videoUrl}" type="video/mp4">Your browser does not support the video tag.</video>`;
        }
        modal.innerHTML = `
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="embed-responsive embed-responsive-16by9">
                            ${videoIframe}
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        $(modal).modal('show');
        $(modal).on('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    });
});

// Gestion de la redirection base de donné
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const field = document.getElementById('field').value;

    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, field }),
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  
  