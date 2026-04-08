// DATOS
const alojamientos = [
    { titulo: "Apartamento en Barcelona", precio: "120€/noche", img: "https://picsum.photos/400/300?1" },
    { titulo: "Casa en la montaña", precio: "90€/noche", img: "https://picsum.photos/400/300?2" },
    { titulo: "Villa con piscina", precio: "250€/noche", img: "https://picsum.photos/400/300?3" },
    { titulo: "Loft moderno", precio: "150€/noche", img: "https://picsum.photos/400/300?4" },
    { titulo: "Cabaña rústica", precio: "80€/noche", img: "https://picsum.photos/400/300?5" },
    { titulo: "Estudio céntrico", precio: "100€/noche", img: "https://picsum.photos/400/300?6" },
    { titulo: "Ático con terraza", precio: "200€/noche", img: "https://picsum.photos/400/300?7" },
    { titulo: "Casa de playa", precio: "180€/noche", img: "https://picsum.photos/400/300?8" },
    { titulo: "Piso moderno", precio: "130€/noche", img: "https://picsum.photos/400/300?9" },
    { titulo: "Villa rural", precio: "220€/noche", img: "https://picsum.photos/400/300?10" },
    { titulo: "Apartamento histórico", precio: "140€/noche", img: "https://picsum.photos/400/300?11" },
    { titulo: "Loft artístico", precio: "160€/noche", img: "https://picsum.photos/400/300?12" },
    { titulo: "Casa ecológica", precio: "110€/noche", img: "https://picsum.photos/400/300?13" },
    { titulo: "Ático céntrico", precio: "210€/noche", img: "https://picsum.photos/400/300?14" },
    { titulo: "Chalet con jardín", precio: "230€/noche", img: "https://picsum.photos/400/300?15" },
    { titulo: "Estudio minimalista", precio: "95€/noche", img: "https://picsum.photos/400/300?16" },
    { titulo: "Apartamento vintage", precio: "125€/noche", img: "https://picsum.photos/400/300?17" },
    { titulo: "Casa familiar", precio: "190€/noche", img: "https://picsum.photos/400/300?18" },
    { titulo: "Villa moderna", precio: "240€/noche", img: "https://picsum.photos/400/300?19" },
    { titulo: "Cabaña en el bosque", precio: "85€/noche", img: "https://picsum.photos/400/300?20" },
    { titulo: "Apartamento con vistas", precio: "170€/noche", img: "https://picsum.photos/400/300?21" },
    { titulo: "Casa de lujo", precio: "300€/noche", img: "https://picsum.photos/400/300?22" },
    { titulo: "Loft industrial", precio: "155€/noche", img: "https://picsum.photos/400/300?23" },
    { titulo: "Piso acogedor", precio: "115€/noche", img: "https://picsum.photos/400/300?24" }
];

// ESTADO
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
// Array de arrays: [indiceAlojamiento, estrellas]
let puntuaciones = JSON.parse(localStorage.getItem("puntuaciones")) || [];

// ESTILOS
const style = document.createElement("style");
style.textContent = `
body{margin:0;font-family:Arial;background-color:#f5f5f5;}
header{background:white;padding:20px;text-align:center;color:#ff5a5f;font-size:1.5rem;border-bottom:2px solid #ff5a5f;}
.container{display:flex;flex-wrap:wrap;justify-content:center;gap:20px;}
.card{background:white;width:250px;border-radius:10px;overflow:hidden;cursor:pointer;transition:0.3s;text-align:center;padding-bottom:10px;}
.card img{width:100%;}
.card:hover{transform:translateY(-5px);box-shadow:0 4px 8px rgba(0,0,0,0.2);}
button{cursor:pointer;border:none;background-color:rgba(255, 1, 39, 0.41);}
.dark-theme{background-color:#222;color:black;}
`;
document.head.appendChild(style);

// ELEMENTOS HTML
const header = document.getElementById("header");
header.innerHTML = "<h1>Alquileres en OTA</h1>";

const container = document.querySelector(".container");
const favoritosContainer = document.getElementById("favoritosContainer");
const favoritosSection = document.getElementById("favoritosSection");
const searchInput = document.getElementById("searchInput") || createSearchInput();
const toggleBtn = document.getElementById("toggleBtn") || createToggleBtn();
const favoritosBtn = document.getElementById("verFavoritosBtn");

// GUARDAR EN LOCALSTORAGE
function saveLocalStorage() {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    localStorage.setItem("puntuaciones", JSON.stringify(puntuaciones));
}

// OBTENER PUNTUACION POR INDICE
function getPuntuacion(idx) {
    const p = puntuaciones.find(p => p[0] === idx);
    return p ? p[1] : 0;
}

