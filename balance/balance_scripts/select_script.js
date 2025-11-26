const activosCirculantesMap = [
  { cuenta: "Efectivo y Equivalente", tipo: "Operación" },
  { cuenta: "Caja", tipo: "Operación" },
  { cuenta: "Bancos", tipo: "Operación" },
  { cuenta: "Inversiones a corto plazo", tipo: "Operación" },
  { cuenta: "Cuentas por cobrar comerciales", tipo: "Operación" },
  { cuenta: "Documentos por cobrar", tipo: "Operación" },
  { cuenta: "Otras cuentas por cobrar", tipo: "Operación" },
  { cuenta: "Deudores diversos", tipo: "Operación" },
  { cuenta: "Gastos pagados por anticipado", tipo: "Operación" },
  { cuenta: "Inventarios", tipo: "Operación" }
];


//ACTIVO
const activosNoCirculantesMap = [
  { cuenta: "Propiedad, Planta y Equipo", tipo: "Inversión" },
  { cuenta: "Terrenos", tipo: "Inversión" },
  { cuenta: "Edificios", tipo: "Inversión" },
  { cuenta: "Maquinaria", tipo: "Inversión" },
  { cuenta: "Equipo de oficina", tipo: "Inversión" },
  { cuenta: "Equipo de transporte", tipo: "Inversión" },
  { cuenta: "Mobiliario", tipo: "Inversión" },
  { cuenta: "Depreciación acumulada", tipo: "Inversión" },
  { cuenta: "Activos intangibles", tipo: "Inversión" },
  { cuenta: "Marcas", tipo: "Inversión" },
  { cuenta: "Patentes", tipo: "Inversión" },
  { cuenta: "Licencias", tipo: "Inversión" },
  { cuenta: "Software", tipo: "Inversión" },
  { cuenta: "Crédito mercantil", tipo: "Inversión" },
  { cuenta: "Inversiones a largo plazo", tipo: "Inversión" }
];


//PASIVO
const pasivoCortoPlazoMap = [
  { cuenta: "Préstamos bancarios a corto plazo", tipo: "Financiamiento" },
  { cuenta: "Cuentas por pagar comerciales", tipo: "Financiamiento" },
  { cuenta: "Documentos por pagar", tipo: "Financiamiento" },
  { cuenta: "Provisiones y retenciones", tipo: "Financiamiento" },
  { cuenta: "Beneficios a empleados", tipo: "Financiamiento" },
  { cuenta: "Impuestos por pagar", tipo: "Financiamiento" },
  { cuenta: "Acreedores diversos", tipo: "Financiamiento" }
];

const pasivoLargoPlazoMap = [
  { cuenta: "Préstamos bancarios a largo plazo", tipo: "Financiamiento" },
  { cuenta: "Documentos por pagar a largo plazo", tipo: "Financiamiento" },
  { cuenta: "Arrendamientos financieros", tipo: "Financiamiento" },
  { cuenta: "Obligaciones por pagar", tipo: "Financiamiento" }
];


//PATRIMONIO
const capitalContableMap = [
  
  { cuenta: "Capital social", tipo: "Capital" },
  { cuenta: "Aportaciones de socios", tipo: "Capital" },
  { cuenta: "Reserva legal", tipo: "Capital" },
  { cuenta: "Utilidades acumuladas", tipo: "Capital" },
  { cuenta: "Pérdidas acumuladas", tipo: "Capital" },
  { cuenta: "Utilidad del ejercicio", tipo: "Capital" }
];





const selectActivoCircualnte = document.querySelector('.select_activo_circulante');
const selectActivoNoCirculante = document.querySelector('.select_activo_noCirculante');

const selectPasivoCortoPlazo = document.querySelector('.select_pasivo_cortoPlazo');
const selectPasivoLargoPlazo = document.querySelector('.select_pasivo_largo_plazo');

const selectCapitalContable = document.querySelector('.select_capital_contable');


activosCirculantesMap.map((cuenta) => {
    let option = document.createElement('option');
    option.value = cuenta.cuenta;
    option.innerText = cuenta.cuenta;
    selectActivoCircualnte.appendChild(option);
});


activosNoCirculantesMap.map((cuenta) => {
    let option = document.createElement('option');
    option.value = cuenta.cuenta;
    option.innerText = cuenta.cuenta;
    selectActivoNoCirculante.appendChild(option);
});


pasivoCortoPlazoMap.map((cuenta) => {
    let option = document.createElement('option');
    option.value = cuenta.cuenta;
    option.innerText = cuenta.cuenta;
    selectPasivoCortoPlazo.appendChild(option);
});

pasivoLargoPlazoMap.map((cuenta) => {
    let option = document.createElement('option');
    option.value = cuenta.cuenta;
    option.innerText = cuenta.cuenta;
    selectPasivoLargoPlazo.appendChild(option);
});

