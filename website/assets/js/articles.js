
var ApiClient = require('../../lib/api/api-client').ApiClient;
var Vue = require('vue');

const APP_EL = document.getElementById('articles-app');
const TOKEN = APP_EL.getAttribute('data-token');
const BASE_URL = APP_EL.getAttribute('data-base-url');

const api = new ApiClient({ baseUrl: BASE_URL, token: TOKEN });

var app = new Vue({
    el: '#articles-app',
    template: '#articles-template',
    data: {
        articles: [],
        newArticle: {
            title: '',
            body: '',
        }
    },

    methods: {
        vote: function (article, type) {
            api.voteArticle({ articleId: article.id, type: type }).then(result => {
                article.countUpVotes = result.counts.countUpVotes;
                article.countDownVotes = result.counts.countDownVotes;
            })
        },
        create: function (event) {
            event.preventDefault();
            if (!this.newArticle.title || !this.newArticle.body) {
                return;
            }
            api.createArticle(this.newArticle).then(result => {
                this.newArticle = { title: '', body: '' };
                updateArticles();
            })

            return false;
        }
    },

    watch: {

    }
});

function updateArticles() {
    Vue.nextTick(function () {
        api.articles().then(articles => {
            app.articles = articles;
        });
    });
}

updateArticles();
