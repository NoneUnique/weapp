// pages/questionnaire/questionnaire.js
Page({
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log('textarea', e.detail.value.textarea)
  },
})