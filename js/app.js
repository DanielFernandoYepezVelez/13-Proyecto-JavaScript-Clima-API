const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();

    /* Validar */
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        mostrarError('Ambos Campos Son Obligatorios');
    }


    /* Consultariamos La API */
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
    const validateAlertDOM = document.querySelector('bg-red-100');

    if (!validateAlertDOM) {
        /* Crear Alerta Con Tailwind */
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
      <strong class="font-bold">Error!</strong>
      <span class="block">${mensaje}</span>
    `;

        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 2000);
    }
}

function consultarAPI(ciudad, pais) {
    const appId = '0cc4b4d3d810784b46df924421221330';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    spinner();

    fetch(url)
        .then(data => data.json())
        .then(resp => {
            limpiarHTML();

            if (resp.cod === "404") {
                mostrarError('Ciudad No Encontrada');
                return;
            }

            mostrarClienteHTML(resp);
        });
}

function mostrarClienteHTML(datos) {
    const { name, main: { temp, temp_max, temp_min } } = datos;

    const centigrados = kelvinAcentigrados(temp);
    const max = kelvinAcentigrados(temp_max);
    const min = kelvinAcentigrados(temp_min);

    nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    /* Temperatura Actual */
    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    /* Temperatura Maxima */
    const temp_maxima = document.createElement('p');
    temp_maxima.innerHTML = `Max: ${max} &#8451;`;
    temp_maxima.classList.add('text-xl');

    /* Temperatura Minima */
    const temp_minima = document.createElement('p');
    temp_minima.innerHTML = `Min: ${min} &#8451;`;
    temp_minima.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');

    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(temp_maxima);
    resultadoDiv.appendChild(temp_minima);

    resultado.appendChild(resultadoDiv);
}

const kelvinAcentigrados = grados => parseInt(grados - 273.15);

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner() {

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
      <div class="sk-circle1 sk-circle"></div>
      <div class="sk-circle2 sk-circle"></div>
      <div class="sk-circle3 sk-circle"></div>
      <div class="sk-circle4 sk-circle"></div>
      <div class="sk-circle5 sk-circle"></div>
      <div class="sk-circle6 sk-circle"></div>
      <div class="sk-circle7 sk-circle"></div>
      <div class="sk-circle8 sk-circle"></div>
      <div class="sk-circle9 sk-circle"></div>
      <div class="sk-circle10 sk-circle"></div>
      <div class="sk-circle11 sk-circle"></div>
      <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}