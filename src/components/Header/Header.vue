<template>
  <div class="header">
    <div class="header-section flex">
      <q-btn flat class="nav-link">
        Home
      </q-btn>
      <q-btn flat class="nav-link">
        Team
      </q-btn>
      <q-btn flat class="nav-link">
        Demo
      </q-btn>
    </div>
    <div class="header-section">
      <div class="logo">
        <img class="logo logo-img" src="~assets/asklepios-logo-full.svg" />
        <div class="logo logo-title">AskLepios</div>
      </div>
    </div>
    <div class="header-section">
      <q-btn class="demo-btn"><span class="btn-txt">Try Demo</span></q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "header"
};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  background: transparent;
  padding: 2.5rem;
  background: $secondary;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.header-section {
  align-items: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.nav-link {
  color: $dark;
  font-size: 14px;
  margin: 0 1.2rem 0 1.2rem;
}

.logo{
  grid-gap: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  &.logo-img{
    height: 50px;
    width: auto;
  }
  &.logo-title{
    font-size: 26px;
    font-weight: 900;
  }
}


.demo-btn{
  background: $primary;
  color: $light;
}


</style>
