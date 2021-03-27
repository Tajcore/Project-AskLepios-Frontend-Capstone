<template>
  <q-page class="flex flex-center row q-gutter-xl home-page">
    <img src="~assets/home-background.svg" class="background" />
    <section class="q-mb-xl row justify-center ">
      <div class="row justify-start col-9 q-gutter-md">
        <div class="col-lg-7 col-md-6 row q-gutter-md">
          <div class="text-h3 col-12">
            Introducing AskLepios, Our AI Health Chatbot
          </div>
          <div class="text-h6 col-12">
            AskLepios is a free health chatbot that serves as a virtual health
            consultant. AskLepios diagnoses what illnesses you may have based on
            the symptoms you describe. It then shares precautions that should be
            taken after the diagnosis is determined. It is a great tool to learn
            what illnesses you may be facing, without the hassle and price of a
            doctors visit. Try it today.
          </div>

          <div class="row col-12 justify-start q-gutter-xs">
            <q-btn
              color="dark"
              label="Try Out Lepios"
              class="col-auto"
            />
            <q-btn outline label="Learn More" class="col-auto" />
          </div>
        </div>
        <div col-lg-6 col-md-5 no-gutter>
          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_xhvv47k5.json"
            background="transparent"
            speed="1"
            style="width: auto; height: auto"
            loop
            autoplay
            class="lottie-player"
          />
        </div>
      </div>
    </section>
    <section class="q-mb-xl row justify-center">
      <div class="row justify-center col-lg-12 col-md-9 col-sm-9 col-xs-9">
        <div class="col-lg-4 col-sm-6 row q-gutter-md">
          <div class="text-h3">
            Health Consultation
          </div>
          <div class="text-h6 col-10">
            By conversing with AskLepios and answering the questions it asks you
            you will receive a list of potential diagnoses based on the symptoms
            you describe. Our latest version of AskLepios has the following
            features:
          </div>
          <div class="row col-12 justify-start">
            <div class="row col-6 q-gutter-md">
              <div class="col-12">
                <q-icon size="36px" color="primary" name="featured_play_list" />
              </div>
              <div class="text-h5 text-bold col-9">Illness Diagnosis</div>
              <div class="text-body1 col-9">
                Provide a list of potential diagnoses based off consultation
                with the user.
              </div>
            </div>
            <div class="row col-6 q-gutter-md">
              <div class="col-12">
                <q-icon size="36px" color="primary" name="featured_play_list" />
              </div>
              <div class="text-h5 text-bold col-9">Suggesting Precautions</div>
              <div class="text-body1 col-9">
                Suggest precautions based on diagnosed illness
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 row q-gutter-md">
          <div class="text-h3">
            How it Works
          </div>
          <div class="text-h6 col-10">
            AskLepios is designed to give the feeling of having a conversation
            with a live health consultant using instant messaging . Describe any
            symptoms you’re experiencing and after the conversation you will be
            diagnosed.
          </div>
          <div class="row col-12 justify-start">
            <div class="row col-6 q-gutter-md">
              <div class="col-12">
                <q-icon
                  size="36px"
                  color="primary"
                  name="sentiment_satisfied_alt"
                />
              </div>
              <div class="text-h5 text-bold col-9">Easy to use</div>
              <div class="text-body1 col-9">
                Designed to understand standard english and ask simple
                questions.
              </div>
            </div>
            <div class="row col-6 q-gutter-md">
              <div class="col-12">
                <q-icon size="36px" color="primary" name="fast_forward" />
              </div>
              <div class="text-h5 text-bold col-9">Fast Responses</div>
              <div class="text-body1 col-9">
                Conversations flow naturally and responses are generated quickly
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section />
  </q-page>
</template>

<script>
export default {
  name: "Home",
  components: {},
  beforeCreate: function() {
    this.$q.dark.set(false);
    document.body.className = "bg-white";
  }
};
</script>

<style lang="scss" scoped>
.background {
  width: 1490.03px;
  height: 1154px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 20%;
  left: 95%;
  z-index: -1;
}

.lottie-player{
  padding: 0 !important;
  margin: 0 !important;

}
@media screen and (max-width: $breakpoint-md-max) {
  .home-page{
    position: relative;
  }
  .background {
    z-index: -1;
    opacity: 0.2;
    height: 100vh;
    width: 0%;
  }
}
</style>
