import Avatar from './assets/images/Avatar.png'
import download from './assets/images/download.gif'

export  function test() {
  console.log('test')
}

debugger
export  function testImage() { 
  const img = document.createElement('img')
  img.width = '300'
  img.alt = 'avatar pic'
  img.src = Avatar
  const body = document.querySelector('body')
  body.appendChild(img)
}

export  function testGif() { 
  const img = document.createElement('img')
  img.width = '300'
  img.alt = 'avatar pic'
  img.src = download
  const body = document.querySelector('body')
  body.appendChild(img)
}