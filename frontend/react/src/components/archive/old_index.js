import { test, testImage, testGif} from '../../testJS.js'
import SubmitButton from './components/SubmitButton.js';
import ExitButton from './components/ExitButton.js';
import './assets/css/index.css'
import './assets/scss/_index.scss'


test();
testImage()
testGif();
// testGif();

const submitButton = new SubmitButton();
submitButton.render();

const exitButton = new ExitButton();
exitButton.render();


  
