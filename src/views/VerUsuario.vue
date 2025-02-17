<template>
  <div>
    <h2>ID: {{ usuario.id }}</h2>
    <b>
      <p>Nombre: {{ usuario.name }}</p>
    </b>
    <b>
      <p>Correo: {{ usuario.email }}</p>
    </b>
    <b>
      <p>Genero: {{ usuario.gender }}</p>
    </b>
    <b>
      <p>Estado: {{ usuario.status }}</p>
    </b>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute()
const id = route.params.id;

const usuario = ref({})
const error = ref(null);

const obtenerUsuario = async () => {
  try {
    const response = await axios.get(`https://api-usuarios-js.onrender.com/users/${id}`);
    usuario.value = response.data;
  } catch (err) {
    error.value = 'Error al cargar los usuarios';
  }
};


onMounted(obtenerUsuario)
</script>
