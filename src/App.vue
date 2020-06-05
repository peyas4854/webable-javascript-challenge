<template>
  <div id>
    <div id="nav">
      <router-link to="/">HOME</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
