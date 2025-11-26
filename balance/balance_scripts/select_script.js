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
    '.activo_circulante_section_div',
    '.activo_noCirculante_section_div',
    '.pasivo_cortoPlazo_section_div',
    '.pasivo_largoPlazo_section_div',
    '.patrimonio_section_div'
];

const inputs = [
    {clase: '.anioInicial_input_activo_circulante', tipo: '.activo_circulante'},
    {clase: '.anioFinal_input_activo_circulante' ,tipo: '.activo_circulante'},

    {clase: '.anioInicial_input_activo_noCirculante', tipo: '.activo_noCirculante'},
    {clase: '.anioFinal_input_activo_noCirculante', tipo: '.activo_noCirculante'},

    {clase: '.anioInicial_input_pasivo_cortoPlazo', tipo: '.pasivo_cortoPlazo'},
    {clase: '.anioFinal_input_pasivo_cortoPlazo', tipo: '.pasivo_cortoPlazo'},


    {clase: '.anioInicial_input_pasivo_largoPlazo', tipo: '.pasivo_largoPlazo'},
    {clase: '.anioFinal_input_pasivo_largoPlazo', tipo: '.pasivo_largoPlazo'},
    
    {clase: '.anioInicial_input_capital', tipo: '.capital'},
    {clase: '.anioFinal_input_capital', tipo: '.capital'}
];

const tipos = [
    '.activo_circulante',
    '.activo_noCirculante',
    '.pasivo_cortoPlazo',
    '.pasivo_largoPlazo',
    '.capital'
];


const selects = [
    '.select_activo_circulante',
    '.select_activo_noCirculante',
    '.select_pasivo_cortoPlazo',
    '.select_pasivo_largo_plazo',
    '.select_capital_contable'
];


agregaButtons.forEach((button, index) => {
    let agregaBoton = document.querySelector(button);
    let select = document.querySelector(selects[index])
    let tableBody = document.querySelector(sectionDivs[index]);
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

        let nuevoCampo = document.createElement('tr');

        let concepto = document.createElement('td');
        let anioInicio = document.createElement('td');
        let anioFinal = document.createElement('td');
        let variacion = document.createElement('td');
        let slotSign = document.createElement('td');

        let calc = valorAnioInicio - valorAnioFinal ;

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

        
    });

});