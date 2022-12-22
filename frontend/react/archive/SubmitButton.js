class SubmitButton {
  render() {
    const button = document.createElement('button')
    button.innerHTML = "Submit"
    button.classList.add('submit-button')
    button.onclick = function() {
      const paragraph = document.createElement('p')
      paragraph.innerHTML = 'test clicked'
      body?.appendChild(paragraph)

    }
    const body = document.querySelector('body')
    body.appendChild(button)
  }
}

export default SubmitButton


