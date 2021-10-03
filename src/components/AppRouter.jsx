import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Navigation from './Navigation';
import Auth from '../routes/Auth';

const AppRouter = ({ userObj, loggedIn, refreshName }) => {
    return (
        <>
            <BrowserRouter>
                <Navigation userObj={userObj} />
                <Switch>

                    <Route path="/" exact>
                        {loggedIn ? <Home userObj={userObj} loggedIn={loggedIn} /> : <Auth />}
                    </Route>
                    <Route path="/profile" exact>
                        <Profile userObj={userObj} refreshName={refreshName} />
                    </Route>
                </Switch>


            </BrowserRouter>
            <div>
                AppRouter다!
            </div>

        </>
    );
};

export default AppRouter;