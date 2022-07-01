import {
  IonBackButton,
  IonButton,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../auth';
import { firestore, storage } from '../firebase';
import {CameraResultType, CameraSource, Plugins} from '@capacitor/core'
import { getPlatforms, isPlatform } from '@ionic/core';
import { Geolocation } from '@ionic-native/geolocation';
import Geocode from "react-geocode";
import { Chwila, toChwila } from '../model';
import "../Home.css"
const{Camera} = Plugins; 

async function savePicture(blobUrl, userId){
 const pictureRef = storage.ref(`users/${userId}/pictures/${Date.now()}`)
 const response = await fetch(blobUrl);
 const blob =  await response.blob();
 const snapshot = await pictureRef.put(blob);
 const url = await snapshot.ref.getDownloadURL(); 
 const newMetadata = {
  cacheControl: 'public,max-age=300',
  contentType: 'image/jpeg'
}; 
 await pictureRef.updateMetadata(newMetadata)
  .then((metadata) => {
  })
  .catch((error) => {
  });
 return url;
}
interface RouteParams {
  id: string;
}
const EditChwila: React.FC = () => {
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

const[pictureUrl, setPictureUrl] = useState('');
const [title, setTitle] = useState('');
const[date, setDate] = useState('');
const[description, setDescription] = useState('');
const fileInputRef =  useRef<HTMLInputElement>();
useEffect(() =>{
  setTitle(chwila?.title) 
}, [chwila]);
useEffect(() =>{
  setDescription(chwila?.description) 
}, [chwila]);
useEffect(() =>{
  setAddress(chwila?.address) 
}, [chwila]);
useEffect(() =>{
  setDate(chwila?.date) 
}, [chwila]);
useEffect(() =>{
  setPictureUrl(chwila?.pictureUrl) 
}, [chwila]);
const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
  if (event.target.files.length > 0){
    const file = event.target.files.item(0);
    const pictureUrl = URL.createObjectURL(file);
    setPictureUrl(pictureUrl);
  }
}
const handlePictureClick = async () => {

  if(isPlatform('mobile') || isPlatform('android') || isPlatform('ios')){
    try{
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,  
      source: CameraSource.Prompt,
      });
      console.log("platform: ", getPlatforms());
      setPictureUrl(photo.webPath);
    } catch(error){
      console.log('Błąd: ', error);
    }
  }  else{
    fileInputRef.current.click();
  }

};

const handleUpdate = async () => {
  const chwileRef = firestore.collection('users').doc(userId)
  .collection('chwile').doc(id);
  const chwileData = {address, pictureUrl, date, title, description};
  if(!pictureUrl.startsWith(chwila?.pictureUrl)){
    chwileData.pictureUrl = await savePicture(pictureUrl, userId);
  }
  const chwilaRef = await chwileRef.update(chwileData);
};  
const [geoloading, setGeoloading] = useState<boolean>(false);
const[address, setAddress] = useState<Geocode>('');
Geocode.setLocationType("ROOFTOP");
Geocode.setApiKey("AIzaSyBQtMSnKNY0izuBiVGmxgwbtFDzQ4Ar3Uc");
const getLocation = async () =>{
  setGeoloading(true);
  try{
    const position = await Geolocation.getCurrentPosition();
    await Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setAddress(address);
      },
      (error) => {
        console.error(error);
      }
    );
    setGeoloading(false);

  }catch(e){
    setGeoloading(false);

  }
}
return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='toolbarnew'>
          <IonButton fill='clear' color='light' slot="start">
            <IonBackButton/>
          </IonButton >
          <IonTitle color='light'>Edytuj wpis </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color='new' className="ion-padding">
        <IonList class='label'>
        <IonItem color='new'>
            <IonLabel position ="stacked">Zdjęcie</IonLabel><br/>
          <input type = "file" accept="image/*" hidden ref={fileInputRef}
          onChange={handleFileChange}
          />
          <img src = {pictureUrl} alt="" style={{cursor: 'pointer'}}
          onClick={handlePictureClick} />
          </IonItem>
          <IonItem color='new'>
            <IonLabel position ="stacked">Tytył</IonLabel>
          <IonInput value={title}
          onIonChange={(event) => setTitle(event.detail.value)}/>
          </IonItem>
          <IonItem color='new'>
            <IonLabel position ="stacked">Opis</IonLabel>
          <IonTextarea value={description}
          onIonChange={(event) => setDescription(event.detail.value)}/>
          </IonItem>
          <IonItem color='new'>
            <IonLabel position ="stacked">Data</IonLabel>
          <IonDatetime value={date}
          onIonChange={(event) => setDate(event.detail.value)}/>
          </IonItem>
          <br/>
          <IonLoading isOpen={geoloading}
          message ={"Pobieram lokalizacje..."}
          onDidDismiss={() => setGeoloading(false)}></IonLoading>
          <IonButton shape="round" expand = "block" fill="clear" color="toolbarnew" onClick={getLocation}>Lokalizacja</IonButton>
          <IonItem color='new'>
            <IonLabel>
              {address}
          </IonLabel>
          </IonItem>
          <br/>
          <IonButton routerLink={`/moje/wpisy/`} expand='block' color='toolbarnew' onClick={handleUpdate}>Zapisz</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default EditChwila;
