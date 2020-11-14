import Vue from 'vue'
import App from './App.vue'
import 'bulma/css/bulma.css'
//let multer = require('multer');
//let upload = multer({dest:'./src/temp'});
//require('./routes/routes')(app);
//import Parser from './reader/pdfparser'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
