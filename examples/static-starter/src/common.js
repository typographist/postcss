import 'babel-polyfill';
import RhythmToggleButton from 'typographist-static-devtools';
import 'typographist-static-devtools/devtools.css';
import { IS_DEVELOPMENT } from '../tools/constants';
import './styles/main.css';

if (IS_DEVELOPMENT) {
  const button = new RhythmToggleButton();
  button.addTo('#root');
}
