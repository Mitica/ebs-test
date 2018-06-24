
var ApiClient = require('../../lib/api/api-client').ApiClient;
var Vue = require('vue');

const APP_EL = document.getElementById('users-app');
const TOKEN = APP_EL.getAttribute('data-token');
const BASE_URL = APP_EL.getAttribute('data-base-url');

const api = new ApiClient({ baseUrl: BASE_URL, token: TOKEN });

var app = new Vue({
    el: '#users-app',
    template: '#users-template',
    data: {
        users: []
    },

    methods: {
        
    },

    watch: {

    }
});

function updateUsers() {
    Vue.nextTick(function () {
        api.users().then(users => {
            app.users = users;
        });
    });
}

updateUsers();
