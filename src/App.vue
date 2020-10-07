<template>
  <div>
    <p>My File Selector: <file-select v-model="file"></file-select></p>
    <p v-if="file">{{file.name}}</p>
  </div>
</template>

<script>
import FileSelect from './components/FileSelect.vue'

export default {
  components: {
    FileSelect
  },

  data() {
    return {
      file: null
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
