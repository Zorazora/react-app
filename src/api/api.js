import axios from 'axios'

export function test() {
    return axios.get('/task/try')
}

export function save(data) {
    console.log(data)
    return axios.post('/task/save', data)
}

export function create(name) {
    return axios.get(`/task/${name}`)
}