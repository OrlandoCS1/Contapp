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
    return this.anioInicio - this.anioFinal;
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
    const mov = new Movimiento({
      cuenta,
      anioInicio,
      anioFinal,
      tipo,
      subtipo: tipo.startsWith('.activo') ? 'activo' : (tipo.startsWith('.pasivo') ? 'pasivo' : 'capital')
    });

    balance.addMovimiento(mov);

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
