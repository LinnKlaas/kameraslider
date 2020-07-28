<template>
  <div id="app">
    <Layout streamUrl="http://192.168.178.42:8080/stream.mjpg">
      <template v-slot:videocomponent>
      </template>
      <template v-slot:controlcomponent>
        <Controls></Controls>
      </template>
      <template v-slot:queuecomponent>
        <SimpleQueueComponent></SimpleQueueComponent>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from './submodules/base_layout/src/components/interface.vue'
import Controls from './components/ControlsComponent.vue'
import SimpleQueueComponent from './components/SimpleQueueComponent.vue'

export default {
  name: 'App',
  components: {
    Layout,
    Controls,
    SimpleQueueComponent,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
