// pages/moviesList/moviesList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: -10,
    count: 10,
    tag:'',
    hasMore: true,
    movies: []
  },
  /**
   * 加载电影
   */
  loadMovie: function(tag) {
    var that = this;
    var page_start = 0;
    // that.setData({
    //   hasMore: 
    // })
    // var  urls = 'https://douban.uieee.com/v2/movie/' + tag
    if (!this.data.hasMore) {
      console.log('load more finish')
      return
    }
    wx.request({
      // url: 'https://movie.douban.com/j/search_subjects?type=movie&tag=' + tag + '&page_limit=10',
      url: 'https://douban.uieee.com/v2/movie/' + tag,
      data: {
        //start=1&count=10
        start: that.data.start += 10,
        count: that.data.count
      },
      header: {
        'Content-Type': "json"
      },
      success: function(res) {
        var subjects = that.data.movies.concat(res.data.subjects)
        that.setData({
          movies: subjects,
          tag: tag,
          hidden: true
        });
        console.log('listmsjvfg', subjects)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadMovie(options.tag);
    wx.setNavigationBarTitle({
      title: options.navName,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showLoading({
      title: '玩命加载中',
    })
    this.loadMovie(this.data.tag);
    wx.hideLoading()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})