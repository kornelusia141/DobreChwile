import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { Redirect } from 'react-router';
import {useAuth} from '../auth';
import '../Home.css';
import * as serviceWorker from '../serviceWorker'


const StartPage: React.FC = () => {
const {loggedIn} = useAuth();

navigator.serviceWorker.getRegistrations().then(registrations => {
  console.log("halo" , registrations);
})

  if(loggedIn){
    return <Redirect to="/moje/wpisy"/>;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='toolbarnew'>
          <IonTitle color='light'>Start</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" color='new'>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      <IonLabel class='container'>
        Dobre Chwile
      </IonLabel>
      <br/>
      <br/>
      <IonCard  color="light">
        <div className='card'>
          <br/>
        Dobre Chwile
        <br/>
        <br/>
        </div>
      </IonCard>
      <br/>
      <IonButton shape="round" expand = "block" fill="clear"  routerLink='/logowanie' color='toolbarnew'>
        Start
      </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default StartPage;
