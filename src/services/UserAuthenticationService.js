import Api from '@/services/Api'

export default{
    register (credentials) {
        return Api().post('/register', credentials)
    },
    login (credentials) {
        return Api().post('/login', credentials)
    },
    getAlUsers () {
        return Api().get('/users')
    },
    deleteUser (userID){
        return Api().delete('/user/' + userID)
    }
}