let i = 0;
capitalContableMap.forEach((cuenta) => {
  if(cuenta == "--Capital Contribuido--" || cuenta == "--Capital Ganado--"){
    let option = document.createElement('option');
    option.disabled = true;
    option.innerText = cuenta.cuenta;
    selectCapitalContable.appendChild(option)
  } else {
    let option = document.createElement('option');
    option.value = cuenta.cuenta;
    option.innerText = cuenta.cuenta;
  selectCapitalContable.appendChild(option);
  }
    

});



const formateador = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN', // Código de moneda de la ISO 4217
  minimumFractionDigits: 2, // Mínimo de decimales
});

const agregaButtons = [
    '#agrega_button_activo_circulante',
    '#agrega_button_activo_noCirculante',
    '#agrega_button_pasivo_cortoPlazo',
    '#agrega_button_pasivo_largoPlazo',
    '#agrega_button_capital'
];

const sectionDivs = [
    {clase: '.activo_circulante_section_div', tipo: '.activo_circulante'},
    {clase: '.activo_noCirculante_section_div', tipo: '.activo_noCirculante'},
    {clase: '.pasivo_cortoPlazo_section_div', tipo: '.pasivo_cortoPlazo'},
    {clase: '.pasivo_largoPlazo_section_div', tipo: '.pasivo_largoPlazo'},
    {clase: '.patrimonio_section_div', tipo: '.capital'},
];

const inputs = [
    {clase: '.anioInicial_input_activo_circulante', tipo: '.activo_circulante', anio: 'inicio'},
    {clase: '.anioFinal_input_activo_circulante' ,tipo: '.activo_circulante', anio: 'final'},

    {clase: '.anioInicial_input_activo_noCirculante', tipo: '.activo_noCirculante' , anio: 'inicio'},
    {clase: '.anioFinal_input_activo_noCirculante', tipo: '.activo_noCirculante', anio: 'final'},

    {clase: '.anioInicial_input_pasivo_cortoPlazo', tipo: '.pasivo_cortoPlazo' , anio: 'inicio'},
    {clase: '.anioFinal_input_pasivo_cortoPlazo', tipo: '.pasivo_cortoPlazo' , anio: 'final'},


    {clase: '.anioInicial_input_pasivo_largoPlazo', tipo: '.pasivo_largoPlazo' , anio: 'inicio'},
    {clase: '.anioFinal_input_pasivo_largoPlazo', tipo: '.pasivo_largoPlazo' , anio: 'final'},
    
    {clase: '.anioInicial_input_capital', tipo: '.capital',anio: 'inicio' },
    {clase: '.anioFinal_input_capital', tipo: '.capital' , anio: 'final'}
];




const selects = [
    '.select_activo_circulante',
    '.select_activo_noCirculante',
    '.select_pasivo_cortoPlazo',
    '.select_pasivo_largo_plazo',
    '.select_capital_contable'
];

const tipos = [
    '.activo_circulante',
    '.activo_noCirculante',
    '.pasivo_cortoPlazo',
    '.pasivo_largoPlazo',
    '.capital'
];

const totales = [
 {total: '.total_anio_inicio_activo_circulante', tipo: '.activo_circulante'},
 {total:'.total_anio_final_activo_circulante', tipo: '.activo_circulante'},
 {total:'.total_anio_inicio_activo_noCirculante', tipo: '.activo_noCirculante'},
 {total:'.total_anio_final_activo_noCirculante', tipo: '.activo_noCirculante'},

 {total:'.total_anio_inicio_pasivo_cortoPlazo', tipo: '.pasivo_cortoPlazo'},
 {total:'.total_anio_final_pasivo_cortoPlazo', tipo: '.pasivo_cortoPlazo'},
  {total:'.total_anio_inicio_pasivo_largoPlazo', tipo: '.pasivo_largoPlazo'},
 {total:'.total_anio_final_pasivo_largoPlazo', tipo: '.pasivo_largoPlazo'},


 {total:'.total_anio_inicio_capital', tipo: '.capital'},
 {total:'.total_anio_final_capital', tipo: '.capital'},
]

const totalesGenerales = [
  {total: '.total_activo_anioInicio', tipo: '.activo'},
  {total: '.total_activo_anioFinal', tipos: '.activo'}, 

  {total: '.total_anio_inicio_pasivo', tipos: '.pasivo'},
  {total: '.total_anio_final_pasivo', tipos: '.pasivo'},

  {total: '.total_anio_inicio_capital', tipos: '.capital'},
  {total: '.total_anio_final_capital', tipos: '.capital'},
];





