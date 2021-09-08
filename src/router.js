import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './components/HomePage.vue';

Vue.use(Router); 

export default new Router({
    linkExactActiveClass: 'active',
    routes: [
      {
        path: '/',
        name: 'index',
        components: { default:  HomePage},
        props: {
          header: { colorOnScroll: 400 },
          footer: { backgroundColor: 'black' }
        }
      },
    ],
    scrollBehavior: to => {
      if (to.hash) {
        return { selector: to.hash };
      } else {
        return { x: 0, y: 0 };
      }
    }
  });