Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: [{}, {}],
    tags: ["正在上映", "即将上映"],
    moviesTags: ["热门", "最新", "豆瓣高分", "冷门佳片", "华语", "欧美", "韩国", "日本"],
    tagsUrl: ['in_theaters', 'coming_soon'],
    copy: '',
  },
  /****/
  copy: function(e){
    var that = this;
    console.log(e);
    wx.setClipboardData({
      data: that.data.copy,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
        wx.getClipboardData({
          success: function(res){
            console.log(res)
          }
        })
        console.log(that.data.copy)
      }
    });
  },
  /****/
  sortOfMovies: function (tagsUrl, cb) {
    wx.request({
      url: tagsUrl,
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
        cb(res)
      }
    });
  },
  /**标签点击**/
  btn: function (e) {
    console.log(e._relatedInfo.anchorRelatedText)
    var tags = e._relatedInfo.anchorRelatedText
    var that = this
    wx.request({
      url: 'https://movie.douban.com/j/search_subjects?type=movie&tag=' + tags + '&page_limit=10',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        var subjects = res.data.subjects
        console.log('id', subjects.id)
        that.setData({
          moviesMore: subjects,
          tags: tags,
          hidden: true
        });
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //'https://douban.uieee.com/v2/movie/top250?start=1&count=10',
    // url: 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0',
    var tags = this.data.tags
    var moviesTags = this.data.moviesTags
    var tagsUrl = this.data.tagsUrl
    var that = this
    for (let i in tagsUrl, tags) {
      var url = 'https://douban.uieee.com/v2/movie/' + tagsUrl[i] + '&start=1&count=10'
      this.sortOfMovies(url, function (res) {
        var data = res.data
        that.data.movieList[i] = {
          title: tags[i],
          datas: data.subjects,
          types: tagsUrl[i]
        }
        that.setData({
          movies: that.data.movieList
        })
      })
    }
    /**热门电影**/
    wx.request({
      url: 'https://movie.douban.com/j/search_subjects?type=movie&tag=热门&page_limit=10',
      header: {
        'Content-Type': "json"
      },
      success: function (res) {
        var subjects = res.data.subjects
        that.setData({
          moviesMore: subjects,
          tags: moviesTags[0],
          hidden: true
        });
        console.log('listmsjvfg', subjects)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})