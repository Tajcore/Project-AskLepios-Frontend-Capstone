<template>
  <s>
    <q-header reveal reveal-offset="0" class="row justify-center fixed bg-transparent">
      <q-toolbar
        v-bind:class="{
          'text-dark': !dark,
          'text-white': dark
        }"
        class="bg-transparent q-my-md lg-col-8 md-col-12"
      >
        <q-btn
          @click="drawer = !drawer"
          flat
          round
          dense
          icon="menu"
          color="dark"
          class="q-mr-sm lt-lg"
        />
        <q-space />
        <q-btn flat label="Home" class=" gt-md" />
        <q-btn flat label="Team" class="gt-md" />
        <q-btn flat label="Demo" class="gt-md" />

        <q-space />
        <q-toolbar-title
          ><img v-if="dark" src="~assets/logo_light.svg" />
          <img v-else src="~assets/logo_dark.svg" />
        </q-toolbar-title>
        <q-space />
        <q-btn
          v-bind:class="{
            'text-dark': dark,
            'bg-primary': !dark,
            'bg-secondary': dark,
            'text-white': !dark
          }"
          label="Try Demo"
        />
        <q-space class="gt-md" />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      overlay
      :width="150"
      class="lt-lg"
    >
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item @click="drawer = !drawer" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="menu" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section>
              Home
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="group" />
            </q-item-section>

            <q-item-section>
              Team
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="gamepad" />
            </q-item-section>

            <q-item-section>
              Demo
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </s>
</template>

<script>
export default {
  name: "t-header",
  props: {
    dark: Boolean
  },
  data() {
    return {
      drawer: false
    };
  },
  computed: {}
};
</script>
