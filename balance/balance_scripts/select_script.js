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

//ESPACIO PARA COLOCAR LOS ARREGLOS DE CUENTAS CON SU VARIACION"""





const selectActivoCircualnte = document.querySelector('.select_activo_circulante');
const selectActivoNoCirculante = document.querySelector('.select_activo_noCirculante');

const selectPasivoCortoPlazo = document.querySelector('.select_pasivo_cortoPlazo');
const selectPasivoLargoPlazo = document.querySelector('.select_pasivo_largo_plazo');

const selectCapitalContable = document.querySelector('.select_capital_contable');


activosCirculantesMap.map((cuenta) => {
    let option = document.createElement('option');
    option.id = cuenta.cuenta
    option.value = cuenta.cuenta;
    option.innerText = cuenta.cuenta;
    selectActivoCircualnte.appendChild(option);
});


activosNoCirculantesMap.map((cuenta) => {
    let option = document.createElement('option');
    option.id = cuenta.cuenta
    option.value = cuenta.cuenta;
    option.innerText = cuenta.cuenta;
    selectActivoNoCirculante.appendChild(option);
});


pasivoCortoPlazoMap.map((cuenta) => {
    let option = document.createElement('option');
    option.id = cuenta.cuenta
    option.value = cuenta.cuenta;
    option.innerText = cuenta.cuenta;
    selectPasivoCortoPlazo.appendChild(option);
});

pasivoLargoPlazoMap.map((cuenta) => {
    let option = document.createElement('option');
    option.id = cuenta.cuenta
    option.value = cuenta.cuenta;
    option.innerText = cuenta.cuenta;
    selectPasivoLargoPlazo.appendChild(option);
});

let i = 0;
capitalContableMap.forEach((cuenta) => {
  if(cuenta == "--Capital Contribuido--" || cuenta == "--Capital Ganado--"){
    let option = document.createElement('option');
    option.id = cuenta.cuenta
    option.disabled = true;
    option.innerText = cuenta.cuenta;
    selectCapitalContable.appendChild(option)
  } else {
    let option = document.createElement('option');
    option.id = cuenta.cuenta
    option.value = cuenta.cuenta;
    option.innerText = cuenta.cuenta;
  selectCapitalContable.appendChild(option);
  }
    

});

// ----------------- Arreglos para Flujo -----------------
let arrActivosCirculantes = [];
let arrActivosNoCirculantes = [];
let arrPasivoCortoPlazo = [];
let arrPasivoLargoPlazo = [];
let arrCapitalFlujo = [];


// balance.js (POO) — pegar completo

// ----------------- Formateador -----------------
const formateador = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2,
});

// ----------------- Clase Movimiento -----------------
class Movimiento {
  constructor({ cuenta, anioInicio = 0, anioFinal = 0, tipo, subtipo }) {
    this.cuenta = String(cuenta || '');
    this.anioInicio = Number(anioInicio) || 0;
    this.anioFinal = Number(anioFinal) || 0;
    this.tipo = tipo;       // '.activo_circulante' etc (clave para la sección)
    this.subtipo = subtipo; // 'activo' | 'pasivo' | 'capital' (agrupador)
  }

  get variacion() {
    return  this.anioFinal - this.anioInicio;
  }

  get icono() {
    const v = this.variacion;
    if (v > 0) return '<i class="bi bi-graph-up-arrow"></i>';
    if (v < 0) return '<i class="bi bi-graph-down-arrow"></i>';
    return '<i class="bi bi-reception-0"></i>';
  }
}

// ----------------- Clase Balance -----------------
class Balance {
  constructor() {
    this.sections = {
      '.activo_circulante': [],
      '.activo_noCirculante': [],
      '.pasivo_cortoPlazo': [],
      '.pasivo_largoPlazo': [],
      '.capital': []
    };
  }

  addMovimiento(mov) {
    if (!(mov instanceof Movimiento)) return;
    if (!this.sections[mov.tipo]) {
      console.warn('Tipo desconocido al agregar movimiento', mov.tipo);
      return;
    }
    this.sections[mov.tipo].push(mov);
  }

  // Retorna suma inicio/final para una sección tipo (ej: '.activo_circulante')
  totalsBySection(tipo) {
    const arr = this.sections[tipo] || [];
    return arr.reduce((acc, m) => {
      acc.inicio += m.anioInicio;
      acc.final  += m.anioFinal;
      return acc;
    }, { inicio: 0, final: 0 });
  }

