<template>
  <!-- 实体类元数据div -->
  <div>
    <label for="">Name:</label><input type="text" v-model="symbol" @input="updateCases" /><br/>
    <label for="">Package:</label><input type="text" v-model="basePackage" />.entity<br/>
    <label for="">ID type:</label><input type="text" v-model="entity.idType" /><br/>
  </div>
  <!-- 添加字段div -->
  <div>
    <label for="type">Type:</label><input type="text" v-model="newField.type" />
    <label for="name">Name:</label><input type="text" v-model="newField.name" />
    <input type="button" value="Add field" @click="addField" /><br/>
  </div>
  <!-- 展示字段div -->
  <div>
    <p class="field" v-for="(field, index) in entity.fields" :key="index">
      <label for="type">Type:</label><input type="text" v-model="field.type" readonly />
      <label for="name">Name:</label><input type="text" v-model="field.name" readonly />
      <input type="button" value="-" @click="removeField(index)" />
    </p>
  </div>
  <!-- 代码生成器 -->
  <code-generator :basePackage="basePackage" :snake="snakeCase" :pascal="pascalCase" :entity="entity" />
  <!-- 下载源文件按钮 -->
  <input type="button" value="download" @click="download" />
</template>

<script>
import CodeGenerator from './components/CodeGenerator.vue' // 代码生成器组件
import { snakeCase, pascalCase } from 'change-case' // 命名法转换框架

export default {
  name: 'App',
  components: {
    CodeGenerator, // 代码生成器
  },
  data() {
    return {
      symbol: "table name",
      basePackage: "",
      newField: {type: '', name: ''},
      entity: {
        idType: "Integer",
        fields: [],
      },
    }
  },
  computed: {
    // 将symbol转换为snake_case，用于表名
    snakeCase() {
      return snakeCase(this.symbol)
    },
    // 将symbol转换为PascalCase，用于类名
    pascalCase() {
      return pascalCase(this.symbol)
    },
  },
  methods: {
    // 当输入的symbol变化时，自动更新其他命名法对应的文本
    updateCases() {
      this.snakeCase = snakeCase(this.symbol)
      this.pascalCase = pascalCase(this.symbol)
    },
    // 通过向entity.fields数组添加元素，新增字段
    addField() {
      this.entity.fields.push({type: this.newField.type, name: this.newField.name})
      // 更新字段后，将新增字段输入框重置
      this.newField = {type: '', name: ''}
    },
    // 通过index删除对应的字段
    removeField(index) {
      // 将对应index的数组元素移除
      this.entity.fields.splice(index, 1)
    },
    // 下载源代码文件功能
    download() {
      // 新建<a>元素
      let el = document.createElement('a')
      // 获取pre#entity-java中的源代码文本
      const src = document.querySelector('#entity-java').innerText
      // 将数据类型设置为纯文本，编码UTF-8，内容为上一步获取到的源代码文本
      el.setAttribute('href', 'data:text/plain;charset=utf8,' + src)
      // 设置下载文件名为`${this.pascalCae}.java`
      el.setAttribute('download', this.pascalCase + '.java')
      // 触发<a>的点击事件
      el.click()
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
/* 将标签长度固定，便于对齐元素 */
label {
  display: inline-block;
  width: 100px;
}
/* 将用于展示字段的<p>的margin设置为0px */
p.field {
  margin: 0px;
}
</style>
