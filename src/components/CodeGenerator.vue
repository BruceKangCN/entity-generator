<template>
  <!-- 文件名 -->
  <h3><code>{{ pascal }}.java</code></h3>
  <!-- 代码块，需将每一行都拆分为<pre>，否则会有多余缩进 -->
  <!-- &#10;为<LF>换行符，需添加到下一行的行首，否则不显示 -->
  <!-- 表名、字段名均为自动生成，若要手动指定，需在代码中添加@Table、@Column注解 -->
  <div class="code-block">
    <pre v-highlightjs><code class="java">package {{ basePackage }}.entity;</code></pre>
    <!-- 空行，换行符见下一行 -->
    <pre v-highlightjs><code class="java">&#10;import lombok.AllArgsConstructor;</code></pre>
    <pre v-highlightjs><code class="java">import lombok.Data;</code></pre>
    <pre v-highlightjs><code class="java">import lombok.NoArgsConstructor;</code></pre>
    <pre v-highlightjs><code class="java" v-if="entity.id.type === 'UUID'">import org.hibernate.annotations.GenericGenerator;</code></pre>
    <!-- 空行，换行符见下一行 -->
    <pre v-highlightjs><code class="java">&#10;import javax.persistence.*;</code></pre>
    <pre v-highlightjs><code class="java">import java.io.Serializable;</code></pre>
    <pre v-highlightjs><code class="java" v-if="entity.id.type === 'UUID'">import java.util.UUID;</code></pre>
    <!-- 空行，换行符见下一行 -->
    <pre v-highlightjs><code class="java">&#10;@Entity</code></pre>
    <pre v-highlightjs><code class="java">@Data</code></pre>
    <pre v-highlightjs><code class="java">@AllArgsConstructor</code></pre>
    <pre v-highlightjs><code class="java">@NoArgsConstructor</code></pre>
    <pre v-highlightjs><code class="java">public class {{ pascal }} implements Serializable {</code></pre>
    <pre v-highlightjs><code class="java">    @Id</code></pre>
    <pre v-highlightjs><code class="java" v-if="entity.id.type !== 'UUID'">    @GeneratedValue(strategy = GenerationType.AUTO)</code></pre>
    <pre v-highlightjs><code class="java" v-if="entity.id.type === 'UUID'">    @GeneratedValue(generator = “UUID”)</code></pre>
    <pre v-highlightjs><code class="java" v-if="entity.id.type === 'UUID'">    @GenericGenerator(</code></pre>
    <pre v-highlightjs><code class="java" v-if="entity.id.type === 'UUID'">        name = “UUID”,</code></pre>
    <pre v-highlightjs><code class="java" v-if="entity.id.type === 'UUID'">        strategy = “org.hibernate.id.UUIDGenerator”</code></pre>
    <pre v-highlightjs><code class="java" v-if="entity.id.type === 'UUID'">    )</code></pre>
    <pre v-highlightjs><code class="java">    private {{ entity.id.type }} {{ entity.id.name }};</code></pre>
    <pre v-highlightjs><code class="java" v-for="field in entity.fields" :key="field">&#10;    private {{ field.type }} {{ field.name }};</code></pre>
    <pre v-highlightjs><code class="java last-line">}&#10;</code></pre>
    <!-- 空行，换行符见上一行 -->
  </div>
  <h3><code>{{ pascal }}Repository.java</code></h3>
  <!-- 注意将代码中的<>转义 -->
  <div class="code-block">
    <pre v-highlightjs><code class="java">package {{ basePackage }}.repo;</code></pre>
    <!-- 空行，换行符见下一行 -->
    <pre v-highlightjs><code class="java">&#10;import {{ basePackage }}.entity.{{ pascal }};</code></pre>
    <pre v-highlightjs><code class="java">import org.springframework.data.jpa.repository.JpaRepository;</code></pre>
    <pre v-highlightjs><code class="java">import org.springframework.stereotype.Repository;</code></pre>
    <!-- 空行，换行符见下一行 -->
    <pre v-highlightjs><code class="java" v-if="entity.id.type === 'UUID'">&#10;import java.util.UUID;</code></pre>
    <!-- 空行，换行符见下一行 -->
    <pre v-highlightjs><code class="java">&#10;@Repository</code></pre>
    <pre v-highlightjs><code class="java">public interface {{ pascal }}Repository extends JpaRepository&lt;{{ pascal }}, {{ entity.id.type }}&gt; {</code></pre>
    <pre v-highlightjs><code class="java last-line">}&#10;</code></pre>
    <!-- 空行，换行符见上一行 -->
  </div>
</template>

<script>
export default {
  name: 'EntinyGenerator',
  props: {
    basePackage: String,
    pascal: String,
    entity: Object,
  },
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
