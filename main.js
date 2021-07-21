const micButton = document.querySelector('.mic-button')
const modal = document.querySelector('.modal-overlay')
const contentModal = document.querySelector('.modal')
const buttonCloseModal = document.querySelector('.close')
const modalMic = document.querySelector('.modal-mic')
const text = document.querySelector('.text-modal')
const searchInput = document.querySelector('#search-input')

const Modal = {
  open() {
    modal.classList.add('active')
    contentModal.classList.add('active')
  },
  close() {
    contentModal.classList.remove('active')
    setTimeout(() => {
      modal.classList.remove('active')
    }, 250)
  }
}

const recognition = createRecognition()

function createRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition
  const recognition =
    SpeechRecognition !== undefined ? new SpeechRecognition() : null
  if (!recognition) {
    text.innerHTML = 'Este sistema não possui suporte para isso!'
    return null
  }

  recognition.lang = 'pt_BR'

  recognition.onstart = () => console.log('started')
  recognition.onend = () => console.log('finished')
  recognition.onerror = e => console.log('error', e)
  recognition.onresult = event =>
    (text.innerHTML = event.results[0][0].transcript)

  return recognition
}

micButton.addEventListener('click', event => {
  if (!recognition) {
    return
  }
  text.innerHTML = ''
  Modal.open()
  recognition.start()
})

modalMic.addEventListener('click', event => {
  recognition.stop()
})

buttonCloseModal.addEventListener('click', event => {
  recognition.stop()

  if (text.innerHTML != '') {
    searchInput.value = text.innerHTML
  }
  text.innerHTML = ''
  Modal.close()
})
