import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show, checkWin } from './helpers/helpers';

import './App.css';

const words = [
  'acélszínű',
  'adócsökkentés',
  'adatcsere',
  'abrakostarisznya',
  'ablakfülke',
  'babérfűz',
  'babtermelés',
  'baklövés',
  'balközép',
  'bankutalvány',
  'balsors',
  'cellulózipar',
  'citromlé',
  'combcsonti',
  'családfa',
  'csapadékdús',
  'csavarárú',
  'csapatszellem',
  'cipőkefe',
  'dalmű',
  'darabmunka',
  'diótorta',
  'disznóól',
  'divattervezés',
  'deszkakerítés',
  'derékszög',
  'elemlámpa',
  'előétel',
  'ellenjegyzés',
  'ellenszer',
  'egyszobás',
  'faajtó',
  'fagyasztószekrény',
  'fantáziadús',
  'fedőlemez',
  'fegyőr',
  'fehérbor',
  'gabonabeszolgáltatás',
  'gerelyvetés',
  'golyóstoll',
  'gondolatsor',
  'grillsütő',
  'galambtojás',
  'hagyománytisztelő',
  'hajófűtő',
  'hajhab',
  'hadititok',
  'hadnagy',
  'hadüzenet',
  'idegenforgalom',
  'intézményhálózat',
  'iskolaorvos',
  'iparterület',
  'irodalomelmélet',
  'illatszer',
  'játékbolt',
  'jelmez',
  'játékkártya',
  'jelzőcédula',
  'kacsatojás',
  'katonaidő',
  'kapuszárny',
  'kakasviadal',
  'kabátzseb',
  'labdagyakorlat',
  'labdavezetés',
  'leereszkedik',
  'libamáj',
  'lepényhal',
  'madárfaj',
  'magyarázóerő',
  'matrózsapka',
  'melegház',
  'nadrágszabás',
  'narancseper',
  'napfogyatkozás',
  'napkelet',
  'napközi',
  'orvoskar',
  'operaház',
  'oroszlánszáj',
  'olvasójegy',
  'pajzsmirigyvizsgálat',
  'orvosprofesszor',
  'paradicsompalánta',
  'porckorong',
  'papírpohár',
  'postástáska',
  'radarjel',
  'rendőr',
  'repülőmérnök',
  'rakétabomba',
  'sajtóközlemény',
  'sejtközpont',
  'sarkkör',
  'sorszám',
  'sertéskolbász',
  'tartalékjátékos',
  'találékony',
  'teherkocsi',
  'ujjhegy',
  'utasszám',
  'utcalámpa',
  'vadárvácska',
  'vadaskert',
  'vadhús',
  'vakírás',
  'zebracápa',
  'zenehallgatás',
  'zongorahúr',
  'zsebkendő',
  'zuhanyfüggöny',
  'zöldmezős',
  'zárszerkezet',
];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 250) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
