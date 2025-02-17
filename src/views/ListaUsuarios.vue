<template>
  <h1>Lista Usuarios</h1>

  <router-link :to="{name:'CrearUsuario'}">
    <button>Crear Usuario</button>
  </router-link>
 
  <table>
   <thead>
     <th>ID</th>
     <th>NOMBRE</th>
     <th>CORREO</th>
     <th>GÉNERO</th>
     <th>ESTADO</th>
     <th>ACCIONES</th>
   </thead>
   <tbody>
     <tr v-for="usuario in listaUsuarios" :key="usuario.id">
       <td>{{ usuario.id }}</td>
       <td>{{ usuario.name }}</td>
       <td>{{ usuario.email }}</td>
       <td>{{ usuario.gender }}</td>
       <td>{{ usuario.status }}</td>
       <td>
         <router-link :to="{name: 'VerUsuario', params:{id: usuario.id}}">
           <button>Ver</button>
         </router-link>
 
         <router-link :to="{name: 'EditarUsuario', params:{id: usuario.id}}">
           <button>Editar</button>
         </router-link>
 
         <button @click="eliminarUsuario(usuario.id)">Eliminar</button>
       </td>
     </tr>
   </tbody>
  </table>
 
 
 </template>
 
 <script setup>
 
 
 import { ref, onMounted } from 'vue';
 import axios from 'axios';
 
 const listaUsuarios = ref([]);
 
 const error = ref(null);
 
 const obtenerListaUsuarios = async () => {
   try {
     const response = await axios.get('https://api-usuarios-js.onrender.com/users');
     listaUsuarios.value = response.data;
   } catch (err) {
     error.value = 'Error al cargar los usuarios';
   }
 };
 
 
 const eliminarUsuario = async (id) =>{
 
   try {
     await axios.delete(`https://api-usuarios-js.onrender.com/users/${id}`);
     obtenerListaUsuarios();
   } catch (err) {
     error.value = 'Error al cargar los usuarios';
  }
 
 
 }
 
 
 
 onMounted(obtenerListaUsuarios);
 
 </script>