  // Totales generales: activos (dos tipos), pasivos (dos tipos), capital (uno)
  totalsGenerales() {
    const activosCir = this.totalsBySection('.activo_circulante');
    const activosNo  = this.totalsBySection('.activo_noCirculante');
    const pasivoCP    = this.totalsBySection('.pasivo_cortoPlazo');
    const pasivoLP    = this.totalsBySection('.pasivo_largoPlazo');
    const capital     = this.totalsBySection('.capital');

    return {
      activos: {
        inicio: activosCir.inicio + activosNo.inicio,
        final:  activosCir.final  + activosNo.final
      },
      pasivos: {
        inicio: pasivoCP.inicio + pasivoLP.inicio,
        final:  pasivoCP.final  + pasivoLP.final
      },
      capital: {
        inicio: capital.inicio,
        final:  capital.final
      }
    };
  }
}

// ----------------- Utilitarios DOM -----------------
const parseNumberFromText = text => {
  if (!text && text !== 0) return 0;
  return Number(String(text).replace(/[^\d.-]+/g, "")) || 0;
};

// Devuelve el primer nodo existente entre las opciones
const findExisting = (...selectors) => {
  for (const s of selectors) {
    const n = document.querySelector(s);
    if (n) return n;
  }
  return null;
};

// ----------------- Mapeo entre tipo -> tbody y totales (asegúrate que clases HTML coincidan) -----------------
const sectionMap = {
  '.activo_circulante': {
    tbody: '.activo_circulante_section_div',
    totalInicio: '.total_anio_inicio_activo_circulante',
    totalFinal:  '.total_anio_final_activo_circulante'
  },
  '.activo_noCirculante': {
    tbody: '.activo_noCirculante_section_div',
    totalInicio: '.total_anio_inicio_activo_noCirculante',
    totalFinal:  '.total_anio_final_activo_noCirculante'
  },
  '.pasivo_cortoPlazo': {
    tbody: '.pasivo_cortoPlazo_section_div',
    totalInicio: '.total_anio_inicio_pasivo_cortoPlazo',
    totalFinal:  '.total_anio_final_pasivo_cortoPlazo'
  },
  '.pasivo_largoPlazo': {
    tbody: '.pasivo_largoPlazo_section_div',
    totalInicio: '.total_anio_inicio_pasivo_largoPlazo',
    totalFinal:  '.total_anio_final_pasivo_largoPlazo'
  },
  '.capital': {
    // Soporta ambos nombres por si tu HTML usa "patrimonio_section_div"
    tbody: findExisting('.patrimonio_section_div', '.capital_section_div', '.patrimonio_section_div'),
    totalInicio: '.total_anio_inicio_capital',
    totalFinal:  '.total_anio_final_capital'
  }
};

// ----------------- Instancia global del Balance -----------------
const balance = new Balance();

// ----------------- Selectores base (según tu estructura) -----------------
const agregaButtons = [
  '#agrega_button_activo_circulante',
  '#agrega_button_activo_noCirculante',
  '#agrega_button_pasivo_cortoPlazo',
  '#agrega_button_pasivo_largoPlazo',
  '#agrega_button_capital'
];

const selects = [
  '.select_activo_circulante',
  '.select_activo_noCirculante',
  '.select_pasivo_cortoPlazo',
  '.select_pasivo_largo_plazo',
  '.select_capital_contable'
];

// Inputs por tipo para localizar los inputs correspondientes
const inputsPorTipo = {
  '.activo_circulante': {
    inicio: '.anioInicial_input_activo_circulante',
    final:  '.anioFinal_input_activo_circulante'
  },
  '.activo_noCirculante': {
    inicio: '.anioInicial_input_activo_noCirculante',
    final:  '.anioFinal_input_activo_noCirculante'
  },
  '.pasivo_cortoPlazo': {
    inicio: '.anioInicial_input_pasivo_cortoPlazo',
    final:  '.anioFinal_input_pasivo_cortoPlazo'
  },
  '.pasivo_largoPlazo': {
    inicio: '.anioInicial_input_pasivo_largoPlazo',
    final:  '.anioFinal_input_pasivo_largoPlazo'
  },
  '.capital': {
    inicio: '.anioInicial_input_capital',
    final:  '.anioFinal_input_capital'
  }
};

