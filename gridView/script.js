const app = Vue.createApp({
  data(){
    return {
      search:"",
      gridHeaders:["name", "age", "height"],
      gridRecords:[
        {name: "Ken", age: 20, height: 175},
        {name: "Leo", age: 19, height: 178},
        {name: "John", age: 21, height: 172},
        {name: "Kevin", age: 20, height: 180}
      ]
    }
  }
})

app.component("demo-grid", {
  props:{ // 参数以对象形式列出
    headers: Array, // 列名
    records: Array, // 记录
    filterKey: String // 过滤关键词
  },
  template:"#grid-template", // 匹配x-template模板

  data(){
    // 默认各列按照升序排列
    let ascOrders = {}
    this.headers.forEach(key => {
      ascOrders[key] = true
    })
    return {
      sortKey:"", // 当前应用排序的列
      ascOrders
    }
  },

  computed:{
    // 依赖变量变化时调用
    sortAndFilterRecords(){
      let filterKey = this.filterKey
      let sortedRecords = this.records
      if (filterKey){
        filterKey = filterKey.toLowerCase() // 不区分大小写
        sortedRecords = sortedRecords.filter((row)=>{ // 迭代每行记录
          return Object.keys(row).some((key)=>{ // 迭代每行记录的每个列，只要有一个列符合就返回true
            return String(row[key])
                  .toLowerCase()  // 不区分大小写
                  .indexOf(filterKey) > -1 // 查找子字符串
          })
        })
      }
      if (this.sortKey){
        sortedRecords = sortedRecords.sort((a, b)=>{
          a = a[this.sortKey]
          b = b[this.sortKey]
          return (a === b ? 0 : (a > b ? 1 : -1)) * (this.ascOrders[this.sortKey] ? 1 : -1)
        })
      }
      return sortedRecords
    }
  },

  methods:{
    capitalize(word){
      return word.charAt(0).toUpperCase() + word.slice(1)
    },
    setSortKey(key){ // 更改当前应用排序的列
      this.sortKey = key
    },
    changeOrder(key){ // 切换某列的升序/降序
      this.ascOrders[key] = !this.ascOrders[key]
    }
  }
})

app.mount("#demo")


