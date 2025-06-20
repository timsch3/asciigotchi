import './App.css';
import { useState, useEffect, useCallback } from 'react';
import ActionsMenu from './components/ActionsMenu';
import Pet from './components/Pet';
import moods from './lib/moods';
import {
  getNow,
  Hunger,
  Loneliness,
  Dirtiness,
  getIsSick,
  getIsDead,
  intervals,
} from './lib/intervals';
import { save, load } from './lib/storage';
import { useElapsedTime } from 'use-elapsed-time';
import TopBar from './components/TopBar';

function App() {
  const [birthTime, setBirthTime] = useState(load('birthTime'));
  const [age, setAge] = useState(0);
  const [mood, setMood] = useState(moods.unborn);
  const [sleepiness, setSleepiness] = useState(load('sleepiness') || 0);
  const [lightsOff, setLightsOff] = useState(false);
  const [justReceived, setJustReceived] = useState(false);

  const [lastFed, setLastFed] = useState(load('lastFed') || getNow());
  const [lastPetted, setLastPetted] = useState(load('lastPetted') || getNow());
  const [lastCleaned, setLastCleaned] = useState(load('lastCleaned') || getNow());
  const [lastHealthy, setLastHealthy] = useState(load('lastHealthy') || getNow());

  const trackAge = useCallback(() => {
    if (mood !== moods.dead) setAge(getNow() - birthTime!);
  }, [mood, birthTime]);

  const setCurrentMood = useCallback(() => {
    if (justReceived) return;
    // set mood based on need levels
    setMood(moods.happy);
    if (Hunger.needsFulfilment(lastFed)) {
      setMood(moods.hungry);
      if (Loneliness.needsFulfilment(lastPetted) && Dirtiness.needsFulfilment(lastFed))
        setMood(moods.hungryLonelyAndDirty);
      else if (Loneliness.needsFulfilment(lastPetted)) setMood(moods.hungryAndLonely);
      else if (Dirtiness.needsFulfilment(lastCleaned)) setMood(moods.hungryAndDirty);
    } else if (sleepiness > intervals.sleepiness) setMood(moods.tired);
    else if (Loneliness.needsFulfilment(lastPetted)) {
      setMood(moods.lonely);
      if (Dirtiness.needsFulfilment(lastCleaned)) setMood(moods.lonelyAndDirty);
    } else if (Dirtiness.needsFulfilment(lastCleaned)) {
      setMood(moods.dirty);
    } else if (lightsOff) setMood(moods.sleeping);
    // check if healthy or dead
    getIsSick(lastFed, lastPetted, lastCleaned) ? setMood(moods.sick) : setLastHealthy(getNow());
    sleepiness > intervals.sleepiness * 2 ? setMood(moods.sick) : setLastHealthy(getNow());
    if (getIsDead(lastHealthy) || Math.round(age / 86400) > 365) setMood(moods.dead);
  }, [age, justReceived, lastCleaned, lastFed, lastHealthy, lastPetted]);

  const saveStates = useCallback(() => {
    save('lastFed', lastFed);
    save('lastPetted', lastPetted);
    save('lastCleaned', lastCleaned);
    save('lastHealthy', lastHealthy);
    save('sleepiness', sleepiness);
  }, [lastFed, lastPetted, lastCleaned, lastHealthy]);

  // use to trigger useEffect every second
  const { elapsedTime } = useElapsedTime({
    isPlaying: true,
    updateInterval: 1,
  });

  useEffect(() => {
    if (birthTime === undefined || getIsDead(lastHealthy)) return;
    trackAge();
    setCurrentMood();
    lightsOff ? setSleepiness(sleepiness - 3) : setSleepiness(sleepiness + 1);
    saveStates();
  }, [elapsedTime, birthTime, lastHealthy, trackAge, setCurrentMood, saveStates]);

  return (
    <div className="App">
      <TopBar
        mood={mood}
        setBirthTime={setBirthTime}
        setMood={setMood}
        setLightsOff={setLightsOff}
        sleepiness={sleepiness}
        age={age}
        lastFed={lastFed}
        lastPetted={lastPetted}
        lastCleaned={lastCleaned}
      />
      <Pet
        mood={mood}
        setJustReceived={setJustReceived}
        lightsOff={lightsOff}
        age={age}
        lastHealthy={lastHealthy}
      />
      <ActionsMenu
        mood={mood}
        setBirthTime={setBirthTime}
        lastHealthy={lastHealthy}
        setJustReceived={setJustReceived}
        justReceived={justReceived}
        setMood={setMood}
        setLastFed={setLastFed}
        setLastPetted={setLastPetted}
        setLastCleaned={setLastCleaned}
        setLastHealthy={setLastHealthy}
      />
    </div>
  );
}

export default App;
