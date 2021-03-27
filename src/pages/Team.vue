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
    <section
      class="col-12 justify-center items-center row q-mb-xl q-gutter-xl"
    >
      <TeamCard
      class="col-md-4 col-sm-9 col-xs-10 col-lg-4"
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
  },
  {
    id: 2,
    name: "Zoë Nichole Elizabeth Xion Faith Hall",
    title: "University Student",
    bio: "To be added ",
    pic: require("../assets/team/zoe_hall.jpeg"),
    socialMedia: {
      facebook: "https://www.facebook.com/zoe.i.hall",
      linkedin: "https://www.linkedin.com/in/zo%C3%AB-hall-5b17aa1b7",
      github: "https://github.com/znexfh",
      instagram: "https://www.instagram.com/znexfh/"
    }
  },
    {
    id: 3,
    name: "Shaun Jennings",
    title: "University Student",
    bio: "To be added",
    pic: require("../assets/team/shaun_jennings.jpeg"),
    socialMedia: {
      instagram: "https://www.instagram.com/shaunjennings_/",
      github:'https://github.com/ShaunJennings876'
    }
  },
      {
    id: 4,
    name: "Brandon Tucker",
    title: "University Student",
    bio: "To be added",
    pic: require("../assets/team/brandon_tucker.jpeg"),
    socialMedia: {
      instagram: "https://www.instagram.com/brandontuckerr/",
      linkedin: "https://www.linkedin.com/in/brandon-tucker-603ba9207/",
      github: 'https://github.com/BeaTea109'
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
