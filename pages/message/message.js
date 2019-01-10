Page({
  data: {
    isFold: '',
    isFoldClick: '',
    searchName: '',
    list: [],
    types: '',
    start: 0,
    count: 10,
  },
  bindKeyInput: function(e) {
    var that = this;
    var arr = [];
    // var searchName = that.data.searchName;
    that.setData({
        searchName: e.detail.value
      }),
      wx.request({
        url: 'https://movie.douban.com/j/subject_suggest?q=' + that.data.searchName,
        header: {
          'Content-Type': "json"
        },
        success: (res) => {
          for (var index in res.data) {
            console.log('types', res.data[index].type)
            if (res.data[index].type == 'movie') {
              arr.push(res.data[index])
            }
          }
          that.setData({
            list: arr,
            isFold: 'show',
            isFoldClick: 'hideList'
          });
          console.log(that.data.list)
        }
      })
  },
  btnClick: function(e) {
    var that = this;
    var arr = [];
    var searchName = that.data.searchName
    that.setData({
      searchName: that.data.searchName
    })
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/search?q=' + searchName ,
      data:{
        start: this.data.start,
        count: this.data.count
      },
      header: {
        'Content-Type': "json"
      },
      success: (res) => {
        that.setData({
          list: res.data.subjects,
          isFoldClick: 'show',
          isFold: 'hideList'
        });
        console.log(that.data.list)
      }
    })
  },
})