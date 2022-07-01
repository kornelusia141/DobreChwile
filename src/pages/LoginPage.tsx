import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import {useAuth} from '../auth'
import {auth} from '../firebase'
import "../Home.css"


const LoginPage: React.FC = () => {
const {loggedIn} = useAuth();
const [email, setEmail] = useState('');
const[password, setPassword] = useState('');
const[status, setStatus] = useState({loading: false, error: false});

const handleLogin = async () => {
  try{
  setStatus({loading: true, error: false});
  const credential = await auth.signInWithEmailAndPassword(email, password);
  console.log("credential:", credential);
  }catch(error){
    setStatus({loading: false, error: true});
    console.log("błąd:", error);
  }
};
  if(loggedIn){
    return <Redirect to="/moje/wpisy"/>;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='toolbarnew'>
          <IonTitle color='light'>Logowanie</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" color='new'>
       <IonList class='label'>
         <IonItem color='new'>
           <IonLabel position="stacked">Email</IonLabel>
           <IonInput type="email" value={email}
           onIonChange={(event) => setEmail(event.detail.value)}
           ></IonInput>
         </IonItem>
         <IonItem color='new'>
           <IonLabel position="stacked">Hasło</IonLabel>
           <IonInput type="password" value={password}
           onIonChange={(event) => setPassword(event.detail.value)}
            ></IonInput>
         </IonItem>
       </IonList>
       {status.error &&
       <IonText color="danger">Nieprawidłowe dane</IonText>
       }
       <IonButton color = 'toolbarnew' expand="block" onClick={handleLogin}>Zaloguj się</IonButton>
       <div className='ion-text-center'>
       <br/>albo<br/><br/></div>
       <IonButton expand="block" fill="clear" routerLink='/rejestracja' color='toolbarnew'>
         Zarejestruj się
       </IonButton>
      <IonLoading isOpen = {status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
