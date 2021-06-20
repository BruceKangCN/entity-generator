<template>
  <input type="text" id="symbol" v-model="symbol" @input="updateCases">
  <code-generator msg="Welcome to Your Vue.js App" :snake="snakeCase" :pascal="pascalCase" />
</template>

<script>
import CodeGenerator from './components/CodeGenerator.vue'
import { snakeCase, pascalCase } from "change-case"

export default {
  name: 'App',
  components: {
    CodeGenerator,
  },
  data() {
    return {
      symbol: "table_name",
      snakeCase: "table_name",
      pascalCase: "TableName",
    }
  },
  methods: {
    updateCases() {
      this.snakeCase = snakeCase(this.symbol)
      this.pascalCase = pascalCase(this.symbol)
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
