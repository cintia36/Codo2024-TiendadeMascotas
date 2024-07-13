function agregarAlCarrito(boton) {
    var botonElement = document.getElementById(boton.id);
    botonElement.classList.remove('btn-primary');
    botonElement.classList.add('btn-success');
    botonElement.innerText='Agregado';
}

// const productosGato = [3631, 3126, 3088];
// const productosPerro = [4047, 62, 7120, 631];
// const productosPeces = [7832, 7687, 7684, 6089];
// const productosAves = [3007, 9104, 3000];
const webappApi = "http://localhost:8080/webapp/api/productos";

function mesclarArray(values) {
    let index = values.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (index != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * index);
        index--;

        // And swap it with the current element.
        [values[index], values[randomIndex]] = [values[randomIndex], values[index]];
    }

    return values;
}

function crearRow(producto) {
    const imageUrl = producto.imageUrl;
    const nombre = producto.nombre;
    const precio = producto.precio;

    return `
        <div class="col-3 mt-2">                
            <div class="card">
                <img src="${imageUrl}" class="card-img-top" alt="${nombre}">
                <div class="card-body">
                    <p class="card-text productoNombre">${nombre}</p>
                    <h5 class="text-primary">Precio $${precio}</h5>
                    <div class="d-grid gap-2">
                    <button id="${producto.id}" class="btn btn-primary" onclick="agregarAlCarrito(this)">Agregar al carrito</button>
                </div>
                </div>
            </div>
        </div>`;
}

fetch(webappApi)
    .then(response => response.json())
    .then((productos) => {
        const cardsHtmlArray = productos.map(producto => {
            return crearRow(producto);
        });
        const cardsStringHtml = cardsHtmlArray.join('');
        document.getElementById('productosContainer').innerHTML = cardsStringHtml;
    })
    .catch((err) => {
        alert("ha ocurrido un error al intentar obtener los productos de PUPPIS");
        console.log("error:", err)
    });