<template>
  <user-profile/>
</template>

<script>
import UserProfile from './components/UserProfile.vue'

export default {
  name: 'App',
  components: {
    UserProfile
  }
}
</script>

<style lang="scss">
  h1,h2,h3,h4,p {
    margin: 0;
    font-weight: inherit;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  body {
    margin: 0 auto;
    min-width: 360px;
    max-width: 720px;
    background-color: #E5E5E5;
  }
  #app {
    font-family:  Arial, Avenir, Helvetica, sans-serif;
    font-weight: 400;
    color: #333333;
    scroll-behavior: smooth;
  }
</style>
