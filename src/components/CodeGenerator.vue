<template>
  <!-- 下载源文件按钮 -->
  <h2>Download</h2>
  <input type="button" value="entity" @click="download(0)" />
  <input type="button" value="repository" @click="download(1)" />
  <h2>Source code</h2>
  <!-- 实体类 -->
  <h3><code>{{ pascal }}.java</code></h3>
  <!-- TODO 添加外键字段 -->
  <!-- 代码块，需将每一行都拆分为<pre>，否则会有多余缩进 -->
  <!-- &#10;为<LF>换行符，需添加到下一行的行首，否则不显示 -->
  <!-- 表名、字段名均为自动生成，若要手动指定，需在代码中添加@Table、@Column注解 -->
  <div class="code-block">
    <pre v-highlightjs><code class="java">package {{ basePackage }}.entity;</code></pre>
    <!-- 空行，换行符见下一行 -->
    <pre v-highlightjs><code class="java">&#10;import lombok.AllArgsConstructor;</code></pre>
    <pre v-highlightjs><code class="java">import lombok.Data;</code></pre>
    <pre v-highlightjs><code class="java">import lombok.NoArgsConstructor;</code></pre>
    <pre v-highlightjs><code class="java" v-if="entityId.type === 'UUID'">import org.hibernate.annotations.GenericGenerator;</code></pre>
    <!-- 空行，换行符见下一行 -->
    <pre v-highlightjs><code class="java">&#10;import javax.persistence.*;</code></pre>
    <pre v-highlightjs><code class="java">import java.io.Serializable;</code></pre>
    <pre v-highlightjs><code class="java" v-if="entityId.type === 'UUID'">import java.util.UUID;</code></pre>
    <!-- 空行，换行符见下一行 -->
    <pre v-highlightjs><code class="java">&#10;@Entity</code></pre>
    <pre v-highlightjs><code class="java">@Data</code></pre>
    <pre v-highlightjs><code class="java">@AllArgsConstructor</code></pre>
    <pre v-highlightjs><code class="java">@NoArgsConstructor</code></pre>
    <pre v-highlightjs><code class="java">public class {{ pascal }} implements Serializable {</code></pre>
    <pre v-highlightjs><code class="java">    @Id</code></pre>
    <pre v-highlightjs><code class="java" v-if="entityId.type !== 'UUID'">    @GeneratedValue(strategy = GenerationType.AUTO)</code></pre>
    <pre v-highlightjs><code class="java" v-if="entityId.type === 'UUID'">    @GeneratedValue(generator = “UUID”)</code></pre>
    <pre v-highlightjs><code class="java" v-if="entityId.type === 'UUID'">    @GenericGenerator(</code></pre>
    <pre v-highlightjs><code class="java" v-if="entityId.type === 'UUID'">        name = “UUID”,</code></pre>
    <pre v-highlightjs><code class="java" v-if="entityId.type === 'UUID'">        strategy = “org.hibernate.id.UUIDGenerator”</code></pre>
    <pre v-highlightjs><code class="java" v-if="entityId.type === 'UUID'">    )</code></pre>
    <pre v-highlightjs><code class="java">    private {{ entityId.type }} {{ entityId.name }};</code></pre>
    <pre v-highlightjs><code class="java" v-for="field in fields" :key="field">&#10;    private {{ field.type.javaType }} {{ toCamelCase(field.name) }};</code></pre>
    <pre v-highlightjs><code class="java last-line">}&#10;</code></pre>
    <!-- 空行，换行符见上一行 -->
  </div>
  <!-- 仓库接口 -->
  <h3><code>{{ pascal }}Repository.java</code></h3>
  <!-- 注意将代码中的<>转义 -->
  <div class="code-block">
    <pre v-highlightjs><code class="java">package {{ basePackage }}.repo;</code></pre>
    <!-- 空行，换行符见下一行 -->
    <pre v-highlightjs><code class="java">&#10;import {{ basePackage }}.entity.{{ pascal }};</code></pre>
    <pre v-highlightjs><code class="java">import org.springframework.data.jpa.repository.JpaRepository;</code></pre>
    <pre v-highlightjs><code class="java">import org.springframework.stereotype.Repository;</code></pre>
    <!-- 空行，换行符见下一行 -->
    <pre v-highlightjs><code class="java" v-if="entityId.type === 'UUID'">&#10;import java.util.UUID;</code></pre>
    <!-- 空行，换行符见下一行 -->
    <pre v-highlightjs><code class="java">&#10;@Repository</code></pre>
    <pre v-highlightjs><code class="java">public interface {{ pascal }}Repository extends JpaRepository&lt;{{ pascal }}, {{ entityId.type }}&gt; {</code></pre>
    <pre v-highlightjs><code class="java last-line">}&#10;</code></pre>
    <!-- 空行，换行符见上一行 -->
  </div>
</template>

<script>
import { pascalCase, camelCase } from 'change-case' // 命名法转换框架

export default {
  name: 'EntinyGenerator',
  // TODO 添加外键字段
  props: {
    basePackage: String,
    symbol: String,
    entityId: Object,
    fields: Array,
  },
  computed: {
    // 将symbol转换为PascalCase，用于类名
    pascal() {
      return pascalCase(this.symbol)
    },
    // 将symbol转换为camelCase，用于变量名
    camel() {
      return camelCase(this.symbol)
    },
    // 将symbol转换为snake_case，用于表名
    snake() {
      return camelCase(this.symbol)
    },
  },
  methods: {
    // 将字符串转换为PascalCase
    toPascalCase (str) {
      return pascalCase(str)
    },
    // 将字符串转换为camelCase
    toCamelCase (str) {
      return camelCase(str)
    },
    // 下载源代码文件功能，通过index指定要下载的文件
    download(index) {
      // 新建<a>元素
      const el = document.createElement('a')
      // 设置文件名
      switch (index) {
      case 0:
        el.download = this.pascal + '.java'
        break
      case 1:
        el.download = this.pascal + 'Repository.java'
        break
      default:
        return
      }
      // 获取代码块列表
      const files = document.querySelectorAll('div.code-block')
      // 获取指定索引代码块中的源代码文本
      const src = files[index].innerText
      // 将数据类型设置为纯文本，编码为base64，内容为上一步获取到的源代码文本
      // 使用btoa(src)将源代码文本编码为base64格式，
      // 可以保留编码格式、换行符格式、末尾换行符
      el.href = 'data:text/plain;base64,' + btoa(src)
      // 触发<a>的点击事件
      el.click()
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 代码块样式 */
.code-block {
  background-color: #0d1117;
  width: 80ch;
  max-height: 30ch;
  overflow: auto;
}
/* 为代码块最后一行显示换行符 */
.last-line::after {
  content: '\a';
}
/* HTML5代码块样式 */
pre {
  margin: 0px;
  font-family: 'Cascadia Mono PL', monospace;
}
</style>
