import Api from '@/services/Api'

export default{
    saveStory (request) {
        return Api().post('/saveStory', request)
    },
    getStories (userID){
        return Api().get('/Stories/' + userID)
    }
}

