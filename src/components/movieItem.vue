<template>
  <div class="movieItem" @click="intoMovieDetail">
    <img class="movieImg" :src="item.images.large" alt="加载中...">
    <p class="score">{{item.rating.average}}</p>
    <p class="movieName">{{item.title}}</p>
    <p class="year">年份:{{item.year}}</p>
    <p class="director">导演:{{item.directors[0].name}}</p>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {
      item: {}
    }
  },
  beforeMount () {
    console.log(this.item.images.large)
    let that = this
    wx.request({
      url: this.item.images.large,
      success (res) {
        if (res.statusCode === 404) {
          console.log('===404')
          that.item.images.large = '/static/images/detail/list/j1.jpg'
        }
      },
      fail () {
        console.log('error')
      }
    })
  },
  methods: {
    intoMovieDetail () {
      wx.navigateTo({
        url: '/pages/movieDetail/main?item=' + JSON.stringify(this.item),
        success: () => {
          console.log('pass')
        },
        fail: (error) => {
          console.log(error)
        }
      })
    }
  }
}
</script>

<style>
.movieItem{
  border-bottom: 1rpx solid #eee;
  padding: 20rpx 10rpx
}
.movieImg{
  width: 120rpx;
  height: 120rpx;
  float: left;
  margin-right: 20rpx
}
.movieName, .year, .director{
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis
}
.movieName{
  font-size: 32rpx;
  color: #000;
}
.director{
  font-size: 30rpx;
  color: #666
}
.year{
  font-size: 28rpx;
  color: #999;
  margin: 5rpx 0
}
.score{
  font-weight: bold;
  color: red;
  float: right;
  margin: 0 10rpx
}
</style>