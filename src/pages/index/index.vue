<template>
  <div class="startContainer">
    <img class="avatar" v-if="isShow" :src="userInfo.avatarUrl" alt="loading">
    <button class="getInfoBtn" v-else open-type="getUserInfo" @getuserinfo="getUserInfo">获取头像</button>
    <p class="userName">hello {{userInfo.nickName}}</p>
    <button class="startBtn" @click="enterSys">进入我的世界</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      userInfo: {}
    }
  },
  beforeMount () {
    wx.getUserInfo({
      success: (res) => {
        console.log(res.userInfo)
        this.userInfo = res.userInfo
        this.isShow = true
      },
      fail: () => {
        console.log('beforeMount error')
      }
    })
  },
  methods: {
    getUserInfo (res) {
      console.log('res', res)
      wx.getUserInfo({
        success: (res) => {
          console.log('res.userInfo: ', res.userInfo)
          this.userInfo = res.userInfo
          this.isShow = true
        },
        fail: () => {
          console.log('methods error')
        }
      })
    },
    enterSys () {
      console.log('enterSys')
      wx.switchTab({
        url: '/pages/newsAndmusic/main',
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
page{
  height: 100%
}
.startContainer{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}
.avatar,.getInfoBtn{
  width: 200rpx;
  height: 200rpx;
  border-radius: 100rpx
}
.getInfoBtn{
  line-height: 200rpx;
  text-align: center;
  font-size: 28rpx;
  border: none;
  background-color: #999;
  color: white
}
.userName{
  margin: 80rpx;
  font-size: 60rpx;
}
.startBtn{
  font-size: 28rpx;
  background-color: #999;
  color: white;
}
.startBtn:active{
  background-color: #0f0;
  color: white
}
</style>