agregaButtons.forEach((button, index) => {
    let agregaBoton = document.querySelector(button);
    let select = document.querySelector(selects[index])
    let tableBody = document.querySelector(sectionDivs[index].clase);
    let tipoCuenta = tipos[index];

    
    let aniosTuple = [];


    agregaBoton.addEventListener('click', () => {
        inputs.forEach((input) => {
            if(tipoCuenta == input.tipo){
                console.log('entrando al bloque de código');
                aniosTuple.push(document.querySelector(input.clase));
            }
        });

        console.log(aniosTuple)
    
        let cuenta = select.value;
        let valorAnioInicio = aniosTuple[0].value;
        let valorAnioFinal = aniosTuple[1].value;


        let calc = valorAnioInicio - valorAnioFinal ;
        

        let nuevoCampo = document.createElement('tr');

        let concepto = document.createElement('td');
        let anioInicio = document.createElement('td');
        let anioFinal = document.createElement('td');
        let variacion = document.createElement('td');
        let slotSign = document.createElement('td');

        anioInicio.className = 'anioInicio';
        anioFinal.className = 'anioFinal';

      

        concepto.textContent = cuenta;
        anioInicio.textContent = formateador.format(valorAnioInicio);
        anioFinal.textContent = formateador.format(valorAnioFinal);
        variacion.textContent = formateador.format(calc);


        
        
        if(calc > 0){
        slotSign.innerHTML = '<i class="bi bi-graph-up-arrow"></i>';
            } else if(calc < 0){
        slotSign.innerHTML = '<i class="bi bi-graph-down-arrow"></i>';
             } else {
        slotSign.innerHTML = '<i class="bi bi-reception-0"></i>'
        }

        nuevoCampo.appendChild(concepto);
        nuevoCampo.appendChild(anioInicio);
        nuevoCampo.appendChild(anioFinal);
        nuevoCampo.appendChild(variacion);
        nuevoCampo.appendChild(slotSign);

        

        tableBody.appendChild(nuevoCampo);

        aniosTuple = [];




        let allInputs = document.querySelectorAll('input');
        allInputs.forEach(input => input.value = '');



        let totalInicioSum = 0;
        let totalFinalSum = 0;


        let filas = tableBody.querySelectorAll('tr');

        filas.forEach(fila => {
            let tdInicio = fila.querySelector('.anioInicio');
            let tdFinal = fila.querySelector('.anioFinal');

            if (!tdInicio || !tdFinal) return;

  
            let numInicio = Number(tdInicio.textContent.replace(/[^\d.-]+/g, ""));
            let numFinal  = Number(tdFinal.textContent.replace(/[^\d.-]+/g, ""));

            totalInicioSum += isNaN(numInicio) ? 0 : numInicio;
            totalFinalSum += isNaN(numFinal) ? 0 : numFinal;
        });



        totales.forEach(totalObj => {
            if (totalObj.tipo === tipoCuenta) {
                let target = document.querySelector(totalObj.total);

                if (totalObj.total.includes("inicio")) {
                    target.textContent = formateador.format(totalInicioSum);
                } else {
                    target.textContent = formateador.format(totalFinalSum);
                }
            }
        });

        calcularTotalesGenerales();

      


        
        
    });




    



});


function calcularTotalesGenerales() {

    // Función auxiliar para obtener suma inicio/final por categoría
    function obtenerSumaPorCategoria(categorias) {
        let sumaInicio = 0;
        let sumaFinal = 0;

        totales.forEach(obj => {
            if (categorias.includes(obj.tipo)) {
                let elemento = document.querySelector(obj.total);
                if (!elemento) return;

                let valor = Number(elemento.textContent.replace(/[^\d.-]+/g, ""));
                
                if (obj.total.includes("inicio")) {
                    sumaInicio += valor;
                } else {
                    sumaFinal += valor;
                }
            }
        });

        return { inicio: sumaInicio, final: sumaFinal };
    }

    // === SUMAS POR GRUPO ===
    let activos = obtenerSumaPorCategoria(['.activo_circulante', '.activo_noCirculante']);
    let pasivos = obtenerSumaPorCategoria(['.pasivo_cortoPlazo', '.pasivo_largoPlazo']);
    let capital = obtenerSumaPorCategoria(['.capital']);

    // === ACTUALIZAR TOTALES GENERALES EN DOM ===
    const colocar = (selector, valor) => {
        let nodo = document.querySelector(selector);
        if (nodo) nodo.textContent = formateador.format(valor);
    };

    // Activos
    colocar('.total_activo_anioInicio', activos.inicio);
    colocar('.total_activo_anioFinal', activos.final);

    // Pasivos
    colocar('.total_pasivo_anioInicio', pasivos.inicio);
    colocar('.total_pasivo_anioFinal', pasivos.final);

    // Capital
    colocar('.total_capital_anioInicio', capital.inicio);
    colocar('.total_capital_anioFinal', capital.final);
}
