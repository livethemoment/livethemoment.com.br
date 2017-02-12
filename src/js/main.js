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

button.addEventListener('click', () => {
  menu.classList.add('is-open')
  overlay.classList.add('is-open')
})
overlay.addEventListener('click', () => {
  menu.classList.remove('is-open')
  overlay.classList.remove('is-open')
})

let touchstart

document.addEventListener('touchstart', e => {
  touchstart = e.touches[0].clientX
})

document.addEventListener('touchend', e => {
  const touchend = e.changedTouches[0].clientX

  if (touchstart < 20 && touchend > touchstart) {
    button.click()
    return false
  }

  if (touchend < touchstart && menu.classList.contains('is-open')) {
    overlay.click()
  }
})
