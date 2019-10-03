<script>
  import he from 'he'
  import st from 'striptags'

  export default {
    methods: {
      prettyText(text) {
        let pretty = ''
        if (text) {
          pretty = he.decode(text)
          pretty = st(pretty)
        }
        return pretty
      }
    }
  }
</script>