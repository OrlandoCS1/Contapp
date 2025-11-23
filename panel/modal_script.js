class Balance {
    nombreBalace;

    nombreEmpresa;

    anioStart;
    anioEnd;

    tipoMoneda;



    constructor(nombreBalace, nombreEmpresa, anioStart, anioEnd, tipoMoneda){
        this.nombreBalace = nombreBalace;
        this.nombreEmpresa = nombreEmpresa;
        this.anioStart = anioStart;
        this.tipoMoneda = tipoMoneda;
    }
}


const balanceButton = document.querySelector('#balance_button');
const resultadosButton = document.querySelector('#resultados_button');
const balanceModal = document.querySelector('.balance_modal');


/*
//TODO agregar los demás contenedores de Flujo de Efectivo
// TODO y de porcientos integrales





function llenarSelectAnios1() {
    const listaAnios1 = document.querySelector('#anios1');
    const listaAnios2 = document.querySelector('#anios2');

    const anioActual = new Date().getFullYear(); // Obtiene el año actual
            const anioInicio = 2015; // Define el año de inicio

            // Bucle for para iterar desde el año actual hasta el año de inicio
            for (let anio = anioActual; anio >= anioInicio; anio--) {
                const opcion = document.createElement("option"); // Crea un nuevo elemento <option>
                opcion.value = anio;
                opcion.textContent = anio;
             
                listaAnios1.appendChild(opcion); // Añade la opción al select
                
            } 
}

function llenarSelectAnios2() {
   
    const listaAnios2 = document.querySelector('#anios2');

    const anioActual = new Date().getFullYear(); // Obtiene el año actual
            const anioInicio = 2015; // Define el año de inicio

            // Bucle for para iterar desde el año actual hasta el año de inicio
            for (let anio = anioActual; anio >= anioInicio; anio--) {
                const opcion = document.createElement("option"); // Crea un nuevo elemento <option>
                opcion.value = anio;
                opcion.textContent = anio;
                listaAnios2.appendChild(opcion);
            
                
            } 
}

llenarSelectAnios1();
llenarSelectAnios2();

*/
//balanceModal.showModal();

balanceButton.addEventListener('click', () =>{
    balanceModal.showModal();
});


// SELECTOR NÚMERO 1 -------------------------------------------------------------------------------------


const listaAnios = document.querySelector('.lista_anios');
let anioSeleccionado = document.querySelector('.anio_seleccionado');
const selector = document.querySelector('.selector');
//---------------------------------------------------------------------------------------------------------
const listaAnios2 = document.querySelector('#lista_anios2');
let anioSeleccionado2 = document.querySelector('#anio_seleccionado2');
const selector2 = document.querySelector('#selector2');


//---------------------------------------------------------------------------------------------------------
const selectorCurrency = document.querySelector('.selector_currency');
let listaCurrency = document.querySelector('.lista_currency');
let selectedCurrency = document.querySelector('.selected_currency');

const dismissButton = document.querySelector('.dismiss_button');




dismissButton.addEventListener('click', () => {
    balanceModal.close();
})



balance = new Balance();
const anioActual = new Date().getFullYear();
let anioInicio = 2005;

for(anioInicio; anioInicio <= anioActual; anioInicio ++){
    let item = document.createElement('li');
    //item.style.backgroundColor = "white";
    item.innerText = anioInicio;
    listaAnios.appendChild(item); 
 

    item.addEventListener('click', () => {
       
        balance.anioInicio = item.innerText;
          console.log( " El anio de inicio es: " + balance.anioInicio);
        anioSeleccionado.innerText = item.innerText;
        listaAnios.style.display = "none";
        anioSeleccionado.style.color = "black";
    });
}

let isOpen = false;




selector.addEventListener('click', () => {
     if(isOpen){
        listaAnios.style.display = "none";
        isOpen = false;
    } else if (!isOpen){
         listaAnios.style.display= "block";
      isOpen = true;
    }

});

// SELECTOR NÚMERO 1 -------------------------------------------------------------------------------------



balance = new Balance();
const anioActual2 = new Date().getFullYear();
let anioInicio2 = 2005;

for(anioInicio2; anioInicio2 <= anioActual2; anioInicio2 ++){
    let item = document.createElement('li');
    item.innerText = anioInicio2;
    listaAnios2.appendChild(item); 
 

    item.addEventListener('click', () => {
       
        balance.anioEnd = item.innerText;
          console.log( " El anio de inicio es: " + balance.anioEnd);
        anioSeleccionado2.innerText = item.innerText;
        listaAnios2.style.display = "none";
        anioSeleccionado2.style.color = "black";
    });
}

let isOpen2 = false;




selector2.addEventListener('click', () => {
     if(isOpen2){
        listaAnios2.style.display = "none";
        isOpen2 = false;
    } else if (!isOpen2){
         listaAnios2.style.display = "block";
      isOpen2 = true;
    }

});



//---CURRENCY----------------------------------------------------


const monedas = ['MXN - Peso Mexicano', 'USD - Dólar Estadounidense', 'EUR - Euro', 'LIB - Libra', 'BIT - Bitcoin', 'Dínar - Kawasaki'];

for(item = 0; item <= monedas.length-1; item ++){
    let elemento = document.createElement('li'); //<------ OJO CON LA DECLARACION DE LA NUEVA VARIABLE
    elemento.innerText = monedas[item];
    console.log(elemento.innerText);
    listaCurrency.appendChild(elemento);

    elemento.addEventListener('click', () => {
        balance.tipoMoneda = elemento.innerText;
        console.log("El tipo de moneda elejida es: "+balance.tipoMoneda);
        selectedCurrency.innerText = elemento.innerText;
        listaCurrency.style.display = "none";
    });
}

let isVisible = false

selectorCurrency.addEventListener('click', () => {
        if(isVisible){
        listaCurrency.style.display = "none";
        isVisible = false;
    } else if (!isVisible){
         listaCurrency.style.display = "block";
      isVisible = true;
    }

    

});