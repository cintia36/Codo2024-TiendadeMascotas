function agregarAlCarrito(boton) {
    //alert("me hiciste click");
    //console.log(boton.id);
    var botonElement = document.getElementById(boton.id);
    botonElement.classList.remove('btn-primary');
    botonElement.classList.add('btn-success');
    botonElement.innerText='Agregado';
}