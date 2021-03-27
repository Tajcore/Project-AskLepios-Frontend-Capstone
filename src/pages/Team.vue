<template>
  <q-page class="flex flex-center justify-center row q-gutter-xl">
    <section class="col-8 justify-center row">
      <div class="gt-md col-12 text-h4 text-white text-center">
        We're a team of university students from the University of the West
        Indies studying Computer Science. We came together to create this
        project which is the main focus of our Capstone Project.
      </div>
      <div class="lt-lg col-12 text-h6 text-white text-center">
        We're a team of university students from the University of the West
        Indies studying Computer Science. We came together to create this
        project which is the main focus of our Capstone Project.
      </div>
    </section>
    <section class="col-lg-12 col-sm-10 justify-center items-center row q-mb-xl">
      <TeamCard
        v-for="member in members"
        :key="member.id"
        :name="member.name"
        :bio="member.bio"
        :title="member.title"
        :socialMedia="member.socialMedia"
        :pic="member.pic"
      />
    </section>
    <section />
    <q-space />
  </q-page>
</template>

<script>
const teamMembers = [
  {
    id: 1,
    name: "Tahjyei Thompson",
    title: "Web Developer / Manga Enthusiast",
    bio:
      "Always adapting and never stumbling in this era of technology, I aim to utilize my technical prowess and adaptive nature in order to contribute to the growth and maintenance of organizations’ technical infrastructure.",
    pic: require("../assets/team/tahjyei_thompson.jpg"),
    socialMedia: {
      facebook: "https://www.facebook.com/tahjyeithompson/",
      linkedin: "https://www.linkedin.com/in/tajcore/",
      github: "https://github.com/Tajcore",
      instagram: "https://www.instagram.com/tahj_sdsg/"
    }
  }
];
import { TeamCard } from "components/";
export default {
  name: "Team",
  data() {
    return {
      members: teamMembers
    };
  },
  components: {
    TeamCard
  },

  beforeCreate: function() {
    this.$q.dark.set(true);
    document.body.className = "team";
  }
};
</script>

<style scoped lang="scss"></style>
