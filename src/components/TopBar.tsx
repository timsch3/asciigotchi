import React, { FunctionComponent, useState, useEffect } from 'react';
import moods from '../lib/moods';
import { reset, load, save } from '../lib/storage';
import { Hunger, Loneliness, Dirtiness } from '../lib/intervals';
import { ReactComponent as IconNight } from './icons/night.svg';
import { ReactComponent as IconDay } from './icons/day.svg';
import { ReactComponent as IconReset } from './icons/reset.svg';
import { ReactComponent as IconAge } from './icons/age.svg';
import { ReactComponent as IconHunger } from './icons/hunger.svg';
import { ReactComponent as IconLoneliness } from './icons/loneliness.svg';

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
  const [darkmodeIcon, setDarkmodeIcon] = useState(
    load('darkmode') === 1 ? <IconDay /> : <IconNight /> || <IconNight />
  );
  const handleDarkmodeSwitch = () => {
    return (event: React.MouseEvent) => (load('darkmode') === 1 ? setLightTheme() : setDarkTheme());
  };
  const setLightTheme = () => {
    const r: HTMLElement = document.querySelector(':root')!;
    r.style.setProperty('--mainClr', 'hsl(0, 0%, 10%');
    r.style.setProperty('--softClr', 'hsl(0, 0%, 85%');
    r.style.setProperty('--bgClr', 'hsl(0, 0%, 98%');
    setDarkmodeIcon(<IconNight />);
    save('darkmode', 0);
  };
  const setDarkTheme = () => {
    const r: HTMLElement = document.querySelector(':root')!;
    r.style.setProperty('--mainClr', 'hsl(0, 0%, 90%');
    r.style.setProperty('--softClr', 'hsl(0, 0%, 20%');
    r.style.setProperty('--bgClr', 'hsl(0, 0%, 2%');
    setDarkmodeIcon(<IconDay stroke="var(--mainClr)" />);
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
          <div className="uiItem">
            <IconAge />
            <div>{(age / 86400).toFixed(1)}</div>
          </div>
          <div className="uiItem">
            <IconHunger />
            <div id="hungerIndicator" style={{ width: `${Hunger.getAmount(lastFed)}%` }}></div>
          </div>
          <div className="uiItem">
            <IconLoneliness />
            <div
              id="lonelinessIndicator"
              style={{ width: `${Loneliness.getAmount(lastPetted)}%` }}
            ></div>
          </div>
          <div className="uiItem">
            <IconHunger />
            <div
              id="dirtinessIndicator"
              style={{ width: `${Dirtiness.getAmount(lastCleaned)}%` }}
            ></div>
          </div>
        </span>
        <button id="darkmodeSwitch" onClick={handleDarkmodeSwitch()}>
          {darkmodeIcon}
        </button>
        <button id="resetButton" onClick={handleReset()}>
          <IconReset />
        </button>
      </div>
    );
  }
};

export default TopBar;
