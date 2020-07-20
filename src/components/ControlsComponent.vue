<template> 
  <div id="controlscontainer">
        <strong>Connected: {{connected}}</strong><br><br><br>
        <div class="half">
            <h4>Presets</h4>

    <b-button v-on:click="moveCamLeft()" :disabled="!connected || !amIActive"><b-icon icon="chevron-left" variant="success"></b-icon> links</b-button>

      <svg width="8em" height="3em" viewBox="0 0 16 16" class="bi bi-camera-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
        <path fill-rule="evenodd" d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
      </svg>

    <b-button v-on:click="moveCamRight()" :disabled="!connected || !amIActive">rechts <b-icon icon="chevron-right" variant="success"></b-icon></b-button>
    <br><br>
    <b-button v-on:click="moveSliderLeft()" :disabled="!connected || !amIActive"><b-icon icon="chevron-left" variant="success"></b-icon> links</b-button>
    <b-button v-on:click="moveSliderRight()" :disabled="!connected || !amIActive">rechts <b-icon icon="chevron-right" variant="success"></b-icon></b-button>
  </div>
  <div class="half">
            <h4>Current Waiting Queue {{this.currentTimer}}</h4>
            <SimpleQueue :currentQueue="currentQueue" :ownId="ownId" :ownName="clientName"></SimpleQueue>
        </div>
    </div>
</template>

<script>
    import SimpleQueue from "./SimpleQueueComponent"

export default {
  components: {
            SimpleQueue
        },
        methods: {
            //CHANGEME: die Namen der Nachrichten die ihr mit emit() verschickt müssen mit dem Backend matchen
            moveCamLeft: function () {
                console.log("Moving cam to the left");
                this.$socket.emit('moveCamLeft');
            },
            moveCamRight: function () {
                console.log("Moving cam to the right");
                this.$socket.emit('moveCamRight');
            },
            moveSliderLeft: function () {
                console.log("Moving slider to the left");
                this.$socket.emit('moveSliderLeft');
            },
            moveSliderRight: function () {
                console.log("Moving slider to the right");
                this.$socket.emit('moveSliderRight');
            }
        },

  sockets: {
            connect: function () {
                console.log('socket connected')
                this.connected = true;
                this.ownId = this.$socket.id
                this.$socket.emit("register_front")
            },
            disconnect: function () {
                console.log('socket disconnected')
                this.connected = false;
            },
            //CHANGEME: die Namen der Nachrichten hier reinkommen müssen mit dem Backend matchen (Funktionsname = Nachrichtenname)
            nsp_list: function (data) {
                console.log("NSPs:" + data);
            },
            update_queue: function (data) {
                this.currentQueue = data;
            },
            queue_ping: function() {
                this.$socket.emit("queue_pong")
            },
            update_timer:function(data) {
                this.currentTimer = data;
            },
            client_name: function(data) {
                this.clientName = data;
            }
        },
        data: function () {
            return {
                connected: false,
                currentQueue: [],
                ownId: "undefined",
                clientName: "undefined",
                currentTimer: 0,
            }
        },
        computed: {
            amIActive: function() {
                if(this.currentQueue.length == 0) return false;
                return this.currentQueue[1][0].id === this.ownId;
            }
        }
    }
</script>

<style scoped>
  .half {
        display: inline-block;
        max-width: 50%;
        width: 50%;
        vertical-align: top;
    }
</style>