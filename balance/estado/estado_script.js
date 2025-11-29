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
    const utilidadAntesImpuestosVal = utilidadAntesIRVal - reservaVal;

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