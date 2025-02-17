<template>

    <div class="contenedor">
        <h2>Formulario de Registro</h2>

        <form ref="formulario" @submit.prevent="enviarFormulario" novalidate>
            <!-- Campo Nombre -->
            <div>
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" v-model="nuevoUsuario.name" pattern=".{3,}" required
                    @blur="validarCampo" title="Debe tener al menos 3 caracteres" />
                <!-- Muestra el mensaje de error si el campo no es válido -->
                <p v-if="errores.nombre" class="error">{{ errores.nombre }}</p>
            </div>

            <!-- Campo Correo -->
            <div>
                <label for="correo">Correo Electrónico:</label>
                <input type="email" id="correo" name="correo" v-model="nuevoUsuario.email" required @blur="validarCampo"
                    title="Debe ser un correo válido" />
                <p v-if="errores.correo" class="error">{{ errores.correo }}</p>
            </div>

            <!-- Campo genero -->
            <div>
                <label for="genero">genero (male o female):</label>
                <select id="genero" name="genero" v-model="nuevoUsuario.gender" required @blur="validarCampo"
                    title="Selecciona una">

                    <option value="male">male</option>
                    <option value="female">female</option>

                </select>

                <p v-if="errores.genero" class="error">{{ errores.genero }}</p>
            </div>

            <!-- Campo estado -->
            <div>
                <label for="estado">estado (active o inactive):</label>
                <select id="estado" name="estado" v-model="nuevoUsuario.status" required @blur="validarCampo"
                    title="Selecciona una">

                    <option value="active">active</option>
                    <option value="inactive">inactive</option>

                </select>

                <p v-if="errores.estado" class="error">{{ errores.estado }}</p>
            </div>

            <!-- Botón para enviar el formulario -->
            <button type="submit">Enviar</button>
        </form>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';



const route = useRoute()
const id = route.params.id;

const obtenerUsuario = async () => {
    try {
        const response = await axios.get(`https://api-usuarios-js.onrender.com/users/${id}`);
        nuevoUsuario.value = response.data;
    } catch (err) {
        error.value = 'Error al cargar los usuarios';
    }
};


onMounted(obtenerUsuario)


//////////////////////////

const router = useRouter()

const error = ref(null);
const nuevoUsuario = ref({ name: '', email: '', gender: '', status: '' });

const editarUsuario = async () => {

    try {
        await axios.put(`https://api-usuarios-js.onrender.com/users/${id}`, nuevoUsuario.value)
        router.push('/');
    } catch (err) {
        error.value = 'Error al cargar los usuarios';
    }
};



// Referencia al formulario en el DOM
const formulario = ref(null);


// Objeto de errores para almacenar los mensajes de validación por cada campo
const errores = ref({
    nombre: '',
    correo: '',
    genero: '',
    estado: ''
});

// Lista de estadoes permitidas para la validación de la estado
const generoValido = ['male', 'female'];
const estadoValido = ['active', 'inactive'];

// Función que valida cada campo cuando pierde el foco (evento @blur)
const validarCampo = (evento) => {
    const campo = evento.target; // Obtiene el campo que disparó el evento
    const nombreCampo = campo.name; // Obtiene el nombre del campo

    // Validación personalizada para la estado
    if (nombreCampo === 'estado') {
        if (!estadoValido.includes(nuevoUsuario.value.status)) {
            errores.value.estado = 'Debe seleccionar una.';
        } else {
            errores.value.estado = ''; // Limpia el error si el valor es correcto
        }
        return; // Sale de la función porque ya validó la estado
    }

    if (nombreCampo === 'genero') {
        if (!generoValido.includes(nuevoUsuario.value.gender)) {
            errores.value.genero = 'Debe seleccionar una.';
        } else {
            errores.value.genero = ''; // Limpia el error si el valor es correcto
        }
        return; // Sale de la función porque ya validó la estado
    }

    // Validación general para otros campos usando checkValidity()
    if (!campo.checkValidity()) {
        errores.value[nombreCampo] = campo.validationMessage; // Guarda el mensaje de error predeterminado
    } else {
        errores.value[nombreCampo] = ''; // Si es válido, borra el error
    }
};

// Función que se ejecuta cuando se intenta enviar el formulario
const enviarFormulario = () => {
    const esValido = formulario.value.checkValidity(); // Comprueba si todo el formulario es válido

    // Validar estado antes de enviar
    if (!estadoValido.includes(nuevoUsuario.value.status)) {
        errores.value.estado = 'Debe seleccionar un Estado.';
    }

    if (!generoValido.includes(nuevoUsuario.value.gender)) {
        errores.value.genero = 'Debe seleccionar un Genero.';
    }

    // Si todo es válido, se muestra un mensaje de éxito
    if (esValido && !errores.value.estado && !errores.value.genero) {
        editarUsuario(nuevoUsuario)
        alert('Formulario enviado con éxito ✅');
        console.log({ nombre: nombre.value, correo: correo.value, genero: genero.value, estado: estado.value });

        // Resetea los valores del formulario y borra los errores
        formulario.value.reset();
        errores.value = { nombre: '', correo: '', genero: '', estado: '' };
    } else {
        // Si hay errores, se validan nuevamente todos los campos
        for (const campo of formulario.value.elements) {
            if (campo.name) {
                validarCampo({ target: campo });
            }
        }
    }
};

</script>