// Tipo contable para flujo
const tipoFlujoMap = {
  '.activo_circulante': "Operacion",
  '.activo_noCirculante': "Inversion",
  '.pasivo_cortoPlazo': "Operacion",
  '.pasivo_largoPlazo': "Financiamiento",
  '.capital': "Capital"
};

let cuentasUtilidadEjercicio = [

];

// ----------------- Funciones de actualización DOM -----------------

// Renderiza (append) una fila en el tbody asociado a `tipo`
function renderRowForMovimiento(mov) {
  const cfg = sectionMap[mov.tipo];
  if (!cfg) {
    console.warn('No hay configuración de sección para tipo', mov.tipo);
    return;
  }

  // resolución de tbody (cfg.tbody puede ser selector o nodo)
  let tbodyNode = null;
  if (typeof cfg.tbody === 'string') tbodyNode = document.querySelector(cfg.tbody);
  else tbodyNode = cfg.tbody; // si findExisting devolvió el nodo para capital

  if (!tbodyNode) {
    console.warn('No se encontró tbody para', mov.tipo, cfg);
    return;
  }

  const tr = document.createElement('tr');

  const tdConcepto = document.createElement('td');
  tdConcepto.textContent = mov.cuenta;

  const tdInicio = document.createElement('td');
  tdInicio.className = 'anioInicio';
  tdInicio.textContent = formateador.format(mov.anioInicio);

  const tdFinal = document.createElement('td');
  tdFinal.className = 'anioFinal';
  tdFinal.textContent = formateador.format(mov.anioFinal);

  const tdVariacion = document.createElement('td');
  tdVariacion.textContent = formateador.format(mov.variacion);

  const tdIcon = document.createElement('td');
  tdIcon.innerHTML = mov.icono;

  tr.appendChild(tdConcepto);
  tr.appendChild(tdInicio);
  tr.appendChild(tdFinal);
  tr.appendChild(tdVariacion);
  tr.appendChild(tdIcon);

  tbodyNode.appendChild(tr);
}

// Calcula y actualiza totales de una sección en DOM (y retorna los valores)
function updateSectionTotalsDOM(tipo) {
  const cfg = sectionMap[tipo];
  if (!cfg) return { inicio: 0, final: 0 };

  // Obtener valores desde el objeto Balance (fuente de la verdad)
  const totals = balance.totalsBySection(tipo);

  // Actualizar nodos
  const nodoInicio = document.querySelector(cfg.totalInicio);
  const nodoFinal  = document.querySelector(cfg.totalFinal);

  if (nodoInicio) nodoInicio.textContent = formateador.format(totals.inicio);
  if (nodoFinal)  nodoFinal.textContent  = formateador.format(totals.final);

  return totals;
}

// Actualiza todos los totales generales en DOM (activos, pasivos, capital)
function updateAllTotalsDOM() {
  const g = balance.totalsGenerales();

  const put = (sel, val) => {
    const n = document.querySelector(sel);
    if (n) n.textContent = formateador.format(val);
  };

  // Asegúrate de que en tu HTML existan estos selectores:
  put('.total_activo_anioInicio', g.activos.inicio);
  put('.total_activo_anioFinal',  g.activos.final);

  put('.total_pasivo_anioInicio', g.pasivos.inicio);
  put('.total_pasivo_anioFinal',  g.pasivos.final);

  put('.total_capital_anioInicio', g.capital.inicio);
  put('.total_capital_anioFinal',  g.capital.final);

  // opcional: total pasivo + patrimonio si quieres comparar
  const totalPyPInicio = g.pasivos.inicio + g.capital.inicio;
  const totalPyPFinal  = g.pasivos.final  + g.capital.final;
  put('.total_pasivo_patrimonio_inicio', totalPyPInicio);
  put('.total_pasivo_patrimonio_final',  totalPyPFinal);
}


// ----------------- Conexión con UI: listeners para botones -----------------

// array paralelo de tipos (indice corresponde a agregaButtons y selects)
const tipos = [
  '.activo_circulante',
  '.activo_noCirculante',
  '.pasivo_cortoPlazo',
  '.pasivo_largoPlazo',
  '.capital'
];

