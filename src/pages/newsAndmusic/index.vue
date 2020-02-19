<template>
  <div class="nmContainner">
    <swiper indicator-dots="true" indicator-color="#fff" indicator-active-color="#999"
        autoplay="true" interval="3000" duration="500">
        <block>
          <swiper-item>
            <img src="/static/images/detail/carousel/01.jpg" alt="">
          </swiper-item>
        </block>
        <block>
          <swiper-item>
            <img src="/static/images/detail/carousel/02.jpg" alt="">
          </swiper-item>
        </block>
        <block>
          <swiper-item>
            <img src="/static/images/detail/carousel/03.jpg" alt="">
          </swiper-item>
        </block>
      </swiper>
      <div class="newsContainner" v-for="(item, index) in listData" :key="index" @click="intoDetail(index)">
        <p class="userInfo">
          <img class="avatar" :src="item.avatar" alt="">
          <span class="uName">{{item.author}}</span>
          <span class="date">{{item.date}}</span>
        </p>
        <p class="title">{{item.title}}</p>
        <img class="largeImg" :src="item.headImgSrc" alt="">
        <p class="newsContent">{{item.detail_content}}</p>
      <p class="newsInfo">
        <img :src="item.detail_love_image1" alt="">
        <span>{{item.love_count}}</span>
        <img :src="item.detail_love_image2" alt="">
        <span>{{item.attention_count}}</span>
      </p>
      <div class="line"></div>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  beforeMount () {
    this.$store.dispatch('getListData')
  },
  computed: {
    ...mapState(['listData'])
  },
  methods: {
    intoDetail (index) {
      // console.log(index)
      wx.navigateTo({
        url: '/pages/detail/main?index=' + index,
        // url: '/pages/detail/main',
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
*{
  margin: 0;
  padding: 0
}
.userInfo{
  padding: 40rpx 0 10rpx 0
}
.avatar{
  width: 60rpx;
  height: 60rpx;
  vertical-align: middle;
}
.uName{
  margin: 0 20rpx;
  font-size: 28rpx;
  color: #333
}
.date{
  font-size: 32rpx
}
.title{
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx
}
.largeImg{
  width: 100%;
  height: 400rpx;
}
.newsContent{
  font-size: 32rpx;
  letter-spacing: 4rpx;
  line-height: 50rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  text-align:justify
}
.newsInfo{
  padding: 20rpx 5%
}
.newsInfo img{
  width: 36rpx;
  height: 36rpx;
  vertical-align: middle;
  margin-right: 10rpx
}
.newsInfo span{
  font-size: 24rpx;
  margin-right: 20rpx
}
.line{
  width: 90%;
  border: 1rpx solid #999;
  margin-left: 5%
}
</style>
