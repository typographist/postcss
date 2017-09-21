import { BROWSER_DEFAULT_FONT_SIZE } from '../../constants';

const toPx = val => (
  `${val / BROWSER_DEFAULT_FONT_SIZE}px`
);

export default toPx;
