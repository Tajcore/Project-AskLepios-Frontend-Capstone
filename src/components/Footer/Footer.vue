<template>
  <div class="footer">
    <div class="footer-section">
      <div class="text-dark">©2021 CAPSTONE PROJECT</div>
      <div class="logo">
        <img class="logo logo-img" src="~assets/asklepios-logo-full.svg" />
        <div class="logo logo-title">AskLepios</div>
      </div>
      <q-btn class="demo-btn gt-md"><span class="btn-txt">Try Demo</span></q-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: "Footer"
};
</script>
<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  background: $secondary;
  align-items: center;
  padding: 1.4rem;
}

.footer-section{
  display: flex;
  width: 80%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.logo {
  grid-gap: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  &.logo-img {
    height: 50px;
    width: auto;
  }
  &.logo-title {
    font-size: 26px;
    font-weight: 900;
  }
}

.demo-btn {
    background: $primary;
    color: $light;
  }
</style>
