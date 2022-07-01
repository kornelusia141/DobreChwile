import {
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../auth';
import { firestore } from '../firebase';
import {Chwila, toChwila} from '../model'

interface RouteParams {
  id: string;
}
function formatDate(isoString){
  return new Date(isoString).toLocaleDateString(
    'pl-PL', {day: 'numeric', month: 'short', year:'numeric'
  });
}
const ChwilaPage: React.FC = () => {
  const {userId} = useAuth();
  const {id} = useParams<RouteParams>();
  const [chwila, setChwila] = useState<Chwila>();
  useEffect(()=>{
    const chwilaRef = firestore.collection('users').doc(userId)
    .collection('chwile').doc(id);
    chwilaRef.get().then((doc) => {
          setChwila(toChwila(doc));    
    });
  }, [userId, id]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='toolbarnew' >
          <IonButton fill='clear' color='light' slot="start">
            <IonBackButton/>
          </IonButton>
          <IonTitle color='light'>{chwila?.title} </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color='new' className="ion-padding">
        <IonItem color='new'>
        <img src={chwila?.pictureUrl} alt={chwila?.title}/>
        </IonItem>
        <IonItem color='new'>
        <h2>{chwila?.title}</h2>
        </IonItem>
        <IonItem color='new'>
        <p>{chwila?.description}</p>
        </IonItem>
        <IonItem color='new'>
        <p>{formatDate(chwila?.date)}</p>
        </IonItem>
        <IonItem color='new'>
        <p>{chwila?.address}</p>
        </IonItem>
        <IonButton shape="round" expand = "block" fill="clear" color="toolbarnew" 
        routerLink={`/moje/wpisy/edycja/${chwila?.id}`}
        >Edytuj</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ChwilaPage;
