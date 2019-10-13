import Repository from './Repository'

const resource = '/user'

export default {
    index () {
        return Repository.get(`${resource}`)
    },
    show (id) {
        return Repository.get(`${resource}`)
    },
    create () {
        return Repository.post(`${resource}`)
    },
    update (id) {
        return Repository.put(`${resource}`)
    },
    delete (id) {
        return Repository.delete(`${resource}`)
    },
}