agregaButtons.forEach((btnSelector, idx) => {
  const btn = document.querySelector(btnSelector);
  if (!btn) {
    console.warn('Botón no encontrado:', btnSelector);
    return;
  }



  btn.addEventListener('click', () => {
    const tipo = tipos[idx];

    // obtener cuenta desde el select correspondiente
    const selectNode = document.querySelector(selects[idx]);
    const cuenta = selectNode ? (selectNode.value || selectNode.options[selectNode.selectedIndex]?.text || 'Cuenta') : 'Cuenta';

    // obtener inputs para ese tipo
    const selInputs = inputsPorTipo[tipo];
    if (!selInputs) {
      console.warn('Inputs no definidos para', tipo);
      return;
    }

    const inputInicio = document.querySelector(selInputs.inicio);
    const inputFinal  = document.querySelector(selInputs.final);

    const rawInicio = inputInicio ? inputInicio.value : '';
    const rawFinal  = inputFinal  ? inputFinal.value  : '';

    const anioInicio = parseNumberFromText(rawInicio);
    const anioFinal  = parseNumberFromText(rawFinal);

    // Crear movimiento y agregar al model
   // Crear movimiento y agregar al BALANCE GENERAL (esto siempre debe ocurrir)
const mov = new Movimiento({
  cuenta,
  anioInicio,
  anioFinal,
  tipo,
  subtipo: tipo.startsWith('.activo') ? 'activo' :
           (tipo.startsWith('.pasivo') ? 'pasivo' : 'capital')
});

balance.addMovimiento(mov);  // 🎯 SIEMPRE AGREGAR AL BALANCE

const esActivo = tipo.startsWith('.activo');

const registroFlujo = {
  cuenta: mov.cuenta,
  tipo: tipoFlujoMap[tipo],
  variacion: esActivo ? mov.variacion * -1 : mov.variacion
};

// 🚫 LISTA DE CUENTAS QUE NO VAN AL FLUJO
const cuentasExcluidas = [
  "efectivo",
  "efectivo y equivalentes",
  "equivalentes de efectivo"
];

const esExcluida = cuentasExcluidas.some(c =>
  mov.cuenta.trim().toLowerCase().includes(c)
);



// ------------- ASIGNACIÓN PARA EL FLUJO -------------------
switch (tipo) {
  case '.activo_circulante':
    if (!esExcluida) arrActivosCirculantes.push(registroFlujo);
    break;

  case '.activo_noCirculante':
    arrActivosNoCirculantes.push(registroFlujo);
    break;

  case '.pasivo_cortoPlazo':
    arrPasivoCortoPlazo.push(registroFlujo);
    break;

  case '.pasivo_largoPlazo':
    arrPasivoLargoPlazo.push(registroFlujo);
    break;

  case '.capital':
    arrCapitalFlujo.push(registroFlujo);
    break;
}

console.log("Balance actualizado con:", mov);
console.log("Flujo actualizado:", arrActivosCirculantes);


    console.table(arrActivosNoCirculantes);


    // Render en DOM
    renderRowForMovimiento(mov);

    // Actualizar totales de sección y los totales generales
    updateSectionTotalsDOM(tipo);
    updateAllTotalsDOM();

    // Limpiar inputs usados
    if (inputInicio) inputInicio.value = '';
    if (inputFinal)  inputFinal.value  = '';
  });
});

// ----------------- Inicialización opcional -----------------
// Si quieres precalcular totales existentes en HTML al cargar:
document.addEventListener('DOMContentLoaded', () => {
  // Si ya existen filas en DOM (por edición previa), podemos escanearlas y poblar el Balance
  // (esto es opcional y está comentado). Si lo quieres activo, descomenta.

  // scanExistingRowsAndPopulateBalance();
});

// Puedes añadir una función que lea filas existentes en los tbody y llene el model.
// function scanExistingRowsAndPopulateBalance() { ... } // opcional


// *****************************************************ESTADO DE RESULTADOS ***************************************************************

  let utilidadAntesImpuestosVal = 0;



