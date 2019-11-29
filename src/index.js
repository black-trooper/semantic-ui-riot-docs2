import prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import './common.css'
import 'semantic-ui-riot'

import app from '../tags/app.riot'
import ContentHeader from '../tags/content-header.riot'
import ContentNavigation from '../tags/content-navigation.riot'
import SectionHeader from '../tags/section-header.riot'

riot.register('app', app)
riot.register('content-header', ContentHeader)
riot.register('content-navigation', ContentNavigation)
riot.register('section-header', SectionHeader)

riot.mount('app')

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAVTZ-XoXjQt2bQgBvsoUuVeTs33c2C-HE",
  authDomain: "semantic-ui-riot.web.app",
  databaseURL: "https://semantic-ui-riot.firebaseio.com",
  projectId: "semantic-ui-riot",
  storageBucket: "semantic-ui-riot.appspot.com",
  messagingSenderId: "515322128942"
};
firebase.initializeApp(config);

riot.install(function (component) {
  const { onMounted } = component

  component.onMounted = (props, state) => {
    onMounted.apply(component, [props, state])

    prism.highlightAll()
  }

  component.toggleExample = event => {
    const childs = event.target.parentElement.parentElement.childNodes
    const segments = Array.from(childs).filter(element => element.classList && element.classList.contains('segment'))
    if (segments[2].classList.contains('hidden')) {
      segments[1].classList.remove('bottom')
      segments[2].classList.remove('hidden')
    } else {
      segments[1].classList.remove('attached')
      segments[1].classList.add('bottom')
      segments[1].classList.add('attached')
      segments[2].classList.add('hidden')
    }
  }

  component.extractNavigation = element => {
    let navigation = []
    let section
    element.querySelectorAll('h2, h3').forEach(item => {
      if (item.tagName.toLowerCase() == 'h2') {
        if (section) {
          navigation.push(section)
        }
        section = {}
        section.header = item.innerText
        section.items = []
      } else {
        section.items.push(item.innerText)
      }
    })
    navigation.push(section)
    return navigation
  }

  component.kebab = target => {
    return target.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()
  }
})
