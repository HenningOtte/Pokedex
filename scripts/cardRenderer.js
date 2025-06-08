function renderPreviewCard(name, types, id) {
    let content = document.getElementById('content');
    content.innerHTML += preview_card(
        name,
        types[0],
        createTypeIcons(types),
        id
    );
};

function createTypeIcons(types) {
    let icons = '';
    types.forEach((item) => {
        icons += type(item);
    });
    return icons;
};