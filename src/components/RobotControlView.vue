<template>
  <div>
    <index></index>
  </div>
</template>

<script>
import index from "../components/index.vue"

export default {
  name: 'Component',
  components: {
    index
  },
  props: {
    test: {
      type: String,
    }
  },
  sockets: {
        connect: function () {
            console.log('socket connected')
        },
        nachrichtenname: function () {
            console.log('this method was fired by the socket server. eg: io.emit("nachrichtenname", data)')
        }
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
