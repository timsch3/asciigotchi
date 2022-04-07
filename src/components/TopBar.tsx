import { FunctionComponent, useState, useEffect } from 'react';
import moods from '../lib/moods';
import { reset, load, save } from '../lib/storage';
import { getHunger, getLoneliness, getDirtiness } from '../lib/intervals';

interface TopBarProps {
  birthTime: number | undefined;
  setBirthTime: (a: number | undefined) => void;
  setMood: (a: string) => void;
  age: number;
  lastFed: number;
  lastPetted: number;
  lastCleaned: number;
}

const TopBar: FunctionComponent<TopBarProps> = ({
  birthTime,
  setBirthTime,
  setMood,
  age,
  lastFed,
  lastCleaned,
  lastPetted,
}) => {
  // dark mode
  const [darkmodeIcon, setDarkmodeIcon] = useState(load('darkmode') === 1 ? '🌞' : '🌛' || '🌛');
  const handleDarkmode = () => {
    load('darkmode') === 1 ? setLightTheme() : setDarkTheme();
  };
  const setLightTheme = () => {
    const r: HTMLElement = document.querySelector(':root')!;
    r.style.setProperty('--mainClr', 'hsl(0, 0%, 10%');
    r.style.setProperty('--softClr', 'hsl(0, 0%, 85%');
    r.style.setProperty('--bgClr', 'hsl(0, 0%, 98%');
    setDarkmodeIcon('🌛');
    save('darkmode', 0);
  };
  const setDarkTheme = () => {
    const r: HTMLElement = document.querySelector(':root')!;
    r.style.setProperty('--mainClr', 'hsl(0, 0%, 90%');
    r.style.setProperty('--softClr', 'hsl(0, 0%, 20%');
    r.style.setProperty('--bgClr', 'hsl(0, 0%, 2%');
    setDarkmodeIcon('🌞');
    save('darkmode', 1);
  };
  useEffect(() => {
    handleDarkmode();
  }, []);
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
  // reset pet
  const handleReset = () => {
    if (window.confirm('Do you really want to reset your asciigotchi?')) {
      setBirthTime(undefined);
      setMood(moods.unborn);
      reset();
    }
  };
  if (birthTime !== undefined) {
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
        <button id="darkmodeSwitch" onClick={() => handleDarkmode()}>
          {darkmodeIcon}
        </button>
        <button
          id="resetButton"
          onClick={() => {
            handleReset();
          }}
        >
          RESET
        </button>
      </div>
    );
  } else {
    return <div id="topBar"></div>;
  }
};

export default TopBar;
