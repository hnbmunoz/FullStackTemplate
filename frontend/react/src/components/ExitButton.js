class ExitButton {
  exitButtonClass = 'exit-button'
  render() {
    const button = document.createElement('button')
    button.innerHTML = "Exit"
    button.classList.add(this.exitButtonClass)
    button.onclick = function() {
      const paragraph = document.createElement('p')
      paragraph.innerHTML = 'form exit'
      body?.appendChild(paragraph)

    }
    const body = document.querySelector('body')
    body.appendChild(button)
  }
}

export default ExitButton