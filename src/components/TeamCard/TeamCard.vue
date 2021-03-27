<template>
  <q-card style="team_card" dark>
    <img :src="pic" />
    <q-card-section>
      <div class="text-h6">{{ name }}</div>
      <div class="text-subtitle2">{{ title }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ bio }}
    </q-card-section>
    <q-card-actions>
      <q-btn
      type="a"
        v-if="socialMedia.facebook"
        :href="socialMedia.facebook"
        :icon="fabFacebook"
      />
      <q-btn
        type="a"
        v-if="socialMedia.linkedin"
        :href="socialMedia.linkedin"
        :icon="fabLinkedin"
      />
      <q-btn
      type="a"
        v-if="socialMedia.github"
        :href="socialMedia.github"
        :icon="fabGithub"
      />
      <q-btn
      type="a"
        v-if="socialMedia.instagram"
        :href="socialMedia.instagram"
        :icon="fabInstagram"
      />
    </q-card-actions>
  </q-card>

</template>
<script>
import { fabLinkedin, fabFacebook, fabGithub, fabInstagram} from "@quasar/extras/fontawesome-v5";
export default {
  name: "TeamCard",
  props:{
    name: String,
    bio: String,
    title: String,
    socialMedia: Object,
    pic: String,
  },
  created() {
    this.fabLinkedin = fabLinkedin;
    this.fabFacebook = fabFacebook;
    this.fabGithub = fabGithub;
    this.fabInstagram = fabInstagram
  }
};
</script>

<style lang="scss" scoped>
.team_card{
  max-width: 500px;
}
</style>
