<template>
  <div class="hello">
    <h2><code>{{ pascal }}.java</code></h2>
<pre v-highlightjs>
<code class="java">@Table(name = "{{ snake }}")</code>
<code class="java">public class {{ pascal }} {</code>
<code class="java"></code>
<code class="java">}</code>
<code class="java"></code>
</pre>
  </div>
</template>

<script>
export default {
  name: 'CodeGenerator',
  props: {
    snake: String,
    pascal: String,
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
