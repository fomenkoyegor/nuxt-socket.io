export default function ({store, redirect}) {
    if (!Object.keys(store.getters.getUser).length) {
        redirect('/?message=noUser')
    }
}