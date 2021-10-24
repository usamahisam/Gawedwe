import { App } from './lib/core.js';
import HalamanAwal from './src/halamanawal.js';
import Chord from './src/chord.js';
import AnimateFrame from './components/animate.js';

App.mainActivity({
	halamanawal: HalamanAwal,
	chord: Chord,
});
App.navigate('halamanawal', {}, AnimateFrame);