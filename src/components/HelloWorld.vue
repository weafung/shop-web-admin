<template>
  <div class="hello">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <router-link to="/login">Login</router-link>

      </li>
      <li>
        <router-link to="/admin">Admin</router-link>
        <router-view></router-view>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name: "HelloWorld",
    data() {
        return {
            msg: "Welcome to Your Vue.js App"
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
.hello {
    text-align: center;
}
</style>
