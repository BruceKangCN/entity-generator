<template>
  <!-- 实体类元数据div -->
  <div>
    <h2>Class Metadata</h2>
    <label for="">Name:</label>
    <input type="text" v-model="symbol" @input="updateCases" />
    <br/>
    <label for="">Package:</label>
    <input type="text" v-model="basePackage" />
    <br/>
  </div>
  <!-- 实体类主键div -->
  <div>
    <h2>ID Field</h2>
    <label for="">Type:</label>
    <select v-model="entityId.type">
      <option
        v-for="item in idDict"
        :key="item.id"
        :value="item.javaType"
      >
        {{ item.dbType }}
      </option>
    </select>
    <label for="">Name:</label>
    <input type="text" v-model="entityId.name" />
    <br/>
  </div>
  <!-- 添加字段div -->
  <div>
    <h2>New field</h2>
    <!-- 过滤器div -->
    <div id="filter">
      <h3>Filter</h3>
      <label for="name">name</label>
      <input type="text" v-model="filter.name" />
      <br/>
      <label for="db-type">type</label>
      <input type="text" list="type-list" v-model="filter.type" />
      <datalist id="type-list">
        <option value="any">any</option>
        <option value="int">int</option>
        <option value="bigint">bigint</option>
        <option value="decimal">decimal</option>
        <option value="varchar">varchar</option>
        <option value="datetime">datetime</option>
        <option value="timestamp">timestamp</option>
      </datalist>
      <br/>
      <label for="length">length</label>
      <input type="number" v-model="filter.lengthMin" />
      <input type="number" v-model="filter.lengthMax" />
      <br/>
      <label for="precision">precision</label>
      <input type="number" v-model="filter.precisionMin" />
      <input type="number" v-model="filter.precisionMax" />
      <br/>
      <input type="button" value="filter" @click="execFilter" />
    </div>
    <label for="type">Type:</label>
    <select v-model="newField.type">
      <option
        v-for="item in filteredFieldDict"
        :key="item.id"
        :value="item"
      >
        {{ item.name }}
      </option>
    </select>
    <label for="name">Name:</label>
    <input type="text" v-model="newField.name" />
    <input type="button" value="Add field" @click="addField" />
    <br/>
  </div>
  <!-- 添加外键div -->
  <div>
    <h2>Add foreign keys</h2>
    <label for="type">Type:</label>
    <select v-model="newForeignKey.type">
      <option value="ManyToOne">Many To One</option>
      <option value="ManyToMany">Many To Many</option>
      <option value="OneToOne">One To One</option>
      <option value="OneToMany">One To Many</option>
    </select>
    <label for="table">Table:</label>
    <select v-model="newForeignKey.table">
      <option
        v-for="(table, index) in tables"
        :key="index"
        :value="table"
      >
        {{table.tableName}}
      </option>
    </select>
    <input type="button" value="Add foreign key" @click="addForeignKey" />
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
  <!-- 展示外键div -->
  <div>
    <h2>Foreign keys</h2>
    <p class="field" v-for="(key, index) in foreignKeys" :key="index">
      <label for="type">Type:</label>
      <input type="text" :value="key.type" readonly />
      <label for="table">Table:</label>
      <input type="text" :value="key.table.tableName" readonly />
      <input type="button" value="-" @click="removeForeignKey(index)" />
    </p>
  </div>
  <!-- 实体类生成器 -->
  <code-generator
    :basePackage="basePackage"
    :symbol="symbol"
    :entityId="entityId"
    :fields="fields"
    :foreignKeys="foreignKeys"
  />
</template>

<script>
import CodeGenerator from './components/CodeGenerator.vue' // 代码生成器组件

