import axios from 'axios';

export function createRepository(data) {
    return axios({
        url: '/repository/create',
        method: 'post',
        data: data
    })
}

export function getRepositoryList(userId) {
    return axios({
        url: `/repository/list/${userId}`,
        method: 'get'
    })
}

export function deleteRepository(repoId) {
    return axios({
        url: `/repository/delete/${repoId}`,
        method: 'get'
    })
}

export function uploadZip(data, repoId) {
    return axios({
        url: `/repository/upload/${repoId}`,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: data
    })
}

export function analysis(data) {
    return axios({
        url: '/repository/analysis',
        method: 'post',
        data: data
    })
}

export function getRepositoryProject(repoId) {
    return axios({
        url: `/repository/project/${repoId}`,
        method: 'get'
    })
}

export function testExist(data) {
    return axios({
        url: '/repository/testExist',
        method: 'post',
        data: data
    })
}

export function analysisGithubProject(data) {
    return axios({
        url: '/repository/analysisGithubProject',
        method: 'post',
        data: data
    })
}

export function analysisRelease(data) {
    return axios({
        url: '/repository/analysisRelease',
        method: 'post',
        data: data
    })
}

export function getHistoryProjectRes(repoId) {
    return axios({
        url: `/repository/HistoryProjectRes/${repoId}`,
        method: 'get'
    })
}

export function findFitList(data) {
    return axios({
        url: '/repository/findList',
        method: 'post',
        data: data
    })
}

export function downloadRelease(data) {
    return axios({
        url: '/repository/downloadRelease',
        method: 'post',
        data: data
    })
}



