<template>
    <v-layout column justify-center align-center>
        <v-flex xs12 sm8>
            <v-card min-width="400px">
                <v-card-title>
                    <h1>Chat</h1>
                </v-card-title>
                <v-card-text>
                    <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                    >
                        <v-text-field
                                v-model="name"
                                :counter="10"
                                :rules="nameRules"
                                label="Name"
                                required
                        ></v-text-field>

                        <v-text-field
                                v-model="room"
                                :counter="10"
                                :rules="roomRules"
                                label="room"
                                type="number"
                                required
                        ></v-text-field>


                        <v-btn
                                :disabled="!valid"
                                color="primary"
                                @click="validate"
                        >
                            Validate
                        </v-btn>


                    </v-form>
                </v-card-text>

                <div>
                    {{getUser}}
                </div>
            </v-card>


        </v-flex>
    </v-layout>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex';

    export default {
        name: "index",
        layout: 'empty',
        data: () => ({
            valid: true,
            name: 're',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters'
            ],
            room: '123',
            roomRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters'
            ],
        }),
        sockets: {
            connect: function () {
                console.log('socket connected')
            },

        },
        methods: {
            ...mapMutations(['setUser']),
            createMessage() {
                this.$socket.emit('createMessage', {
                    text: 'from client->'
                })
            },
            validate() {
                if (this.$refs.form.validate()) {
                    const user = {
                        name: this.name,
                        room: this.room
                    };
                    this.$socket.emit('userJoined', user, (data) => {
                        if (typeof data === 'string') {
                            console.log(data)
                        } else {
                            this.setUser({...user, id: data.userId});
                            this.$router.push('/chat')
                        }
                    });


                }
            },
            reset() {
                this.$refs.form.reset()
            },
            resetValidation() {
                this.$refs.form.resetValidation()
            }
        },
        computed: {
            ...mapGetters(['getUser'])
        }
    }
</script>

<style scoped>

</style>
