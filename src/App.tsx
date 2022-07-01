import {
  IonApp, IonLoading,

} from '@ionic/react';
import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import {Route, Redirect, Switch} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AppPrivate from './AppPrivate';
import { AuthContext, useAuthInit } from './auth';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import StartPage from './pages/StartPage';

const App: React.FC = () => {
  const {loading,auth} = useAuthInit();
    if(loading){
    return <IonLoading isOpen/>;
  }
  console.log("id", auth);
  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
      <IonReactRouter>
        <Switch>
        <Route exact path="/start"> 
        <StartPage/>        
          </Route>
        <Route exact path="/logowanie"> 
        <LoginPage/>        
          </Route> 
          <Route exact path="/rejestracja"> 
        <RegisterPage/>        
          </Route>  
          <Route path="/moje">
          <AppPrivate/>
          </Route>
      <Redirect exact path="/" to="/moje/wpisy"/>
          <Route>
            <NotFoundPage/>
          </Route>
      </Switch>
      </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
