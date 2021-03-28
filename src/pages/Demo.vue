<template>
  <div class="view chat">
    <q-layout class="row">
      <q-header>
        <q-toolbar>
          <q-btn flat to="/" class="logout">Home</q-btn>
          <div class="text-h2 text-white">AskLepios</div>
        </q-toolbar>
      </q-header>

      <section id="chat-space" class="chat-box col-grow">
        <div
          v-for="message in messages"
          :key="message.key"
          class="message animate__bounceIn current-user"
        >
          <div v-if="message.user" class="message-inner">
            <div class="username">{{ message.username }}</div>
            <div class="content">{{ message.content }}</div>
          </div>
          <div v-else class="message-inner-bot">
            <div class="username">Lepios</div>
            <div class="content">{{ message.content }}</div>
          </div>
        </div>
      </section>

      <footer class="col-12 col-shrink">
        <div class="row">
          <q-input
            type="text"
            filled
            dense
            v-model="inputMessage"
            placeholder="Write a message..."
            class="col-lg-11 col-md-11 col-sm-10 col-xs-9"
          />
          <q-btn
            :disable="disableSend"
            v-on:click="sendMessage"
            class="col-auto"
            color="primary"
            label="Send"
          />
        </div>
      </footer>
    </q-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      messages: [
        {
          username: "Lepios",
          content:
            "Hello my name is Lepios, an AI that's able to talk to you about your current health, let's start with how are you feeling today?",
          id: 1
        }
      ],
      username: "You",
      inputMessage: ""
    };
  },
  beforeCreate: () => {
    document.body.className = "demo";
  },
  watch: {
    messages: function(newMessage, oldMessage) {
/*       var chatSpace = document.getElementById("chat-space");
      chatSpace.scrollTop = chatSpace.scrollHeight; */
    }
  },
  computed: {
    disableSend: function() {
      return this.inputMessage.length === 0;
    }
  },
  methods: {
    sendMessage() {
      const newMessage = {
        content: this.inputMessage,
        username: this.username,
        id: this.messages.length + 1,
        user: true
      };
      this.messages.push(newMessage);

      this.inputMessage = "";
    }
  }
};
</script>

<style lang="scss">
.view {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: $primary;
  &.chat {
    flex-direction: column;
    header {
      position: relative;
      display: block;
      width: 100%;
      padding: 50px 30px 10px;
      .logout {
        position: absolute;
        top: 15px;
        right: 15px;
        appearance: none;
        border: none;
        outline: none;
        background: none;

        color: #fff;
        font-size: 18px;
        margin-bottom: 10px;
        text-align: right;
      }
    }
    .chat-box {
      border-radius: 24px 24px 0px 0px;
      background-color: #fff;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      flex: 1 1 100%;
      padding: 30px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      flex-grow: 1;
      min-height: 570px;
      max-height: 570px;
      overflow: scroll;
      overflow-x: hidden !important;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* Internet Explorer 10+ */
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
      .message {
        display: grid;
        margin-bottom: 15px;
        animation-name: zoomIn;
        animation-duration: 0.3s;

        .message-inner {
          .username {
            color: #888;
            font-size: 16px;
            margin-bottom: 5px;
            padding-left: 15px;
            padding-right: 15px;
          }
          .content {
            display: inline-block;
            padding: 10px 20px;
            background-color: #b1a8a8;
            border-radius: 50px;
            color: #333;
            font-size: 18px;
            line-height: 1.2em;
            text-align: left;
          }
        }
        .message-inner-bot {
          .username {
            text-align: left;
            color: #888;
            font-size: 16px;
            margin-bottom: 5px;
            padding-left: 15px;
            padding-right: 15px;
          }
          .content {
            display: inline-block;
            padding: 10px 20px;
            background-color: #f3f3f3;
            border-radius: 50px;
            color: #333;
            font-size: 18px;
            line-height: 1.2em;
            text-align: left;
          }
        }
        &.current-user {
          margin-top: 30px;
          text-align: right;
          .message-inner {
            max-width: 20%;
            justify-self: flex-end;
            .content {
              color: #fff;
              font-weight: 600;
              background-color: $dark;
            }
           @media screen and (max-width: $breakpoint-md-max){
               max-width: 75%;
             }
          }
          .message-inner-bot {
            justify-self: flex-start;
            max-width: 20%;
            .content {
              color: $dark;
              padding: 2rem;
              font-weight: 600;
              background-color: $secondary;
            }
             @media screen and (max-width: $breakpoint-md-max){
               max-width: 75%;
             }
          }
        }
      }
    }
    footer {
      position: relative;
      display: block;
      bottom: 0px;
      background-color: #fff;
      padding: 30px;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      form {
        display: flex;
        input[type="text"] {
          flex: 1 1 100%;
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px 0px 0px 8px;

          color: #333;
          font-size: 18px;
          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
          background-color: #f3f3f3;
          transition: 0.4s;
          &::placeholder {
            color: #888;
            transition: 0.4s;
          }
        }

      }
    }

  }
}
</style>
