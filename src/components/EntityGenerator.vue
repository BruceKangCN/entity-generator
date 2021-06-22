<template>
  <!-- 文件名 -->
  <h3><code>{{ pascal }}.java</code></h3>
  <!-- &#10;为<LF>换行符，需添加到下一行的行首，否则不显示 -->
  <div id="entity-java">
    <pre v-highlightjs><code class="java">package {{ basePackage }}.entity;</code></pre>
    <pre v-highlightjs><code class="java">&#10;import lombok.AllArgsConstructor;</code></pre>
    <pre v-highlightjs><code class="java">import lombok.Data;</code></pre>
    <pre v-highlightjs><code class="java">import lombok.NoArgsConstructor;</code></pre>
    <pre v-highlightjs><code class="java">&#10;import javax.persistence.*;</code></pre>
    <pre v-highlightjs><code class="java">import java.io.Serializable;</code></pre>
    <pre v-highlightjs><code class="java" v-if="entity.id.type === 'UUID'">import java.util.UUID;</code></pre>
    <pre v-highlightjs><code class="java">&#10;@Entity</code></pre>
    <pre v-highlightjs><code class="java">@Table(name = "{{ snake }}")</code></pre>
    <pre v-highlightjs><code class="java">@Data</code></pre>
    <pre v-highlightjs><code class="java">@AllArgsConstructor</code></pre>
    <pre v-highlightjs><code class="java">@NoArgsConstructor</code></pre>
    <pre v-highlightjs><code class="java">public class {{ pascal }} implements Serializable {</code></pre>
    <pre v-highlightjs><code class="java">    @Id</code></pre>
    <pre v-highlightjs><code class="java">    @GeneratedValue</code></pre>
    <pre v-highlightjs><code class="java">    private {{ entity.id.type }} {{ entity.id.name }};</code></pre>
    <pre v-highlightjs><code class="java" v-for="field in entity.fields" :key="field"><br/>    private {{ field.type }} {{ field.name }};</code></pre>
    <pre v-highlightjs><code class="java">}&#10;</code></pre>
  </div>
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
#entity-java {
  background-color: #0d1117;
  width: 80ch;
  max-height: 30ch;
  overflow: auto;
}
pre {
  margin: 0px;
  font-family: 'Cascadia Mono PL', monospace;
}
</style>
