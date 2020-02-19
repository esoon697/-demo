<template>
  <div class="detailContainer">
    <div class="largeImgConyainer">
    <img :src="detailData.detail_img" alt="">
    <img class="playBtn" :src="isPlay?'/static/images/music/music-stop.png':'/static/images/music/music-start.png'" @click="changePlay">
    </div>
    <p class="userInfo">
      <img class="avatar" :src="detailData.avatar" alt="">
      <span class="uName">{{detailData.detail}}</span>
      <span> 发布于 </span>
      <span class="date">{{detailData.date}}</span>
    </p>
    <p class="detailTitle">{{detailData.title}}</p>
    <div class="csContainer">
      <div class="line"></div>
      <img class="share" :src="isShare?'/static/images/icon/share.png':'/static/images/icon/share-anti.png'" @click="changeShare">
      <img class="collect" :src="isCollect?'/static/images/icon/collection.png':'/static/images/icon/collection-anti.png'" @click="changeCollect">
    </div>
    <button class="shareBtn" open-type="share">转发文章</button>
    <p class="detailContent">{{detailData.detail_content}}</p>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      detailData: {},
      isCollect: false,
      isShare: false,
      isPlay: false
    }
  },
  computed: {
    ...mapState(['listData'])
  },
  beforeMount () {
    let index = this.$mp.query.index
    this.index = index
    this.detailData = this.listData[index]
    // 进入页面查看缓存中的isCollect数据
    let hasCollect = wx.getStorageSync('isCollect' + index)
    if (hasCollect) {
      this.isCollect = hasCollect
    } else {
      wx.setStorageSync('isCollect' + index, false)
      this.isCollect = hasCollect
    }
    // 进入页面查看缓存中的isShare数据
    let hasShare = wx.getStorageSync('isShare' + index)
    if (hasShare) {
      this.isShare = hasShare
    } else {
      wx.setStorageSync('isShare' + this.index, false)
      this.isShare = hasShare
    }
    // 右上角分享
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  // 微信监听用户点击页面内转发按钮
  // onShareAppMessage: function (res) {
  //   let index = this.$mp.query.index
  //   if (res.from === 'button') {
  //     // 来自页面内转发按钮
  //     console.log(res.target)
  //   }
  //   return {
  //     title: '自定义转发标题',
  //     path: '/pages/detail/main?index=' + index
  //   }
  // }
  onShow () {
    console.log('show')
  },
  onHide () {
    console.log('hide')
  },
  // 退出页面后，重置播放状态并停止背景音频
  onUnload () {
    console.log('unload')
    let backgroundAudioManager = wx.getBackgroundAudioManager()
    this.isPlay = false
    backgroundAudioManager.stop()
  },
  methods: {
    changeCollect () {
      let isCollect = !this.isCollect
      this.isCollect = isCollect
      wx.setStorageSync('isCollect' + this.index, isCollect)
      if (this.isCollect) {
        wx.showToast({
          title: '已收藏',
          icon: 'success',
          duration: 2000
        })
      }
    },
    changeShare () {
      if (!this.isShare) {
        let isShare = !this.isShare
        this.isShare = isShare
        wx.showActionSheet({
          itemList: ['分享到朋友圈', '分享到微博', '分享到QQ', '分享到微信'],
          success (res) {
            switch (res.tapIndex) {
              case 0:
                console.log('分享到朋友圈')
                break
              case 1:
                console.log('分享到微博')
                break
              case 2:
                console.log('分享到QQ')
                break
              case 3:
                console.log('分享到微信')
                break
            }
          },
          fail (res) {
            console.log(res.errMsg)
          }
        })
      }
      wx.setStorageSync('isShare' + this.index, this.isShare)
    },
    changePlay () {
      let isPlay = !this.isPlay
      this.isPlay = isPlay
      let musicObj = this.detailData.music
      let backgroundAudioManager = wx.getBackgroundAudioManager()
      backgroundAudioManager.title = musicObj.title
      backgroundAudioManager.epname = musicObj.title
      backgroundAudioManager.coverImgUrl = musicObj.coverImgUrl
      // 设置了 src 之后会自动播放
      backgroundAudioManager.src = musicObj.dataUrl
      // 监听背景音频播放和暂停事件，并回调函数
      backgroundAudioManager.onPlay(() => {
        this.isPlay = true
      })
      backgroundAudioManager.onPause(() => {
        this.isPlay = false
      })
      // 监听播放暂停按钮并调用对应的背景音频的播放暂停方法
      if (isPlay) {
        backgroundAudioManager.play()
      } else {
        backgroundAudioManager.pause()
      }
    }
  }
}
</script>

<style>
.detailContainer{
  display: flex;
  flex-direction: column
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
.detailTitle{
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx
}
.csContainer{
  position: relative;
  padding: 0 5%
}
.line{
  width: 90%;
  border: 1rpx solid #eee;
  /* margin-left: 5% */
  position: absolute;
  top: 40rpx;
  z-index: -1
}
.collect, .share{
  float: right;
  width: 80rpx;
  height: 80rpx;
}
.collect{
  margin-right: 20rpx
}
.detailContent{
  font-size: 36rpx;
  letter-spacing: 4rpx;
  line-height: 50rpx;
  /* text-align:justify; */
  text-indent: 72rpx;
  margin-top: 20rpx
}
.largeImgConyainer{
  position: relative
}
.playBtn{
  position: absolute;
  width: 60rpx;
  height: 60rpx;
  top: 50%;
  left: 50%;
  margin-left: -30rpx;
  margin-top: -30rpx
}
</style>

