function loadingSpinner() {
    const spinner = document.getElementById('loading');
    spinner.classList.toggle('d-none');    
};

function toggleScrolling() {
    document.body.classList.toggle('stop-scrolling');
};

document.addEventListener('click', (event) => {
    const gallery = document.getElementById('gallery');
    if (event.target.className === 'overlay') {
        toggleScrolling();
        gallery.classList.toggle('d-none');
    };
});