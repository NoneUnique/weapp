// pages/movieList2/movieList2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviesTags: ["热门", "最新", "豆瓣高分", "冷门佳片", "华语", "欧美", "韩国", "日本"],
    moviesMore:[],
    page_start: -12,
    page_limit: 12,
    tag: '',
  },

  /**
* 加载电影
*/
  loadMovie: function (tag) {
    var that = this;
    wx.request({
      url: 'https://movie.douban.com/j/search_subjects?type=movie&tag=' + tag,
      header: {
        'Content-Type': "json"
      },
      data:{
        page_limit: that.data.page_limit,
        page_start: that.data.page_start += 12
      },
      success: function (res) {
        var subjects = that.data.moviesMore.concat(res.data.subjects)
        console.log('sydh',subjects)
        that.setData({ moviesMore: subjects,tag:tag, hidden: true });
      }
    })
  },


  /**标签点击**/
  btn: function (e) {
    console.log(e._relatedInfo.anchorRelatedText)
    var tags = e._relatedInfo.anchorRelatedText
    var that = this
    that.loadMovie(tags)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var moviesTags = this.data.moviesTags
    that.loadMovie(moviesTags[0])
    wx.setNavigationBarTitle({
      title: options.navName,
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
    this.loadMovie(this.data.tag)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})