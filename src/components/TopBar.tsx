import { FunctionComponent, useState } from 'react';
import moods from '../lib/moods';
import { reset, load, save } from '../lib/storage';
import { getHunger, getLoneliness, getDirtiness } from '../lib/intervals';

interface TopBarProps {
  setMood: (a: string) => void;
  age: number;
  setBirthTime: (a: number | undefined) => void;
  lastFed: number;
  lastPetted: number;
  lastCleaned: number;
}

const TopBar: FunctionComponent<TopBarProps> = ({
  setMood,
  age,
  setBirthTime,
  lastFed,
  lastCleaned,
  lastPetted,
}) => {
  // set dark mode
  const darkmodeActive = load('darkmode');
  const [darkmodeIcon, setDarkmodeIcon] = useState(darkmodeActive === 1 ? '🌞' : '🌛' || '🌛');
  const handleDarkmodeSwitch = () => {
    const r: HTMLElement = document.querySelector(':root')!;
    if (darkmodeActive === 1) {
      r.style.setProperty('--mainClr', 'hsl(0, 0%, 10%');
      r.style.setProperty('--softClr', 'hsl(0, 0%, 85%');
      r.style.setProperty('--bgClr', 'hsl(0, 0%, 98%');
      setDarkmodeIcon('🌛');
      save('darkmode', 0);
    } else {
      r.style.setProperty('--mainClr', 'hsl(0, 0%, 90%');
      r.style.setProperty('--softClr', 'hsl(0, 0%, 15%');
      r.style.setProperty('--bgClr', 'hsl(0, 0%, 2%');
      setDarkmodeIcon('🌞');
      save('darkmode', 1);
    }
  };
  // set needs levels for ui
  let hungerLevel = [];
  for (let i = 0.0; i < getHunger(lastFed); i++) {
    hungerLevel.push('█');
  }
  let lonelinessLevel = [];
  for (let i = 0.0; i < getLoneliness(lastPetted); i++) {
    lonelinessLevel.push('█');
  }
  let dirtinessLevel = [];
  for (let i = 0.0; i < getDirtiness(lastCleaned); i++) {
    dirtinessLevel.push('█');
  }
  return (
    <div id="topBar">
      <span id="uiContainer">
        <table cellSpacing={0}>
          <tbody>
            <tr>
              <th>Age:&nbsp;</th>
              <td>{(age / 86400).toFixed(1)} days&nbsp;</td>
            </tr>
            <tr>
              <th>Hunger:&nbsp;</th>
              <td>{hungerLevel.join(' ')}</td>
            </tr>
            <tr>
              <th>Loneliness:&nbsp;</th>
              <td>{lonelinessLevel.join(' ')}</td>
            </tr>
            <tr>
              <th>Dirtiness:&nbsp;</th>
              <td>{dirtinessLevel.join(' ')}</td>
            </tr>
          </tbody>
        </table>
      </span>
      <button id="darkmodeSwitch" onClick={() => handleDarkmodeSwitch()}>
        {darkmodeIcon}
      </button>
      <button
        id="resetButton"
        onClick={() => {
          setBirthTime(undefined);
          setMood(moods.unborn);
          reset();
        }}
      >
        RESET
      </button>
    </div>
  );
};

export default TopBar;
