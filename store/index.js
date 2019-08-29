export const state = () => ({
    user: {},
    messages: [],
    users: []
});

export const mutations = {
    setUser(state, user) {
        state.user = user
    },
    clearData(state) {
        state.user = {};
        state.users = [];
        state.messages = [];
    },
    SOCKET_newMessage(store, message) {
        store.messages.push(message);
    },
    SOCKET_updateUsers(state, users) {
        state.users = users
    }
};

export const actions = {
    // SOCKET_newMessage(ctx, data) {
    //     console.log('message resived', data)
    // }
};


export const getters = {
    getUser(state) {
        return state.user;
    },
    getMessages(state) {
        return state.messages;
    }
};