document.addEventListener('DOMContentLoaded', () => {
  // Formatting helper
  function fmt(num) {
    return num.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
  }

  // State
  let gastos = [];

  // DOM refs
  const refs = {
    ventas: document.getElementById('ventas'),
    invInicial: document.getElementById('invInicial'),
    compras: document.getElementById('compras'),
    invFinal: document.getElementById('invFinal'),
    mercDisp: document.getElementById('mercDisp'),
    costoVendido: document.getElementById('costoVendido'),
    utilidadBruta: document.getElementById('utilidadBruta'),
    tablaGastos: document.getElementById('tablaGastos'),
    tipoGasto: document.getElementById('tipoGasto'),
    nombreGasto: document.getElementById('nombreGasto'),
    montoGasto: document.getElementById('montoGasto'),
    btnAgregarGasto: document.getElementById('btnAgregarGasto'),
    totalGastos: document.getElementById('totalGastos'),
    utilidadOperacion: document.getElementById('utilidadOperacion'),
    gastosFinancieros: document.getElementById('gastosFinancieros'),
    gastosNoOperacionales: document.getElementById('gastosNoOperacionales'),
    utilidadAntesImpuestoReserva: document.getElementById('utilidadAntesImpuestoReserva'),
    reservaLegalInput: document.getElementById('reservaLegalInput'),
    reserva: document.getElementById('reserva'),
    utilidadAntesImpuestos: document.getElementById('utilidadAntesImpuestos')
  };

  // Ensure all refs exist
  for (const [k, v] of Object.entries(refs)) {
    if (!v) console.warn('Missing DOM ref:', k);
  }

  function renderGastos() {
    refs.tablaGastos.innerHTML = '';
    gastos.forEach((g, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${g.nombre} (${g.tipo})</td><td>${fmt(g.monto)}</td><td><button class="btn" data-index="${i}">X</button></td>`;
      refs.tablaGastos.appendChild(tr);
    });
    // attach delete listeners
    refs.tablaGastos.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = Number(btn.getAttribute('data-index'));
        gastos.splice(idx, 1);
        renderGastos();
        calcular();
      });
    });
  }

  function agregarGasto() {
    const tipo = refs.tipoGasto.value;
    const nombre = refs.nombreGasto.value.trim();
    const monto = parseFloat(refs.montoGasto.value);
    if (!nombre || isNaN(monto)) return alert('Completa los datos del gasto');
    gastos.push({ tipo, nombre, monto });
    refs.nombreGasto.value = '';
    refs.montoGasto.value = '';
    renderGastos();
    calcular();
  }

  refs.btnAgregarGasto.addEventListener('click', agregarGasto);

  // Recalculate on relevant input changes
  [refs.ventas, refs.invInicial, refs.compras, refs.invFinal, refs.gastosFinancieros, refs.gastosNoOperacionales, refs.reservaLegalInput].forEach(el => {
    if (el) el.addEventListener('input', calcular);
  });



  function calcular() {
    const ventas = Number(refs.ventas.value) || 0;
    const invI = Number(refs.invInicial.value) || 0;
    const compras = Number(refs.compras.value) || 0;
    const invF = Number(refs.invFinal.value) || 0;

    const mercDispVal = invI + compras;
    const costoV = mercDispVal - invF;

    const totalG = gastos.reduce((acc, g) => acc + g.monto, 0);

    const utilidadBrutaVal = ventas - costoV;
    const utilidadOperacionVal = utilidadBrutaVal - totalG;

    const gastosFin = Number(refs.gastosFinancieros.value) || 0;
    const gastosNoOp = Number(refs.gastosNoOperacionales.value) || 0;

    const utilidadAntesIRVal = utilidadOperacionVal - gastosFin - gastosNoOp;

    const reservaVal = Number(refs.reservaLegalInput.value) || 0;
    utilidadAntesImpuestosVal = utilidadAntesIRVal - reservaVal;

    utilidadAntesImpuestosVal = utilidadAntesImpuestosVal;

   

    // Update DOM safely (check existence)
    if (refs.mercDisp) refs.mercDisp.innerText = fmt(mercDispVal);
    if (refs.costoVendido) refs.costoVendido.innerText = fmt(costoV);
    if (refs.utilidadBruta) refs.utilidadBruta.innerText = fmt(utilidadBrutaVal);
    if (refs.totalGastos) refs.totalGastos.innerText = fmt(totalG);
    if (refs.utilidadOperacion) refs.utilidadOperacion.innerText = fmt(utilidadOperacionVal);
    if (refs.utilidadAntesImpuestoReserva) refs.utilidadAntesImpuestoReserva.innerText = fmt(utilidadAntesIRVal);
    if (refs.reserva) refs.reserva.innerText = fmt(reservaVal);
    if (refs.utilidadAntesImpuestos) refs.utilidadAntesImpuestos.innerText = fmt(utilidadAntesImpuestosVal);
  }

  // Initial calculation
  calcular();
    
  });

  
  const utilidadEjercicio = document.querySelector('.utilidad_ejercicio_view');
  const activoCirculanteFlujoView = document.querySelector('.activos_circulantes_view');
  const pasivoCortoPlazoFlujoView = document.querySelector('.pasivos_cortoPlazo_view');
  

  const totalActivoCirculanteFlujo = document.querySelector('#suma_activo_circulante');
  const totalPsivoCortoPlazo = document.querySelector('#suma_pasivo_cortoPlazo');
  const sumaPasivoActivoCorriente = document.querySelector('#suma_activo_pasivo_corriente');

  const flujoOperacionNeto = document.querySelector('#flujo_operacion_neto'); //SUMA DE UTILIDAD, DEPRECIACION Y TOTAL DE ACTIVO_PASIVO CORRIENTE

  const activoNoCirculanteFlujoView = document.querySelector('.activo_no_circulante_view');
  const flujoInversionNeto = document.querySelector('.flujo_inversion_neto');
  
  const pasivoLargoPlazoFlujoView = document.querySelector('.pasivo_largoPlazo_view');
  const flujoFinanciamientoNeto = document.querySelector('.flujo_financiamiento_neto');

  const aumentoDisminucionNeto = document.querySelector('.aumento_disminución_neto_efectivo_ejecicio');

let flujoButton = document.querySelector('.generar_flujo_button');





flujoButton.addEventListener('click', () => {
    
    // Reset utilidad
    cuentasUtilidadEjercicio.length = 0;

    // 1) Depreciación
    let depreciacion = 0;
    arrActivosNoCirculantes.forEach((item) => {
        if (item.cuenta === "Depreciación acumulada") {
            depreciacion = Math.abs(item.variacion);
        }
    });
    cuentasUtilidadEjercicio.push(depreciacion);

    // 2) Utilidad ajustada
    cuentasUtilidadEjercicio.push(Math.abs(utilidadAntesImpuestosVal));

    mostrarCuentasUtilidad();

    // 3) Mostrar activos circulantes
    mostrarCuentasActivoCirculante();

    // 4) Mostrar pasivos corto plazo
    mostrarCuentasPasivoCorto();

    // 5) Calcular totales
    calcularTotalActivoCirculante();
    calcularTotalPasivoCortoPlazo();
    calcularSumaActivoPasivoCorriente();

    // 6) Flujo de operación neto
    calcularFlujoOperacionNeto();

    // 7) Mostrar inversión
    mostrarCuentasActivoNoCirculante();

    // 8) Mostrar financiamiento
    mostrarCuentasPasivoLargoPlazo();

    // 9) Calcular flujos netos
    calcularFlujoInversionNeto();
    calcularFlujoFinanciamientoNeto();

    // 10) Aumento o disminución neto
    calcularAumentoDisminucionNeto();

});




const cuentasUtilidadLabels = [
    'Depreciación',
    'Utilidad ajustada'
];


function mostrarCuentasUtilidad() {
  utilidadEjercicio.innerHTML = "";

  cuentasUtilidadEjercicio.forEach((item, index) => {
    const tr = document.createElement("tr");

    const tdCuenta = document.createElement('td');
    const tdVariacion = document.createElement('td');

    tdVariacion.className = "cuentaUtilidadDelEjercicio";

    tdCuenta.textContent = cuentasUtilidadLabels[index];
    tdVariacion.textContent = formateador.format(item);

    tr.appendChild(tdCuenta);
    tr.appendChild(tdVariacion);

    utilidadEjercicio.appendChild(tr);
  });
}



function mostrarCuentasActivoCirculante() {
  arrActivosCirculantes.forEach((item) => {
    if(item.cuenta != 'Depreciación acumulada'){
      const div = document.createElement("tr");
      const cuentaSlot = document.createElement('td');
      const variacion = document.createElement('td');

      variacion.className = "cuentaActivosCirculantes";

      cuentaSlot.innerText = item.cuenta;
      variacion.innerText = item.variacion;

      div.appendChild(cuentaSlot);
      div.appendChild(variacion);

      activoCirculanteFlujoView.appendChild(div);
    } else {
      console.log("looool")
    }
  })
}


function mostrarCuentasPasivoCorto() {
  pasivoCortoPlazoFlujoView.innerHTML = "";

  arrPasivoCortoPlazo.forEach((item) => {
    const tr = document.createElement("tr");
    const tdCuenta = document.createElement('td');
    const tdVariacion = document.createElement('td');

    tdVariacion.className = "cuentaPasivosCorto";

    tdCuenta.innerText = item.cuenta;
    tdVariacion.innerText = formateador.format(item.variacion);

    tr.appendChild(tdCuenta);
    tr.appendChild(tdVariacion);

    pasivoCortoPlazoFlujoView.appendChild(tr);
  });
}




function calcularTotalActivoCirculante(){
  let sumatoria = 0;

  arrActivosCirculantes.forEach((item) => {
    sumatoria += Number(item.variacion);
  });

  totalActivoCirculanteFlujo.textContent = formateador.format(sumatoria);

  return sumatoria;
}

function calcularTotalPasivoCortoPlazo(){
  let sumatoria = 0;

  arrPasivoCortoPlazo.forEach((item) => {
    sumatoria += Number(item.variacion);
  });

  totalPsivoCortoPlazo.textContent = formateador.format(sumatoria);

  return sumatoria;
}

function calcularSumaActivoPasivoCorriente(){
  const totalAC = calcularTotalActivoCirculante();
  const totalPC = calcularTotalPasivoCortoPlazo();

  const total = totalAC + totalPC;

  sumaPasivoActivoCorriente.textContent = formateador.format(total);

  return total;
}


function calcularFlujoOperacionNeto(){
  const totalUtilidad = cuentasUtilidadEjercicio.reduce((acc, val) => acc + Number(val), 0);
  const variacionesCorriente = calcularSumaActivoPasivoCorriente();

  const total = totalUtilidad + variacionesCorriente;

  flujoOperacionNeto.textContent = formateador.format(total);

  return total;
}



function mostrarCuentasActivoNoCirculante() {
  activoNoCirculanteFlujoView.innerHTML = "";

  arrActivosNoCirculantes.forEach((item) => {

    // Excluir depreciación acumulada
    if (!item.cuenta.toLowerCase().startsWith("depreciación")) {

      const tr = document.createElement("tr");
      const tdCuenta = document.createElement("td");
      const tdVariacion = document.createElement("td");

      tdVariacion.className = "cuentaActivoNoCirculante";

      tdCuenta.innerText = item.cuenta;
      tdVariacion.innerText = formateador.format(item.variacion);

      tr.appendChild(tdCuenta);
      tr.appendChild(tdVariacion);
      activoNoCirculanteFlujoView.appendChild(tr);
    }
  });
}



function calcularFlujoInversionNeto() {
  let total = 0;

  arrActivosNoCirculantes.forEach((item) => {

    // Excepción: NO sumar depreciación acumulada
    if (!item.cuenta.toLowerCase().startsWith("depreciación")) {
      total += Number(item.variacion);
    }

  });

  flujoInversionNeto.textContent = formateador.format(total);

  return total;
}


function mostrarCuentasPasivoLargoPlazo() {
  pasivoLargoPlazoFlujoView.innerHTML = "";

  arrPasivoLargoPlazo.forEach((item) => {
    const tr = document.createElement("tr");
    const tdCuenta = document.createElement("td");
    const tdVariacion = document.createElement("td");

    tdVariacion.className = "cuentaPasivoLargo";

    tdCuenta.innerText = item.cuenta;
    tdVariacion.innerText = formateador.format(item.variacion);

    tr.appendChild(tdCuenta);
    tr.appendChild(tdVariacion);

    pasivoLargoPlazoFlujoView.appendChild(tr);
  });
}


function calcularFlujoFinanciamientoNeto() {
  let total = 0;

  arrPasivoLargoPlazo.forEach((item) => {
    total += Number(item.variacion);
  });

  flujoFinanciamientoNeto.textContent = formateador.format(total);

  return total;
}


function calcularAumentoDisminucionNeto() {
  const op = calcularFlujoOperacionNeto();
  const inv = calcularFlujoInversionNeto();
  const fin = calcularFlujoFinanciamientoNeto();

  const total = op + inv + fin;

  aumentoDisminucionNeto.textContent = formateador.format(total);

  return total;
}
