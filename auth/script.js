const iniciaButton = document.querySelector('.inicia');
const creaButton = document.querySelector('.crea');

const formCrear= document.querySelector('.form_crear');
const formInicio = document.querySelector('.form_inicio');
const formularios = document.querySelector('.formularios');


let eleccion = false;

iniciaButton.addEventListener('click', () => {
   eleccion = true;
    if(eleccion){
        formularios.style.height = "250px";
        iniciaButton.style.backgroundColor = "white";
        creaButton.style.backgroundColor = "#e5e5e5";
        formInicio.style.display = "block";
        //formInicio.style.alignItems = "center";
        //formInicio.style.width = "100%"
        formCrear.style.display = "none";
    } 
    
});

creaButton.addEventListener('click', () => {
    eleccion = true;
     if(eleccion){
        formularios.style.height = "415px";
        creaButton.style.backgroundColor = "white";
        iniciaButton.style.backgroundColor = "#e5e5e5";
        formCrear.style.display = "block";
        //formCrear.style.alignItems = "center";
        formInicio.style.display = "none";
        
    } 
});