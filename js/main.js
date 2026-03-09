// ===== MAIN.JS - Portfolio BTS SIO SLAM =====
// Fonctions communes aux deux pages

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initLucideIcons();
    initMobileMenu();
    initSmoothScroll();
    highlightCurrentPage();
});

// Initialise les icônes Lucide
function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Gestion du menu mobile
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Ferme le menu au clic sur un lien
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Scroll fluide pour les ancres
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Met à jour l'URL sans recharger
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Met en évidence la page active dans la navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-links a, .menu-mobile a').forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Animation au scroll (optionnel)
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.skill-card, .project-card').forEach(el => {
        observer.observe(el);
    });
}