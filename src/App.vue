<template>
  <!-- 实体类元数据div -->
  <div>
    <h2>Class Metadata</h2>
    <label for="">Name:</label>
    <input type="text" v-model="symbol" @input="updateCases" /><br/>
    <label for="">Package:</label>
    <input type="text" v-model="basePackage" />.entity<br/>
  </div>
  <!-- 实体类主键div -->
  <div>
    <h2>ID Field</h2>
    <label for="">Type:</label>
    <select type="text" v-model="entity.id.type">
      <option
        v-for="item in idDict"
        :key="item.id"
        :value="item.javaType"
      >
        {{ item.dbType }}
      </option>
    </select>
    <label for="">Name:</label>
    <input type="text" v-model="entity.id.name" />
    <br/>
  </div>
  <!-- 添加字段div -->
  <div>
    <h2>New field</h2>
    <!-- TODO 添加过滤器 -->
    <label for="type">Type:</label>
    <select type="text" v-model="newField.type">
      <option
        v-for="item in fieldDict"
        :key="item.id"
        :value="item"
        v-show="true"
      >
        {{ item.name }}
      </option>
    </select>
    <label for="name">Name:</label>
    <input type="text" v-model="newField.name" />
    <input type="button" value="Add field" @click="addField" />
    <br/>
  </div>
  <!-- 展示字段div -->
  <div>
    <h2>Fields</h2>
    <p class="field" v-for="(field, index) in fields" :key="index">
      <label for="type">Type:</label>
      <input type="text" :value="field.type.name" readonly />
      <label for="name">Name:</label>
      <input type="text" :value="field.name" readonly />
      <input type="button" value="-" @click="removeField(index)" />
    </p>
  </div>
  <h2>Source code</h2>
  <!-- 实体类生成器 -->
  <entity-generator
    :basePackage="basePackage"
    :snake="snakeCase"
    :pascal="pascalCase"
    :entity="entity"
  />
  <!-- 下载源文件按钮 -->
  <input type="button" value="download" @click="download" />
</template>

<script>
import EntityGenerator from './components/EntityGenerator.vue' // 代码生成器组件
import { snakeCase, pascalCase, camelCase } from 'change-case' // 命名法转换框架

export default {
  name: 'App',
  components: {
    EntityGenerator, // 代码生成器
  },
  data() {
    return {
      symbol: "table name",
      basePackage: "",
      newField: {type: '', name: ''},
      fields: [],
      entity: {
        id: {
          type: "Integer",
          name: "id",
        },
        fields: [],
      },
      // 主键类型字典，生产环境时从后端获取
      idDict: [
        { id: 0, dbType: "int", javaType: "Integer" },
        { id: 1, dbType: "bigint", javaType: "Long" },
        { id: 2, dbType: "UUID", javaType: "UUID" },
      ],
      // 字段类型字典，生产环境时从后端获取
      fieldDict: [
        { id: 0, name: 'count', dbType: "bigint", length: 10, precision: null, javaType: "Long" },
        { id: 1, name: 'price', dbType: "decimal", length: 15, precision: 2 , javaType: "Double" },
        { id: 2, name: 'name', dbType: "varchar", length: 100, precision: null, javaType: "String" },
      ],
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
      // 空字段检测
      if (this.newField.type === '' || this.newField.name === '') {
        return
      }
      // 获取新字段
      const field = { type: this.newField.type, name: this.newField.name }
      // 将字段对应信息存入对应数组
      this.fields.push(field)
      this.entity.fields.push({type: field.type.javaType, name: camelCase(field.name)})
      // 更新字段后，将新增字段输入框重置
      this.newField = {type: '', name: ''}
    },
    // 通过index删除对应的字段
    removeField(index) {
      // 将对应index的数组元素移除
      this.fields.splice(index, 1)
      this.entity.fields.splice(index, 1)
    },
    // 下载源代码文件功能
    download() {
      // 新建<a>元素
      const el = document.createElement('a')
      // 获取pre#entity-java中的源代码文本
      const src = document.querySelector('#entity-java').innerText
      // 将数据类型设置为纯文本，编码为base64，内容为上一步获取到的源代码文本
      // 使用btoa(src)将源代码文本编码为base64格式，
      // 可以保留编码格式、换行符格式、末尾换行符
      el.href = 'data:text/plain;base64,' + btoa(src)
      // 设置下载文件名为`${this.pascalCae}.java`
      el.download = this.pascalCase + '.java'
      // 触发<a>的点击事件
      el.click()
    },
  },
  // 生产环境时，在应用创建时从后端获取字典
  // setup() {
  //   // 获取字典相关代码
  // },
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
/* 将各种输入组件长度固定，便于对齐元素 */
select,
input[type=text] {
  width: 150px;
}
/* 将用于展示字段的<p>的margin设置为0px */
p.field {
  margin: 0px;
}
</style>
