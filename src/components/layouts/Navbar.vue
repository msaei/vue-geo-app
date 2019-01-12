<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link :to="{name:'GMap'}" class="brand-logo left">GeoChat</router-link>
        <ul class="right">
          <li>
            <router-link :to="{ name: 'Signup'}" v-if="!user">Signup</router-link>
          </li>
          <li>
            <router-link :to="{name: 'Login'}" v-if="!user">Login</router-link>
          </li>
          <li>
            <a @click="logout" v-if="user">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {
      user: null
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  }
};
</script>

<style>
</style>



