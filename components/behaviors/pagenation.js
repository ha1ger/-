const pagenationBev = Behavior({
  data:{
    books:[],
    total:0
  },
  methods:{
    setMoreData(books){
      const newBooks = this.data.books.concat(books)
      this.setData({
        books:newBooks
      })
    },
    getCurrentStart(){
      return this.data.books.length
    },
    setTotal(total){
      this.data.total = total
    },
    hasMore(){
      if (this.data.books.length < this.data.total) {
        return true
      }
      else{
        return false
      }
      
    }
  }
})
export { pagenationBev }