import axios from 'axios'

export function register(data) {
    return axios({
        url: '/login/register',
        method: 'post',
        data: data
    })
}

export function validateMail(token) {
    return axios({
        url: `/login/validate/${token}`,
        method: 'get'
    })
}

export function signIn(data) {
    return axios({
        url: '/login/signIn',
        method: 'post',
        data
    })
}

export function resendMail(data) {
    return axios({
        url: '/login/resend',
        method: 'post',
        data
    })
}

export function getUser(data) {
    return axios({
        url: '/login/current',
        method: 'post',
        data
    })
}

export function getAvatarPath(userId) {
    return axios({
        url: `/login/getAvatarPath/${userId}`,
        method: 'get'
    })
}

export function getUserByUserId(userId) {
    return axios({
        url: `/login/getUserByUserId/${userId}`,
        method: 'get'
    })
}