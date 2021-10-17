import {Route, Switch} from 'react-router-dom';
import Home from '../components/Home/Home';
import React from 'react';
import Detail from '../components/Detail/Detail';

export const HomeRoute = () => {
    return (
        <Switch>
            <Route path="/">
                <Home/>
            </Route>
        </Switch>
    );
}

export const DetailRoute = () => {
    return (
        <Switch>
            <Route path={`/:userName`}>
                <Detail/>
            </Route>
        </Switch>
    );
}