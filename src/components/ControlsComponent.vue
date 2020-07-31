<template> 
  <div>
        <strong>Connected: {{connected}}</strong><br><br><br>

    <b-button v-on:click="moveCamLeft()" :disabled="!connected || !$store.getters.amIActive"><b-icon icon="chevron-left" variant="success"></b-icon> links</b-button>

     <svg width="12em" height="3em" viewBox="0 0 16 16" class="bi bi-camera-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
        <path fill-rule="evenodd" d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
      </svg>

    <b-button v-on:click="moveCamRight()" :disabled="!connected || !$store.getters.amIActive">rechts <b-icon icon="chevron-right" variant="success"></b-icon></b-button>
    <br><br>
    <b-button v-on:click="moveSliderLeft()" :disabled="!connected || buttonState === 'links' || !$store.getters.amIActive"><b-icon icon="chevron-left" variant="success"></b-icon> links</b-button>
 
      <div class="slider-visualization">
        <div class="slider-car" :style="{right: sliderPos +'px'}"></div>
        <div class="slider-base"></div>
      </div>

    <b-button v-on:click="moveSliderRight()" :disabled="!connected || buttonState === 'rechts' || !$store.getters.amIActive">rechts <b-icon icon="chevron-right" variant="success"></b-icon></b-button>


    <br>
    Override Key: <input type="text" v-model="overridePW" v-on:change="authorize"> 
  </div>

</template>

<script>

export default {
        methods: {
            //CHANGEME: die Namen der Nachrichten die ihr mit emit() verschickt müssen mit dem Backend matchen
            moveCamLeft: function () {
                console.log("Moving cam to the left");
                this.$socket.emit('controlCam', -180);
            },
            moveCamRight: function () {
                console.log("Moving cam to the right");
                this.$socket.emit('controlCam', 180);
            },
            moveSliderLeft: function () {
                console.log("Moving slider to the left");
                this.$socket.emit('controlSlider', -200);
            },
            moveSliderRight: function () {
                console.log("Moving slider to the right");
                this.$socket.emit('controlSlider', 200);


            },
            authorize: function() {
                this.$socket.emit('authorize', this.overridePW);

            }
        },

  sockets: {
            connect: function () {
                console.log('socket connected')
                this.connected = true;
                this.$store.state.ownId = this.$socket.id
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
            serialresponse: function(data) {
                this.sliderPos = data/4;

                this.sliderPos = data/50;


                if (data === "rechts") {
                    this.buttonState = "rechts"
                } 
                else if (data === "links") {
                    this.buttonState = "links"
                }
                else if (data === "alles ok") {
                    this.buttonState = ""
                }



            },
            authorized: function(data) {
                this.authorized = data;
            }
        },
        data: function () {
            return {
                connected: false,
                buttonState: "",
                sliderPos: 4,


                overridePW: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCnCK1GPSpmhd/Vo8lRNcU6357mT5bITJE1zUd1BbzvK23FExBQ8UvmkFudXLGdt2N81XeJUFJ42UmN0JDg4mkJmt9nUtXc3OdwgHjikPlrLcTW6BraIFSMqe8tA0kFVZEvfH09b5dFMWkB4QDZWSh/I8zwSrKKJOAQZ0k+fKmhNlwk/6BqpcM8E78BkGOl35ydMFFSSpOPQxc5IlpNmWEY0HW6Oynpd4fNfu7xWkWSY6rZSFeILgPKC/2cGI+Ano85t4dOaAWMDnh0sl1mNy/4u2QlBGrE90PwXju7g7s+vlNT9OavEP97ZOiHFUdLBWwK+jljlSUkSnUAAwEgxqIr pi@flobot",
                authorized: false
            }
        }
    }
</script>

<style scoped>
  .buttons {
        display: inline-block;
  }
  .slider-visualization {
        display: inline-block;
        margin-left: 20px;
        margin-right: 20px;
  }
  .slider-base {
        padding: 2px;
        border-left: 150px solid black;
        position: relative;
        bottom: -15px;
  }
  .slider-car {
        height: 15px;
        width: 25px;
        background-color: #f9cb30;
        position: relative;
        float: right;
        bottom: 0px;
  }
</style>