<template>
    <div class="c-wrap">
        <div class="c-chat"  v-chat-scroll>

            <Message  v-for="(m,index) in getMessages" :key="index"
                      :name="m.name"
                      :text="m.text"
                      :owner="m.id===getUser.id"

            />
        </div>
        <div class="c-form">
            <ChatForm/>
        </div>
    </div>
</template>


<script>
    import {mapGetters} from 'vuex';
    import Message from '../components/message';
    import ChatForm from "../components/ChatForm";

    export default {
        name: "chat",
        components: {Message,ChatForm},
        middleware: "chat",
        comments: {Message},
        head() {
            return {
                title: `room ${this.getUser.room}`
            }
        },
        computed: {
            ...mapGetters(['getUser', 'getMessages'])
        }
    }
</script>

<style scoped>
    .c-wrap {
        height: 100%;
        position: relative;
        overflow: hidden;
    }

    .c-form {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1rem;
        height: 80px;
        background-color: #333;
    }


    .c-chat {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 80px;
        padding: 1rem;
        overflow-y: auto;
    }
</style>