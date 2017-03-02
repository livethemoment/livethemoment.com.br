import menuOffcanvas from './components/menu-offcanvas'

/* eslint-disable */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga')

ga('create', 'UA-91765285-1', 'auto')
ga('send', 'pageview')
/* eslint-enable  */

const menu = document.querySelector('.js-menu-offcanvas')
const button = document.querySelector('.js-button-offcanvas')
const overlay = document.querySelector('.js-overlay-offcanvas')

menuOffcanvas({menu, button, overlay})

const getDisqusScript = userName => {
  const script = document.createElement('script')
  script.src = `//${userName}.disqus.com/embed.js`
  script.async = true

  return script
}

let disqusIsLoaded = false

const loadDisqus = userName => container => () => {
  if (disqusIsLoaded) {
    return false
  }

  const viewportHeight = window.innerHeight
  const containerPosition = container.getBoundingClientRect().top
  const containerDistanceToViewport = containerPosition - viewportHeight

  if (containerDistanceToViewport <= viewportHeight) {
    disqusIsLoaded = true
    document.body.appendChild(getDisqusScript(userName))
  }
}

const throttle = (fn, limit) => {
  let wait = false

  return () => {
    if (!wait) {
      fn.call()
      wait = true
      setTimeout(() => {
        wait = false
      }, limit)
    }
  }
}

const disqusContainerNode = document.getElementById('disqus_thread')
const disqus = loadDisqus(window.disqusUsername)(disqusContainerNode)

if (window.disqusUsername) {
  window.addEventListener('scroll', throttle(disqus, 300))
  disqus()
}
