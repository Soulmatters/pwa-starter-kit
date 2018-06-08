import { PolymerElement, html } from '@polymer/polymer';
import '../image-loader'
import template from './template.html';
import '@polymer/iron-image/iron-image.js';
import '@polymer/marked-element/marked-element.js';
import style from './theme.styl'
import { SharedStyles } from './../shared-styles'
import '../user-box';
import moment from 'moment';
import 'moment/locale/ro.js';
import '../comment-box'
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installRouter } from 'pwa-helpers/router.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { config } from '../../config'
import { store } from '../../store.js';
import { navigate, updateOffline, updateDrawerState, updateLayout, setProductId } from '../../actions/app.js';

export class  MainBlog extends connect(store)(PolymerElement)  {
    static get properties() {
        return {
            slug: {
                type: String,
                notify: true,
                observer: '_getArticle'
            },
            article: {
                type: Object,
                value: () => []
            }
         };
    }

    constructor() {
        super();
    }
    _stateChanged(state) {}
    static get template() {
        return   html([`<style>${style}</style> ${template}`]);
    }
 async  _getArticle(post){
     const loading = {
        
     }
     this.set('article', loading)
     const blog = await fetch(`${config.url}/posts/?_embed&slug=${post}`).then(data => data.json())
          console.log(blog)
          this.article = blog[0]
  
        console.log(post, 'fsdoapsdop')
       
    }
    ready() {
        super.ready();
       this._getArticle(this.slug);
       this.addEventListener('comment-approved', (e) => this._getArticle(this.slug))
    }
    date(date){
        moment.locale('ro');

        return moment(date).format("Do MMMM, YYYY")
    }

}
window.customElements.define('main-blog', MainBlog);