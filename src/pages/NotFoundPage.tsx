import {
  IonContent,
  IonPage,
} from '@ionic/react';
import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent color='new' className="ion-padding">
        Strona nie została znaleziona. 
      </IonContent>
    </IonPage>
  );
};

export default NotFoundPage;
