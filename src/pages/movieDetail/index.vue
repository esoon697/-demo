<template>
  <div class="mdContainer">
    <img class="movieLargeImg" :src="movieDetail.images.large" alt="">
    <p class="movieName">{{movieDetail.title}}</p>
    <div class="movieDetail">
      <p class="score">评分：{{movieDetail.rating.average}}</p>
      <p class="director">导演：{{movieDetail.directors[0].name}}</p>
      <p class="actor">主演：<span v-for="(item, index) in movieDetail.casts" :key="index">{{item.name}} </span></p>
    </div>
    <button class="watchBtn">我要观影</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      movieDetail: {}
    }
  },
  beforeMount () {
    console.log(this)
    this.movieDetail = JSON.parse(this.$mp.query.item)
  }
}
</script>

<style>
.mdContainer{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.movieLargeImg{
  width: 70%;
  margin: 40rpx 15%
}
.movieName{
  width: 70%;
  margin: 0 15% 40rpx;
  font-weight: bold;
  text-align: center
}
.movieDetail{
  width: 70%;
  display: flex;
  flex-direction: column;
  margin-left: 20%;
  margin-bottom: 20rpx;
  font-size: 30rpx;
  line-height: 50rpx
}
.actor{
  text-indent:-3em;
  margin-left:3em
}
.watchBtn{
  width: 70%;
  height: 80rpx;
  background-color: darkgreen;
  color: white;
  font-size: 36rpx;
  line-height: 80rpx
}
</style>