const app = Vue.createApp({
  data() {
    return {
      input: '# Heading1'
    }
  },
  computed: {
    compiledMarkdown() {
      // 当input变量发生变化时，进行渲染
      return marked(this.input, { sanitize: true });
    }
  },
  methods: {
    // 每隔一段时间从文本框中更新内容到input变量
    update: _.debounce(function(e) {
      this.input = e.target.value;
    }, 1000)
    // update(e){
    //   this.input = e.target.value;
    // }
  }
})

app.mount('#editor')