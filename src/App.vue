<template>
    <router-view class="app"></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body, #app {
  height: 100%;
  /* margin-top: 0px;
  margin-bottom: 0px; */
  margin: 0%
}
#app {
  font-family: 'PingFang SC', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.error-page-background-img {
    height: 360px;
    max-width: 30%;
    float: right;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
    width: 62.5%;
    padding-right: 152px;
    margin-top: 12%;
    margin-right: 10%;
}

.error-page-content {
    float: left;
    width: 300px;
    margin-top: 15%;
    margin-left: 10%;
    max-width: 30%;
}

.error-page-desc {
    color: rgba(0, 0, 0, 0.45);
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 16px;
}
</style>
