import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { addCircleOutline, powerOutline, trashOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';
import { firestore } from '../firebase';
import { auth } from '../firebase';
import {Chwila, toChwila} from '../model'
import "../Home.css"

function formatDate(isoString){
  return new Date(isoString).toLocaleDateString(
    'pl-PL', {day: 'numeric', month: 'short', year:'numeric'
  });
}

const HomePage: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const {userId} = useAuth();
  const[chwile, setChwile] = useState<Chwila[]>([]);
  useEffect(() =>{
   const chwileRef = firestore.collection('users').doc(userId)
   .collection('chwile');
   return chwileRef.orderBy('date', 'desc')
   .onSnapshot(({docs}) =>setChwile(docs.map(toChwila)));
  },[userId]);

  const handleDelete =  (id: string) => {
   const chwileRef = firestore.collection('users').doc(userId)
   .collection('chwile');
     chwileRef.doc(id).delete();
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='toolbarnew'>
          <IonTitle color='light'>Home</IonTitle>
          <IonButton slot = "end" shape="round" fill="clear" color="light" routerLink="/moje/wpisy/dodaj">
          <IonIcon slot="icon-only" icon={addCircleOutline} />
          </IonButton>
          <IonButton slot = "end" shape="round" color = "light" fill="clear" onClick={() => setShowAlert(true)} expand="block">
          <IonIcon slot="icon-only" icon={powerOutline} />
          </IonButton>
          <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass='my-custom-class'
          header={'Wyloguj'}
          message={'Czy na pewno chcesz się wylogować?'}
          buttons={[
            {
              text: 'Anuluj',
              role: 'cancel',
              cssClass: 'secondary',
              handler: ()=> {
               
              }
            },
            {
              text: 'OK',
              handler: () => {
                auth.signOut();
              }
            }
          ]}
        />
        </IonToolbar>
      </IonHeader>
      <IonContent color ='new' className="ion-padding">
        <IonList class='label'>
          {chwile.map((chwila) => 
          <IonItem color = 'new' button
          key = {chwila.id}
          >
            <IonThumbnail slot='start'>
              <IonImg src={chwila.pictureUrl}/>
            </IonThumbnail>
            <IonLabel>
            <h3>{chwila.title}</h3>
            <h2>{formatDate(chwila.date)}</h2>
            <h2>{chwila.address}</h2>
            </IonLabel>
            <IonButton slot = "end" shape="round" color="light" routerLink={`/moje/wpisy/widok/${chwila.id}`}>Szczegóły</IonButton>
            <IonButton slot = "end" shape="round" fill="clear" color='dark'
            onClick={(event)=>{ 
              handleDelete(chwila.id)
             // event.preventDefault();
            }}
            >
            <IonIcon slot="icon-only" icon={trashOutline} />
            </IonButton>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
