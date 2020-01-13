import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput
} from '@ionic/react';
import { book, build, colorFill, grid } from 'ionicons/icons';
import React, { useState } from 'react';
import './Tab1.css';

const alphabet: { [key: string]: string } = {
  a: '.-',
  b: '-...',
  c: '-.-.',
  d: '-..',
  e: '.',
  f: '..-.',
  g: '--.',
  h: '....',
  i: '..',
  j: '.---',
  k: '-.-',
  l: '.-..',
  m: '--',
  n: '-.',
  o: '---',
  p: '.--.',
  q: '--.-',
  r: '.-.',
  s: '...',
  t: '-',
  u: '..-',
  v: '...-',
  w: '.--',
  x: '-..-',
  y: '-.--',
  z: '--..',
  1: '.----',
  2: '..---',
  3: '...--',
  4: '....-',
  5: '.....',
  6: '-....',
  7: '--...',
  8: '---..',
  9: '----.',
  0: '-----',
};

/*
hello world

hello
. !. . !. . !. .
!...
.
!...
.-..
!...
.-..
!...
---

!.....

world


*/

const POINT_DELAY_MS = 250;
const DASH_DELAY_MS = 750;
const SPACE_DELAY_MS = 500;
const delay = (ms: number): Promise<void> => new Promise(r => setTimeout(r, ms));
// @ts-ignore
const on = () => new Promise((resolve, reject) => window.plugins.flashlight.switchOn(resolve, reject));
// @ts-ignore
const off = () => new Promise((resolve, reject) => window.plugins.flashlight.switchOff(resolve, reject));

const Tab1: React.FC = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  // char: 'd'
  const morse = async (char: string): Promise<void> => {
    // sequence: d -> '-..'
    const sequence: string = alphabet[char];
    for (let i = 0; i < sequence.length; i++) {
      // next: '-'
      const next = sequence[i];
      await on();
      await delay(next === '.' ? POINT_DELAY_MS : DASH_DELAY_MS);
      await off();
      await delay(POINT_DELAY_MS);
    }
  };

  const translate = async (input: string): Promise<void> => {
    setLoading(true);

    // input: 'hello world'
    const words = input.split(' ');
    for (let i = 0; i < words.length; i++) {
      // words[i]: 'hello'
      const word = words[i];
      for (let j = 0; j < word.length; i++) {
        // word[i]: 'h'
        await morse(word[i]);
        await delay(SPACE_DELAY_MS);
      }

      await delay(SPACE_DELAY_MS);
    }

    setLoading(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab One</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard className="welcome-card">
          <img src="/assets/shapes.svg" alt="" />
          <IonCardHeader>
            <IonCardSubtitle>Get Started</IonCardSubtitle>
            <IonCardTitle>Welcome to Ionic</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonInput onInput={event => {
              // @ts-ignore
              setText(event.target.value)
            }
            } />
            <IonButton disabled={loading} onClick={() => translate(text)}>Translate</IonButton>
          </IonCardContent>
        </IonCard>

        <IonList lines="none">
          <IonListHeader>
            <IonLabel>Resources</IonLabel>
          </IonListHeader>
          <IonItem href="https://ionicframework.com/docs/" target="_blank">
            <IonIcon slot="start" color="medium" icon={book} />
            <IonLabel>Ionic Documentation</IonLabel>
          </IonItem>
          <IonItem href="https://ionicframework.com/docs/building/scaffolding" target="_blank">
            <IonIcon slot="start" color="medium" icon={build} />
            <IonLabel>Scaffold Out Your App</IonLabel>
          </IonItem>
          <IonItem href="https://ionicframework.com/docs/layout/structure" target="_blank">
            <IonIcon slot="start" color="medium" icon={grid} />
            <IonLabel>Change Your App Layout</IonLabel>
          </IonItem>
          <IonItem href="https://ionicframework.com/docs/theming/basics" target="_blank">
            <IonIcon slot="start" color="medium" icon={colorFill} />
            <IonLabel>Theme Your App</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
