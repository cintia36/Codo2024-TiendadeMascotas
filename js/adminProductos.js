let productosEditables = [];
let idProductoEnEdicion = null;

// const productosGato = [3631, 3126, 3088];
// const productosPerro = [4047, 62, 7120, 631];
// const productosPeces = [7832, 7687, 7684, 6089];
// const productosAves = [3007, 9104, 3000];
const webappApi = "http://localhost:8080/webapp/api/productos";

function refrescarProductos() {
    fetch(webappApi)
    .then(response => response.json())
    .then((productos) => {
        // const productosMesclados = new Array(...mesclarArray(productos));
        // const productosParaMostrar = productosMesclados.slice(0, 8);
        const rowsHtmlArray = productos.map(producto => {
            return crearRow(producto);
        });
        const rowsStringHtml = rowsHtmlArray.join('');
        document.getElementById('tableContent').innerHTML = rowsStringHtml;
        productosEditables = productos;
    })
    .catch((err) => {
        alert("ha ocurrido un error al intentar obtener los productos de webapp BE");
        console.log("error:", err)
    });
}

function modoActualizar() {
    limpiarForm();
    document.getElementById('btnAccordion').innerText = 'Actualizar producto';
    document.getElementById('guardar').classList.add('d-none');
    document.getElementById('actualizar').classList.remove('d-none');
}

function modoCrearProducto() {
    limpiarForm();
    idProductoEnEdicion = null;
    document.getElementById('btnAccordion').innerText = 'Agregar producto';
    document.getElementById('actualizar').classList.add('d-none');
    document.getElementById('guardar').classList.remove('d-none');
}

function editar(productoId) {
    // alert('Editando al producto: ' + productoId);
    modoActualizar();
    const productoElegido = productosEditables.find(p => p.id === productoId);

    if(productoElegido) {
        idProductoEnEdicion = productoId;
        document.getElementById("nuevoNombre").value = productoElegido.nombre;
        document.getElementById("nuevaMarca").value = productoElegido.marca;
        document.getElementById("nuevoPrecio").value = productoElegido.precio;
        document.getElementById("nuevaDescripcion").value = productoElegido.descripcion;
        document.getElementById("nuevoProductoId").value = productoElegido.productoId;
        document.getElementById("nuevoDescuento").value = productoElegido.descuento;
        document.getElementById("nuevaPromocion").value = productoElegido.promocion;
        document.getElementById("nuevaImagenUrl").value = productoElegido.imageUrl;
    } else {
        console.error("Algo salio mal, no se encontró el producto con id: " + productoId);
    }
};

function actualizarProducto() {

    const data = { ...getFormData(), id: idProductoEnEdicion };
    const jsonStringData = JSON.stringify(data);

    fetch(webappApi, {
        method: 'put',
        body: jsonStringData,
        headers: {
            'Content-Type': 'text/json'
        }
    })
    .then(response => {
        modoCrearProducto();        
        refrescarProductos();
        return response.json();
    })
    .then(data => console.log(data));
    
}

function crearRow(producto) {
    const imageUrl = producto.imageUrl;
    const nombre = producto.nombre;



    return `<tr>
                <td>${producto.productoId}</td>
                <td><img src="${imageUrl}" class="card-img-top" alt="${nombre}"></td>
                <td>${nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.marca}</td>
                <td>$${producto.precio}</td>
                <td>${producto.descuento}</td>
                <td>${producto.promocion ?? '-'}</td>
                <td><button type="button" class="btn btn-secondary" onclick="editar(${producto.id})">Editar</button></td>
            </tr>`;
}

function limpiarForm() {
    document.getElementById("nuevoNombre").value = null;
    document.getElementById("nuevaMarca").value = null;
    document.getElementById("nuevoPrecio").value = null;
    document.getElementById("nuevaDescripcion").value = null;
    document.getElementById("nuevoProductoId").value = null;
    document.getElementById("nuevoDescuento").value = null;
    document.getElementById("nuevaPromocion").value = null;
    document.getElementById("nuevaImagenUrl").value = null;
}

function getFormData() {
    const nombre = document.getElementById("nuevoNombre").value;
    const marca = document.getElementById("nuevaMarca").value;
    const precio = document.getElementById("nuevoPrecio").value;
    const descripcion = document.getElementById("nuevaDescripcion").value;
    const productoId = document.getElementById("nuevoProductoId").value;
    const descuento = document.getElementById("nuevoDescuento").value;
    const promocion = document.getElementById("nuevaPromocion").value;
    const imageUrl = document.getElementById("nuevaImagenUrl").value;

    const data = {
        nombre,
        marca,
        precio,
        descripcion,
        productoId,
        descuento,
        promocion,
        imageUrl
    };

    return data;
}

function agregarProducto() {
    const data = getFormData();    
    const jsonStringData = JSON.stringify(data);

    fetch(webappApi, {
        method: 'post',
        body: jsonStringData,
        headers: {
            'Content-Type': 'text/json'
        }
    })
    .then(response => {
        limpiarForm();
        refrescarProductos();
        return response.json();
    })
    .then(data => console.log(data));
}

refrescarProductos();