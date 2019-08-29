<template>
    <v-flex xs-12>
        <v-text-field label="enter you message" outline v-model="text" @keydown.enter="send">

        </v-text-field>
    </v-flex>
</template>



<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "ChatForm",
        data: () => ({
            text: ""
        }),
        methods: {
            send() {
                this.$socket.emit('createMessage', {
                    text: this.text,
                    id: this.getUser.id
                }, (data) => {
                    if (typeof data === 'string') {
                        console.log(data)
                    } else {
                        this.text = '';
                    }
                })
            }
        },
        computed: {
            ...mapGetters(['getUser'])
        }
    }
</script>

<style scoped>

</style>