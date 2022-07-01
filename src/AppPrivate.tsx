import {
IonRouterOutlet, 
} from '@ionic/react';
import HomePage from './pages/HomePage';
import ChwilaPage from './pages/ChwilaPage';
import {Route, Redirect} from 'react-router-dom';
import React from 'react';
import { useAuth } from './auth';
import AddChwila from './pages/AddChwila';
import EditChwila from './pages/EditChwila';

const AppPrivate: React.FC = () => {  
const {loggedIn} = useAuth();
  if(!loggedIn){
  return <Redirect to="/start" />;
}
  return (
        <IonRouterOutlet> 
      <Route exact path="/moje/wpisy">
        <HomePage/>
      </Route>
      <Route exact path="/moje/wpisy/dodaj">
        <AddChwila/>
      </Route>
      <Route exact path="/moje/wpisy/widok/:id">
        <ChwilaPage/>
      </Route>
      <Route exact path="/moje/wpisy/edycja/:id">
        <EditChwila/>
      </Route>
      </IonRouterOutlet>
  );
};

export default AppPrivate;
