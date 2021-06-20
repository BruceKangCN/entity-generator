<template>
  <label for="">Name:</label><input type="text" v-model="symbol" @input="updateCases" /><br/>
  <label for="">Package:</label><input type="text" v-model="basePackage" />.entity<br/>
  <label for="">ID type:</label><input type="text" v-model="entity.idType" /><br/>
  <label for="type">Type:</label><input type="text" v-model="newField.type" />
  <label for="name">Name:</label><input type="text" v-model="newField.name" />
  <input type="button" value="Add field" @click="addField" /><br/>
  <div v-for="(field, index) in entity.fields" :key="index">
    <label for="type">Type:</label><input type="text" v-model="field.type" readonly />
    <label for="name">Name:</label><input type="text" v-model="field.name" readonly />
    <input type="button" value="-" @click="removeField(index)" />
  </div>
  <code-generator :basePackage="basePackage" :snake="snakeCase" :pascal="pascalCase" :entity="entity" />
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
      symbol: "table name",
      basePackage: "",
      snakeCase: "table_name",
      pascalCase: "TableName",
      newField: {type: '', name: ''},
      entity: {
        idType: "Integer",
        fields: [],
      },
    }
  },
  methods: {
    updateCases() {
      this.snakeCase = snakeCase(this.symbol)
      this.pascalCase = pascalCase(this.symbol)
    },
    addField() {
      this.entity.fields.push({type: this.newField.type, name: this.newField.name})
      this.newField = {type: '', name: ''}
    },
    removeField(index) {
      this.entity.fields.splice(index, 1)
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
}
label {
  display: inline-block;
  width: 100px;
}
</style>
