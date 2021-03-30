<template>
  <div class="view chat">
    <q-layout class="row">
      <q-header>
        <q-toolbar>
          <q-btn flat to="/" class="logout">Home</q-btn>
          <div class="text-h2 text-white">AskLepios</div>
        </q-toolbar>
      </q-header>

      <section v-if="isConnected === true" id="chat-space" class="chat-box col-grow">
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
            <div class="username row items-center">
              <img
                style="height:30px ; width: auto; margin-right: 0.1rem"
                class="col-6"
                src="~assets/asklepios-logo-full.svg"
              />
              Lepios
            </div>
            <div class="content">{{ message.content }}</div>
          </div>
        </div>
      </section>
      <section
        v-else
        class="bg-white flex flex-center items-center justify-center col-12"
      >
        <lottie-player
          src="https://assets7.lottiefiles.com/datafiles/ORpUnaV6z0mJ17E/data.json"
          background="transparent"
          speed="1"
          style="width: 300px; height: 300px;"
          loop
          autoplay
        ></lottie-player>
      </section>

      <footer class="col-12 col-shrink">
        <div class="row">
          <q-input
            type="text"
            v-on:keyup.enter="sendMessage"
            filled
            dense
            v-model="inputMessage"
            placeholder="Write a message..."
            class="col-xl-11 col-lg-11 col-md-11 col-sm-10 col-xs-9"
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
      connection: null,
      isConnected: false,
      botResponse: null,
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
      console.log(newMessage);
    },
    botResponse: function(newMessage, oldMessage) {
      this.sendMessageBot(newMessage);
    }
  },
  computed: {
    disableSend: function() {
      return this.inputMessage.length === 0;
    }
  },
  mounted: function() {
    console.log(this.isConnected);
    this.setUp()
  },
  destroyed: function() {
    this.isConnected = false;
    this.connection.close();
  },
  methods: {
    setUp() {
      this.connection = new WebSocket("wss://asklepios-project-backend.herokuapp.com/conversation");
      const isConnected = this.setConnection;
      const setMessage = this.setBotMessage;
      this.connection.onopen = function() {
        isConnected();
        console.log("Successfully connected to the echo websocket server...");
      };
      const send = this.sendMessage;
      this.connection.onmessage = function(event) {
        setMessage(event.data);
      };
    },
    setConnection() {
      this.isConnected = true;
    },
    sendMessage() {
      if (this.inputMessage.length !== 0) {
        const newMessage = {
          content: this.inputMessage,
          username: this.username,
          id: this.messages.length + 1,
          user: true
        };
        this.messages.push(newMessage);

        this.connection.send(newMessage.content);
        this.inputMessage = "";
      }
    },
    setBotMessage(msg) {
      this.botResponse = msg;
    },
    sendMessageBot(message) {
      const newMessage = {
        content: message,
        username: "lepios",
        id: this.messages.length + 1
      };
      this.messages.push(newMessage);
    },
    sendMessageEnter(e) {
      if (e.keyCode === 13) {
        this.sendMessage();
      }
    }
  }
};
</script>

<style lang="scss">
.view {
  display: flex;
  justify-content: center;

  background-color: $primary;
  &.chat {
    flex-direction: column;
    header {
      position: relative;
      display: block;
      width: 100%;
      padding: 50px 30px 10px;
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
      min-height: 73vh;
      max-height: 73vh;
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
            max-width: 35%;
            justify-self: flex-end;
            .content {
              color: #fff;
              font-weight: 600;
              background-color: $dark;
            }
            @media screen and (max-width: $breakpoint-xl-max) {
              max-width: 35%;
            }

            @media screen and (max-width: $breakpoint-md-max) {
              max-width: 55%;
            }

            @media screen and (max-width: $breakpoint-sm-max) {
              max-width: 90%;
            }
            @media screen and (max-width: $breakpoint-xs-max) {
              max-width: 90%;
            }
          }
          .message-inner-bot {
            justify-self: flex-start;
            max-width: 35%;
            .content {
              color: $dark;
              padding: 2rem;
              font-weight: 600;
              background-color: $secondary;
            }
            @media screen and (max-width: $breakpoint-xl-max) {
              max-width: 35%;
            }

            @media screen and (max-width: $breakpoint-md-max) {
              max-width: 55%;
            }

            @media screen and (max-width: $breakpoint-sm-max) {
              max-width: 90%;
            }
            @media screen and (max-width: $breakpoint-xs-max) {
              max-width: 90%;
            }
          }
        }
      }
    }
    footer {
      position: sticky;
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

.logout {
  position: absolute;
  top: -46%;
  right: -3%;
  transform: translate(-50%, -50%);
  appearance: none;
  border: none;
  outline: none;
  background: none;

  color: #fff;
  font-size: 18px;
  margin-bottom: 10px;
  text-align: right;
  @media screen and (max-width: $breakpoint-xs-max) {
    right: -15%;
  }
}
</style>
