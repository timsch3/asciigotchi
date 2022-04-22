import React, { FunctionComponent, useState, useEffect } from 'react';
import moods from '../lib/moods';
import { reset, load, save } from '../lib/storage';
import { Hunger, Loneliness, Dirtiness } from '../lib/intervals';

interface TopBarProps {
  setBirthTime: (a: number | undefined) => void;
  setMood: (a: string) => void;
  mood: string;
  age: number;
  lastFed: number;
  lastPetted: number;
  lastCleaned: number;
}

const TopBar: FunctionComponent<TopBarProps> = ({
  setBirthTime,
  setMood,
  mood,
  age,
  lastFed,
  lastCleaned,
  lastPetted,
}) => {
  // dark mode
  const [darkmodeIcon, setDarkmodeIcon] = useState(load('darkmode') === 1 ? '🌞' : '🌛' || '🌛');
  const handleDarkmodeSwitch = () => {
    return (event: React.MouseEvent) => (load('darkmode') === 1 ? setLightTheme() : setDarkTheme());
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
    load('darkmode') === 1 ? setDarkTheme() : setLightTheme(); // initially load darkmode setting
  }, []);
  // reset pet
  const handleReset = () => {
    return (event: React.MouseEvent) => {
      if (window.confirm('Are you sure you want to reset your asciigotchi?')) {
        setBirthTime(undefined);
        setMood(moods.unborn);
        reset();
      }
    };
  };
  if (mood === moods.unborn || mood === moods.hatching) {
    return <div id="topBar"></div>;
  } else {
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
                <td>
                  <div
                    id="hungerIndicator"
                    style={{ width: `${Hunger.getAmount(lastFed)}%` }}
                  ></div>
                </td>
              </tr>
              <tr>
                <th>Loneliness:&nbsp;</th>
                <td>
                  <div
                    id="lonelinessIndicator"
                    style={{ width: `${Loneliness.getAmount(lastPetted)}%` }}
                  ></div>
                </td>
              </tr>
              <tr>
                <th>Dirtiness:&nbsp;</th>
                <td>
                  <div
                    id="dirtinessIndicator"
                    style={{ width: `${Dirtiness.getAmount(lastCleaned)}%` }}
                  ></div>
                </td>
              </tr>
            </tbody>
          </table>
        </span>
        <button id="darkmodeSwitch" onClick={handleDarkmodeSwitch()}>
          {darkmodeIcon}
        </button>
        <button id="resetButton" onClick={handleReset()}>
          RESET
        </button>
      </div>
    );
  }
};

export default TopBar;
