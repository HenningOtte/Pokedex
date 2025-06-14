function loadingSpinner() {
    const spinner = document.getElementById('loading');
    spinner.classList.toggle('d-none');
};

function toggleGallery() {
    const gallery = document.getElementById('gallery');
    gallery.classList.toggle('d-none');
};

function toggleScrolling() {
    document.body.classList.toggle('stop-scrolling');
};

function toggleScale() {
    const card = document.getElementsByClassName('pokemon-detail-card');
    setTimeout((() => {
        card[0].classList.toggle('scale');
    }), 20);
};

document.addEventListener('click', (event) => {
    const gallery = document.getElementById('gallery');
    const cardsContainer = document.getElementById('cards_container');
    if (event.target.className === 'overlay') {        
        cardsContainer.innerHTML = '';
        toggleScrolling();
        gallery.classList.toggle('d-none');
    };
});