export default {
  name: 'App',
  components: {
    CodeGenerator, // 代码生成器
  },
  data() {
    return {
      symbol: 'table name',
      basePackage: '',
      newField: { type: '', name: '' },
      newForeignKey: { type: 'ManyToOne', table: {} },
      fields: [],
      foreignKeys: [],
      entityId: {
          type: 'Integer',
          name: 'id',
      },
      // 过滤器相关数据
      filter: {
        name: '',
        type: '',
        lengthMin: 0,
        lengthMax: 0,
        precisionMin: 0,
        precisionMax: 0,
      },
      // 主键类型字典，生产环境时从后端获取
      idDict: [
        { id: 0, dbType: 'int', javaType: 'Integer' },
        { id: 1, dbType: 'bigint', javaType: 'Long' },
        { id: 2, dbType: 'UUID', javaType: 'UUID' },
      ],
      // 字段类型字典，生产环境时从后端获取
      fieldDict: [
        { id: 0, name: 'count', dbType: 'bigint', length: 10, precision: null, javaType: 'Long' },
        { id: 1, name: 'price', dbType: 'decimal', length: 15, precision: 2 , javaType: 'Double' },
        { id: 2, name: 'name', dbType: 'varchar', length: 100, precision: null, javaType: 'String' },
      ],
      // 过滤后的字段类型字典，初始值应与fieldDict相同
      filteredFieldDict: [
        { id: 0, name: 'count', dbType: 'bigint', length: 10, precision: null, javaType: 'Long' },
        { id: 1, name: 'price', dbType: 'decimal', length: 15, precision: 2 , javaType: 'Double' },
        { id: 2, name: 'name', dbType: 'varchar', length: 100, precision: null, javaType: 'String' },
      ],
      // 表名列表，用于添加外键，生产环境时从后端获取
      tables: [
        { tableName: 'user', entity: 'User'},
        { tableName: 'city', entity: 'City' },
        { tableName: 'personal_business', entity: 'PersonalBusiness' },
      ],
    }
  },
  methods: {
    // 通过向fields数组添加元素，新增字段
    addField() {
      // 空字段检测
      if (this.newField.type === '' || this.newField.name === '') {
        return
      }
      // 获取新字段
      const field = this.newField
      // 将字段对应信息存入对应数组
      this.fields.push(field)
      // 更新字段后，将新增字段输入框重置
      this.newField = {type: '', name: ''}
    },
    // 通过index删除对应的字段
    removeField(index) {
      // 将对应index的数组元素移除
      this.fields.splice(index, 1)
    },
    // 新增外键
    addForeignKey() {
      if (this.newForeignKey.type === '' || this.newForeignKey.table === '') {
        return
      }
      const foreignKey = this.newForeignKey
      this.foreignKeys.push(foreignKey)
      this.newForeignKey = { type: 'ManyToOne', table: {} }
    },
    // 通过index删除对应的外键
    removeForeignKey(index) {
      this.foreignKeys.splice(index, 1)
    },
    // 过滤器
    execFilter() {
      // 创建字段存储临时数组
      let filtered = []

      // 遍历所有字段，找出符合条件的，存入临时数组
      for (let i = 0; i < this.fieldDict.length; i++) {
        let field = this.fieldDict[i]
        if ( this.filterName(field.name)
          && this.filterType(field.dbType)
          && this.filterLengthMin(field.length)
          && this.filterLengthMax(field.length)
          && this.filterPrecisionMin(field.precision)
          && this.filterPrecisionMax(field.precision)
        ) {
          filtered.push(field)
        }
      }

      // 返回过滤出的字段数组
      this.filteredFieldDict = filtered
    },
    filterName(name) {
      return name.includes(this.filter.name)
    },
    filterType(type) {
      return this.filter.type === 'any' || this.filter.type === '' || this.filter.type === type
    },
    // '' == 0 === true
    // '' >= 0 === true
    // null >= 0 === true
    // null <= 0 === true
    // null <= `some positive number` === true
    // 将最大值设为0时，跳过检查
    filterLengthMin(length) {
      return length >= this.filter.lengthMin
    },
    filterLengthMax(length) {
      return this.filter.lengthMax == 0 || length <= this.filter.lengthMax
    },
    filterPrecisionMin(length) {
      return length >= this.filter.precisionMin
    },
    filterPrecisionMax(length) {
      return this.filter.precisionMax == 0 || length <= this.filter.precisionMax
    },
  },
  // 生产环境时，在应用创建时从后端获取字典、表名
  // setup() {
  //   // 相关代码
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
/* 过滤器样式 */
#filter {
  background-color: #d3d3d3;
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
