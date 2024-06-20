import Api from '@/services/Api'

export default{
    saveStory (request) {
        return Api().post('/saveStory', request)
    },
    getStories (userID){
        return Api().get('/Stories/' + userID)
    },
    saveStoryVersion (request){
        return Api().post('/StoryVersion', request)
    },
    deleteStoryVersion (id){
        return Api().delete('/StoryVersion/' + id)
    }
}

