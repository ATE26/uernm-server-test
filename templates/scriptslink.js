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