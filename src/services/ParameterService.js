import Api from '@/services/Api'

export default{
    getAllRoles () { return Api().get('/roles') },
    getAllCountries () { return Api().get('/countries') },
    getAllGenres () { return Api().get('/genres') },
    getAllLanguages () { return Api().get('/languages') },
    getAllSettings () { return Api().get('/settings') },

    saveRole (request) { return Api().post('/role', request)},
    saveCountry (request) { return Api().post('/country', request)},
    saveGenre (request) { return Api().post('/genre', request)},
    saveLanguage (request) { return Api().post('/language', request)},
    saveSetting (request) { return Api().post('/setting', request)},

    deleteRole (id) { return Api().delete('/role/' + id)},
    deleteCountry (id) { return Api().delete('/country/' + id)},
    deleteGenre (id) { return Api().delete('/genre/' + id)},
    deleteLanguage (id) { return Api().delete('/language/' + id)},
    deleteSetting (id) { return Api().delete('/setting/' + id)}
}

