import {combineReducers} from 'redux'
import defaultState from './state'

function user(state = defaultState, action) {
    switch (action.type) {
        case 'SET_USER':
            //console.log('reducer:', action.user)
            return {
                user: action.user,
                isLogging: true
            };
        default:
            return state;
    }
}

function mailaddress(state = defaultState, action) {
    switch(action.type) {
        case 'SET_MAIL':
            return {
                user: {
                    mailaddress: action.mailaddress,
                    username: state.username,
                    avatar: state.avatar,
                    token: state.token
                }
            };
        default:
            return state;
    }
}

function username(state = defaultState, action) {
    switch(action.type) {
        case 'SET_USERNAME':
            return {
                user: {
                    mailaddress: state.mailaddress,
                    username: action.username,
                    avatar: state.avatar,
                    token: state.token
                }
            };
        default:
            return state;
    }
}

function avatar(state = defaultState, action) {
    switch(action.type) {
        case 'SET_AVATAR':
            return {
                user: {
                    mailaddress: state.mailaddress,
                    username: state.username,
                    avatar: action.avatar,
                    token: state.token
                }
            };
        default:
            return state;
    }
}

function token(state = defaultState, action) {
    switch(action.type) {
        case 'SET_TOKEN':
            return {
                user: {
                    mailaddress: state.mailaddress,
                    username: state.username,
                    avatar: state.avatar,
                    token: action.token
                }
            };
        default:
            return state;
    }
}

function logout(state = defaultState, action) {
    switch (action.type) {
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
}

export default combineReducers({
    user,
    mailaddress,
    username,
    avatar,
    token,
    logout,
})