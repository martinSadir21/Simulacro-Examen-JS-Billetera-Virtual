// Archivo de inicio del examen
// seleccionamos botones
const btnIngresar = document.getElementById('btnIngresar');
const modalIngresar = document.getElementById('modalIngresar');
const btnTransferir = document.getElementById('btnTransferir');
const modalTransferir = document.getElementById('modalTransferir');
const btnHistorial = document.getElementById('btnHistorial');
const modalHistorial = document.getElementById('modalHistorial');

const btnsCerrar = document.querySelectorAll('.cerrar-modal');
const confirmarIngreso = document.getElementById('confirmarIngreso');
const montoIngreso = document.getElementById('montoIngreso');
const balance = document.getElementById('balance');

const confirmarTransferencia = document.getElementById('confirmarTransferencia');
const montoTransferencia = document.getElementById('montoTransferencia');

let cotizaciones = {};
const currencySelector = document.getElementById('currencySelector');

// localStorage
let saldoActual = parseFloat(localStorage.getItem("saldoActual")) || parseFloat(balance.innerHTML); // devuelve primer valor igual a verdadero
balance.innerHTML = saldoActual.toFixed(2);

// Acceder primera vez al localStorage para obtener saldo guardado
let historial = JSON.parse(localStorage.getItem("historial")) || [];

const transactionContainer = document.getElementById('transactionContainer');

console.log(historial);

const btnResetBilletera = document.getElementById('btnResetBilletera');
btnResetBilletera.addEventListener('click', () => {
    historial = [];
    localStorage.setItem("historial", JSON.stringify(historial));
    modalHistorial.classList.add('hidden');
})

fetch("http://localhost:3000/api/cotizaciones")
  .then(response => response.json())
  .then(data => {
    cotizaciones = data;
    Object.keys(cotizaciones).forEach(moneda => {
    currencySelector.innerHTML += 
     `<option value="${moneda}">${moneda}($)</option>`;
     })
  }).catch(error => {
    console.log(error);
  });

currencySelector.addEventListener('change', async (e) => {
    const monedaSeleccionada = e.target.value;
    balance.innerHTML = (saldoActual * cotizaciones[monedaSeleccionada]).toFixed(2);
})


// dar funcionalidades 

btnIngresar.addEventListener('click', () => {
  modalIngresar.classList.toggle('hidden');
})
btnTransferir.addEventListener('click', () => {
    modalTransferir.classList.toggle('hidden');
});
btnHistorial.addEventListener('click', () => {
    modalHistorial.classList.toggle('hidden');
});

btnsCerrar.forEach(btn => {
  btn.addEventListener('click', () => {
    modalIngresar.classList.add('hidden');
    modalTransferir.classList.add('hidden');
    modalHistorial.classList.add('hidden');
  })
})

confirmarIngreso.addEventListener('click', (e) => {
    e.preventDefault();
  let montoIngresado = parseFloat(montoIngreso.value);
  saldoActual = parseFloat(balance.textContent);
  montoTransferencia.value= "";
  if (isNaN(montoIngresado) || montoIngresado <= 0) {
    alert('El monto ingresado no es válido');
    return;
  }
  saldoActual += montoIngresado
  localStorage.setItem("saldoActual", saldoActual);
  balance.textContent = saldoActual.toFixed(2);
  modalIngresar.classList.add('hidden');
  //alert('se han ingresado ' + montoIngresado + 'ARS');
  registrarEnHistorial(montoIngresado, "Ingreso", new Date().toLocaleString());
})

confirmarTransferencia.addEventListener('click', (e) => {
    e.preventDefault();
  let montoTransferido = parseFloat(montoTransferencia.value);
   saldoActual = parseFloat(balance.textContent);
   montoTransferencia.value = "";
  if (isNaN(montoTransferido) || montoTransferido <= 0) {
    alert('El monto ingresado no es válido');
    return;
  }
  if (montoTransferido > saldoActual) {
    alert('No tienes suficiente saldo para realizar la transferencia');
    return;
  }
  saldoActual -= montoTransferido
  localStorage.setItem("saldoActual", saldoActual);
  balance.textContent = saldoActual.toFixed(2);
  modalTransferir.classList.add('hidden');
  //alert('se han transferido ' + montoTransferido + 'ARS');
  registrarEnHistorial(montoTransferido, "Transferencia", new Date().toLocaleString());
})

function registrarEnHistorial(monto, tipo, fecha) {
   const transaction = {
    monto,
    tipo,
    fecha
  }
  historial.push(transaction);
  localStorage.setItem("historial", JSON.stringify(historial));
  transactionContainer.innerHTML = "";
  historial.forEach(transaccion => {
    tra
  })
}

