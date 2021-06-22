<template>
  <!-- 文件名 -->
  <h2><code>{{ pascal }}.java</code></h2>
<!-- 标签前不添加缩进，否则代码块内容会出现多余缩进 -->
<pre v-highlightjs id="entity-java">
<code class="java">package {{ basePackage }}.entity;</code>
<code class="java"></code>
<code class="java">import lombok.AllArgsConstructor;</code>
<code class="java">import lombok.Data;</code>
<code class="java">import lombok.NoArgsConstructor;</code>
<code class="java"></code>
<code class="java">import javax.persistence.*;</code>
<code class="java">import java.io.Serializable;</code>
<code class="java"></code>
<code class="java">@Entity</code>
<code class="java">@Table(name = "{{ snake }}")</code>
<code class="java">@Data</code>
<code class="java">@AllArgsConstructor</code>
<code class="java">@NoArgsConstructor</code>
<code class="java">public class {{ pascal }} implements Serializable {</code>
<code class="java">    @Id</code>
<code class="java">    @GeneratedValue</code>
<code class="java">    private {{ entity.idType }} id;</code>
<code class="java" v-for="field in entity.fields" :key="field"><br/>    private {{ field.type }} {{ field.name }};</code>
<code class="java">}</code>
</pre>
</template>

<script>
export default {
  name: 'EntinyGenerator',
  props: {
    basePackage: String,
    snake: String,
    pascal: String,
    entity: Object,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
pre {
  background-color: #0d1117;
  width: 80ch;
  font-family: 'Cascadia Mono PL', monospace;
  max-height: 30ch;
  overflow: auto;
}
</style>
