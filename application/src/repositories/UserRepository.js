import Repository from './Repository'

const resource = '/user'

export default {
    index () {
        return Repository.get(`${resource}`)
    },
    show (id) {
        return Repository.get(`${resource}`)
    },
    create (payload) {
        return Repository.post(`${resource}`, payload)
    },
    update (id) {
        return Repository.put(`${resource}`)
    },
    delete (id) {
        return Repository.delete(`${resource}`)
    },
}
