export default ({menu, button, overlay}) => {
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
}