// RENDERIZAR ALOJAMIENTOS
function renderAlojamientos(lista) {
    container.innerHTML = "";

    // ORDENAR POR PUNTUACION DESCENDENTE
    lista.sort((a, b) => {
        const idxA = alojamientos.indexOf(a);
        const idxB = alojamientos.indexOf(b);
        return getPuntuacion(idxB) - getPuntuacion(idxA);
    });

    lista.forEach(alojamiento => {
        const idx = alojamientos.indexOf(alojamiento);
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = alojamiento.img;

        const titulo = document.createElement("h2");
        titulo.textContent = alojamiento.titulo;

        const precio = document.createElement("p");
        precio.textContent = alojamiento.precio;

        // FAVORITO
        const favBtn = document.createElement("button");
        favBtn.textContent = favoritos.includes(idx) ? "❤️" : "🤍";
        favBtn.style.fontSize = "20px";
        favBtn.style.border = "none";
        favBtn.style.background = "transparent";
        favBtn.addEventListener("click", e => {
            e.stopPropagation();
            const i = favoritos.indexOf(idx);
            if (i === -1) favoritos.push(idx);
            else favoritos.splice(i, 1);
            saveLocalStorage();
            renderAlojamientos(lista);
            renderFavoritos();
        });

        // RESERVAR
        const reservarBtn = document.createElement("button");
        reservarBtn.textContent = "Reservar";
        reservarBtn.style.background = "#ff5a5f";
        reservarBtn.style.color = "white";
        reservarBtn.style.border = "none";
        reservarBtn.style.padding = "5px 10px";
        reservarBtn.style.marginLeft = "10px";
        reservarBtn.addEventListener("click", e => {
            e.stopPropagation();
            alert(`Reserva confirmada en: ${alojamiento.titulo}`);
        });

        const btnContainer = document.createElement("div");
        btnContainer.style.display = "flex";
        btnContainer.style.justifyContent = "center";
        btnContainer.style.margin = "10px 0";
        btnContainer.appendChild(favBtn);
        btnContainer.appendChild(reservarBtn);

        // ESTRELLAS
        const estrellasContainer = document.createElement("div");
        estrellasContainer.style.margin = "10px 0";

        for (let i = 1; i <= 5; i++) {
            const estrella = document.createElement("span");
            estrella.textContent = "☆";
            estrella.style.fontSize = "20px";
            estrella.style.cursor = "pointer";
            estrella.style.color = "#ffbf00";

            const existing = puntuaciones.find(p => p[0] === idx);
            if (existing && existing[1] >= i) estrella.textContent = "★";

            estrella.addEventListener("click", () => {
                // Actualizar array [indice, estrellas]
                const pos = puntuaciones.findIndex(p => p[0] === idx);
                if (pos === -1) puntuaciones.push([idx, i]);
                else puntuaciones[pos][1] = i;
                saveLocalStorage();
                renderAlojamientos(lista); // reordenar tras puntuación
            });

            estrellasContainer.appendChild(estrella);
        }

        card.append(img, titulo, precio, btnContainer, estrellasContainer);
        container.appendChild(card);
    });
}

// RENDER FAVORITOS
function renderFavoritos() {
    favoritosContainer.innerHTML = "";
    let listaFav = alojamientos.filter((a, i) => favoritos.includes(i));
    // Ordenar por puntuación
    listaFav.sort((a, b) => {
        const idxA = alojamientos.indexOf(a);
        const idxB = alojamientos.indexOf(b);
        return getPuntuacion(idxB) - getPuntuacion(idxA);
    });

    listaFav.forEach(a => {
        const idx = alojamientos.indexOf(a);
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${a.img}">
            <h2>${a.titulo}</h2>
            <p>${a.precio}</p>
        `;
        const estrellasDiv = document.createElement("div");
        estrellasDiv.style.margin = "10px 0";
        for (let i = 1; i <= 5; i++) {
            const estrella = document.createElement("span");
            estrella.textContent = "☆";
            estrella.style.fontSize = "20px";
            estrella.style.color = "#ffbf00";
            const existing = puntuaciones.find(p => p[0] === idx);
            if (existing && existing[1] >= i) estrella.textContent = "★";
            estrellasDiv.appendChild(estrella);
        }
        card.appendChild(estrellasDiv);
        favoritosContainer.appendChild(card);
    });
}

// BUSCADOR
searchInput.addEventListener("input", () => {
    const texto = searchInput.value.toLowerCase();
    const filtrados = alojamientos.filter(a => a.titulo.toLowerCase().includes(texto));
    renderAlojamientos(filtrados);
});

// DARK MODE
toggleBtn.addEventListener("click", () => document.body.classList.toggle("dark-theme"));

// VER FAVORITOS
favoritosBtn.addEventListener("click", () => {
    const visible = favoritosSection.style.display === "block";
    favoritosSection.style.display = visible ? "none" : "block";
    container.style.display = visible ? "flex" : "none";
    renderFavoritos();
});

// INICIAL
renderAlojamientos(alojamientos);

// FUNCIONES AUXILIARES
function createSearchInput() {
    const input = document.createElement("input");
    input.id = "searchInput";
    input.placeholder = "Buscar alojamiento...";
    input.style.display = "block";
    input.style.margin = "20px auto";
    input.style.padding = "10px";
    document.body.insertBefore(input, container);
    return input;
}
function createToggleBtn() {
    const btn = document.createElement("button");
    btn.id = "toggleBtn";
    btn.textContent = "Cambiar tema";
    btn.style.display = "block";
    btn.style.margin = "10px auto";
    btn.style.padding = "10px 20px";
    document.body.insertBefore(btn, container);
    return btn;
}