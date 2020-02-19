<template>
  <div class="movieContainer">
    <movieItem v-for="(item, index) in moviesData" :key="index" :item="item"></movieItem>
  </div>
</template>

<script>
import movieItem from '../../components/movieItem'
import {mapState} from 'vuex'
export default {
  components: {movieItem},
  beforeMount () {
    console.log('beforeMount')
    this.$store.dispatch('getMoviesData')
  },
  computed: {
    ...mapState(['moviesData'])
  }
}
</script>

<style>

</style>