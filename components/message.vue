<template>
    <div>
        <div v-if="name==='admin'" class="system">
            <p class="text-xs-center">{{text}}</p>
            <hr>
        </div>
        <div v-else class="wrap">
            <div class="message" :class="{owner}">
                <small><strong>{{name}}</strong></small>
                <p>{{text}}</p>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: "message",
        props: {
            name: String,
            text: String,
            owner: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped lang="stylus">
    .system {
        margin-bottom: 1rem;

        p {
            margin-bottom: 1rem;
        }

    }

    .wrap {
        display: flex;
        flex-direction: column;

    }

    .message {
        padding: 1rem;
        width: 60%;
        margin: 0 1rem;
        box-shadow: 0px 1px 0px rgba(50, 50, 50, 0.3);
        border-radius: 4px;
        background-color: #1976d2;
        margin-bottom: 1rem;
        animation show 0.65s linear;
        p {
            margin-bottom: 1rem;

        }
    }

    @keyframes show {
        from{
            opacity :0.6;
            transform translateX(-50%);
        }
    }

    .owner {
        background-color: whitesmoke;
        color: #333;
        align-self: flex-end;
    }

</style>