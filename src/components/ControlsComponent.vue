<template> 
  <div>
    <b-button v-on:click="moveLeft()"><b-icon icon="chevron-left" variant="success"></b-icon> links</b-button>

      <svg width="8em" height="3em" viewBox="0 0 16 16" class="bi bi-camera-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
        <path fill-rule="evenodd" d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
      </svg>

    <b-button v-on:click="moveRight()">rechts <b-icon icon="chevron-right" variant="success"></b-icon></b-button>
    <br><br>
    <b-button v-on:click="moveLeft()"><b-icon icon="chevron-left" variant="success"></b-icon> links</b-button>
    <b-button v-on:click="moveRight()">rechts <b-icon icon="chevron-right" variant="success"></b-icon></b-button>
  
  </div>
</template>

<script>


export default {
  name: 'Steuerung',
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

<style scoped>

</style>