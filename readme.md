# 💳 Examen: Billetera Virtual Fintech con JavaScript

## 📋 Objetivo del Examen

En este examen práctico deberás desarrollar una **aplicación web interactiva de billetera virtual estilo fintech**, conectando una interfaz frontend desarrollada con **HTML, CSS y JavaScript Vanilla** a un **servidor backend local en Node.js/Express**.

La aplicación debe permitir:

1. Consultar cotizaciones de monedas (ARS, USD, EUR, BRL, USDT) y contactos frecuentes desde el backend local.
2. Renderizar el saldo disponible en pantalla y calcular su conversión equivalente según la divisa seleccionada.
3. Permitir ingresar dinero, realizar transferencias con validaciones (montos positivos, saldo suficiente y destinatario no vacío) y actualizar el saldo reactivamente.
4. Persistir el saldo y el historial de movimientos en el navegador mediante `localStorage`.
5. Visualizar los movimientos y permitir el reinicio de la cuenta.

---

## 📌 Tabla de Entregas / Issues de GitHub

Cada entrega se corresponde con un **issue automático** en tu repositorio de GitHub. Para cerrar cada issue automáticamente, incluye el commit sugerido exacto al subir tu solución a la rama principal (`main`).

| Entrega | Tarea a Realizar                                                                                            | Commit Sugerido                                                            |
| :------ | :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| **#1**  | Vincular `css/styles.css` y `js/script.js` en `index.html`.                                                 | `feat(html): vincular css y script js al html`                             |
| **#2**  | Consumir la API local (`/api/cotizaciones` y `/api/contactos`) usando `fetch` y `async/await`.              | `feat(js): consumir api de cotizaciones con fetch y async await`           |
| **#3**  | Renderizar dinámicamente las divisas, el saldo formateado y el listado de transacciones en el DOM.          | `feat(js): renderizar saldo conversion y movimientos en el dom`            |
| **#4**  | Implementar apertura/cierre de modales, ingresos, transferencias y validación de saldo.                     | `feat(js): implementar ingresos transferencias y validacion de saldos`     |
| **#5**  | Persistir saldo y transacciones en `localStorage`, y permitir reiniciar la cuenta con `#btnResetBilletera`. | `feat(js): persistir y gestionar movimientos de billetera en localstorage` |

---

## 🛠️ Especificación Técnica y Requerimientos

### 1. Servidor Backend Local

El servidor Express provisto corre en el puerto `3000` con CORS habilitado:

- **`GET http://localhost:3000/api/cotizaciones`**: Devuelve las tasas de conversión relativas a ARS.
- **`GET http://localhost:3000/api/contactos`**: Devuelve la lista de contactos frecuentes.
- **`POST http://localhost:3000/api/transferir`**: Simula y valida transferencias `{ monto, destinatario, saldoActual }`.

Para iniciar el servidor backend:

```bash
npm start
```

### 2. Elementos Clave del DOM

- **`#balance`**: Encabezado donde se muestra el saldo disponible en ARS formateado (ej. `$ 15,000.00`).
- **`#currencySelector`**: `<select>` para elegir la moneda en la cual visualizar la conversión.
- **`#balanceConvertido`**: Párrafo donde se muestra el monto equivalente convertido.
- **`#btnIngresar`**, **`#btnTransferir`**, **`#btnHistorial`**: Botones para abrir los modales correspondientes.
- **`#transactionContainer`**: Contenedor donde se insertan las tarjetas de transacciones (`.transaction-item`).
- **`#modalIngresar`**, **`#formIngreso`**, **`#montoIngreso`**, **`#confirmarIngreso`**: Componentes para acreditar saldo.
- **`#modalTransferir`**, **`#formTransferencia`**, **`#destinatario`**, **`#montoTransferencia`**, **`#confirmarTransferencia`**: Componentes para enviar dinero.
- **`#modalHistorial`**, **`#btnResetBilletera`**: Modal para gestionar y reiniciar la cuenta.

### 3. Almacenamiento Local (`localStorage`)

- **Claves obligatorias**: `'billetera_saldo'` y `'billetera_movimientos'`
- **Estructura de movimientos**: Arreglo de objetos con `{ tipo: 'Ingreso'|'Transferencia', detalle, monto, fecha }`.
- Utilizar `JSON.stringify()` para guardar y `JSON.parse()` para leer.

---

## 🧪 Comandos de Prueba y Autoevaluación

Antes de entregar, podés autoevaluar tu trabajo localmente:

```bash
# Ejecutar todas las pruebas automáticas
npm test

# Ejecutar una prueba individual
npm run test:link
npm run test:fetch
npm run test:render
npm run test:events
npm run test:storage

# Validar estilo y calidad de código
npm run lint
npm run format:check
```

---

## 🚀 Instrucciones para la Ejecución Local

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar el servidor local:
   ```bash
   npm start
   ```
3. Abrir `index.html` en el navegador (usando la extensión **Live Server** de VS Code).
4. Abrir la consola de herramientas de desarrollador (**F12**) para verificar peticiones de red y depurar posibles errores.
