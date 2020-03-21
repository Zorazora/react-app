//console.log(localStorage.getItem("user"))
let current = localStorage.getItem("user");

const state = current === undefined ? {isLogging: true, user: JSON.parse(current)} : {isLogging: false, user: {
        mailaddress: '111',
        username: '222',
        avatar: '333',
        token: '444'
    }};

console.log('state:',state)

export default {
    user: state.user,
    isLogging: state.isLogging
}