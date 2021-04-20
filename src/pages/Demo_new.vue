<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          AskLepios
        </q-toolbar-title>
        <q-space />
        <q-btn to="/" icon="home" />
      </q-toolbar>
    </q-header>

    <q-page-container class="root scroll">
      <div class="container">
        <q-card class="my-card text-dark chatroom">
          <q-card-section
            v-if="isConnected"
            style="overflow:hidden; height:100%; padding:0 0.5vw 0 0.5vw !important;"
          >
            <div class="chat-area">
              <VuePerfectScrollbar style="padding-right: 0.9vw;" v-chat-scroll>
                <li
                  v-for="(bubble, index) in chatContents"
                  :key="`Lepios-Message-${index}}`"
                >
                  <div
                    v-if="bubble.type === 'message' && bubble.sender == 'user'"
                    class="user-bubble"
                  >
                    <div class="user-bubble bubble">{{ bubble.content }}</div>
                    <div class="user-bubble timestamp">
                      {{ dateFormat(bubble.timestamp) }}
                    </div>
                  </div>
                  <div
                    v-if="bubble.type === 'choices' && bubble.active == true"
                    class="user-bubble"
                  >
                    {{ disableSend() }}
                    <div class="chat-options">
                      <q-btn
                        color="primary"
                        v-on:click="
                          () => {
                            chatContents.push({
                              type: 'message',
                              sender: 'user',
                              content: option[1],
                              realValue: option[0]
                            });

                            bubble.active = false;
                            disable = false;
                          }
                        "
                        v-for="(option, option_index) in bubble.choices"
                        :key="`Chat-Option-${index}-${option_index}`"
                        >{{ option[1] }}</q-btn
                      >
                    </div>
                  </div>

                  <div
                    v-if="bubble.type === 'message' && bubble.sender == 'bot'"
                    class="bot-bubble row q-gutter-xs"
                  >
                    <div class="col-auto self-start justify-center">
                      <q-avatar color="light"
                        ><img src="~assets/asklepios-logo-full.svg"
                      /></q-avatar>
                    </div>
                    <div class="col-xl-11 col-sm-9 q-gutter-xs">
                      <div>Lepios</div>
                      <div class="bot-bubble bubble">{{ bubble.content }}</div>
                      <div>
                        {{ dateFormat(bubble.timestamp) }}
                      </div>
                    </div>
                  </div>
                </li>
                <div
                  v-if="typing"
                  key="lepios-typing"
                  class="bot-bubble row q-gutter-xs"
                >
                  <div class="col-auto self-start justify-center">
                    <q-avatar color="light"
                      ><img src="~assets/asklepios-logo-full.svg"
                    /></q-avatar>
                  </div>
                  <div class="col-xl-11 col-sm-9 q-gutter-xs">
                    <div>Lepios</div>
                    <div class="bot-bubble flex">
                      <div style="--order: 1" class="dot" />
                      <div style="--order: 2" class="dot" />
                      <div style="--order: 3" class="dot" />
                    </div>
                  </div>
                </div>
              </VuePerfectScrollbar>
            </div>
          </q-card-section>
          <q-card-section
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
          </q-card-section>
          <q-card-actions align="around">
            <div class="row" style="width:100%">
              <q-input
                type="text"
                filled
                dense
                v-on:keyup.enter="
                  () => {
                    if (disable === false && inputMessage.length > 0) {
                      sendMessage(inputMessage);
                      inputMessage = '';
                    }
                  }
                "
                v-model="inputMessage"
                placeholder="Write a message..."
                class="col-xl-11 col-lg-11 col-md-11 col-sm-10 col-xs-9"
              />
              <q-btn
                :disable="inputMessage === '' || disable"
                v-on:click="
                  () => {
                    sendMessage(inputMessage);
                    inputMessage = '';
                  }
                "
                class="col-xl-1 col-lg-1 col-md-1 col-sm-2 col-xs-3"
                color="primary"
                label="Send"
              />
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    VuePerfectScrollbar
  },
  data() {
    return {
      disable: false,
      connection: null,
      isConnected: false,
      inputMessage: "",
      typing: false,
      chatContents: [
        {
          type: "message",
          content: "Hey I am Lepios, feel free to talk to me about your health",
          sender: "bot",
          timestamp: Date.now()
        },
         {
          type: "message",
          content: `For a better experience you should try start a consultation by saying something along the lines of "I don't feel good today"`,
          sender: "bot",
          timestamp: Date.now()
        }
      ]
    };
  },
  watch: {
    chatContents: function(newMessage, oldMessage) {
      const lastMessage = newMessage[newMessage.length - 1];
      if (lastMessage?.sender === "user") {
        if (lastMessage?.realValue) {
          this.connection?.send(lastMessage?.realValue);
        } else {
          this.connection?.send(lastMessage?.content);
        }
      }
    }
  },
  created: async function() {
    const vm = this;
    console.log("Starting connection to WebSocket Server");
    this.connection = await new WebSocket("ws://localhost:8000/conversation");

    this.connection.onmessage = async function(event) {
      if (event.data !== "None") {
        const result = JSON.parse(event.data);
        const message = { ...result, timestamp: new Date(result.timestamp) };
        vm.typing = true;
        await setTimeout(() => {
          vm.typing = false;
          vm.chatContents.push(message);
        }, 1000);
      }
    };

    this.connection.onopen = function(event) {
      console.log("Successfully connected to lepios websocket server...");
      vm.isConnected = true;
    };
  },
  methods: {
    dateFormat(date) {
      const options = {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat("default", options);
      return formatter.format(date);
    },

    sendMessage(input) {
      const message = {
        type: "message",
        content: input,
        sender: "user",
        timestamp: Date.now()
      };

      this.chatContents.push(message);
    },
    disableSend() {
      this.disable = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.root {
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
}

.container {
  margin: 2vh 0px 2vh 0px;
  padding: 5vw;
  height: 87vh;
  width: 80vw;
}

.chatroom {
  background: #fafbff;
}

.chatroom::before {
  content: " ";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  background-image: url("https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGFic3RyYWN0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60");
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: cover;
}

.chat-area {
  height: 60vh;
  grid-gap: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.user-bubble {
  margin-left: auto;
  animation-name: zoomIn;
  animation-duration: 0.3s;
  &.timestamp {
    text-align: right;
    margin-top: 0.1rem;
  }
  &.bubble {
    display: grid;
    place-content: center;
    border: 2px solid none;
    border-radius: 1rem;
    background: #138194;
    width: fit-content;
    color: white;
    font-weight: 500;
    max-width: 40%;
    padding: 1.2rem;
    @media screen and (max-width: $breakpoint-xl-max) {
      max-width: 35%;
    }

    @media screen and (max-width: $breakpoint-md-max) {
      max-width: 55%;
    }

    @media screen and (max-width: $breakpoint-sm-max) {
      max-width: 100%;
    }
    @media screen and (max-width: $breakpoint-xs-max) {
      max-width: 100%;
    }
  }
}

.bot-bubble {
  display: flex;
  flex-direction: row;
  align-items: center;
  animation-name: zoomIn;
  animation-duration: 0.3s;
  grid-gap: 0.5rem;
  &.bubble {
    display: grid;
    place-content: center;
    border: 2px solid none;
    border-radius: 1rem;
    background: white;
    width: fit-content;
    color: black;
    font-weight: 500;
    max-width: 40%;
    padding: 1.2rem;
    @media screen and (max-width: $breakpoint-xl-max) {
      max-width: 35%;
    }

    @media screen and (max-width: $breakpoint-md-max) {
      max-width: 55%;
    }

    @media screen and (max-width: $breakpoint-sm-max) {
      max-width: 100%;
    }
    @media screen and (max-width: $breakpoint-xs-max) {
      max-width: 100%;
    }
  }
}

.chat-options {
  margin-top: 0.3rem;
  display: flex;
  justify-content: flex-end;
  grid-gap: 0.3rem;
}

.dot {
  font-size: 2.2rem;
  animation: blink 1s infinite;
  animation-delay: calc(var(--order) * 100ms);
  width: 20px;
  height: 20px;
  background-color: #138194;
  border-radius: 50%;
}

@keyframes blink {
  0%,
  100% {
    opacity: 0;
  } /* more concise! */
  50% {
    opacity: 1;
  }
}
</style>
