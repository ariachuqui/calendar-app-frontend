import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { PrivateRoute } from "./PrivateRouter";
import { PublicRoute } from "./PublicRouter";

export const AppRouter = () => {
    const { checking, uid } = useSelector(state => state.auth);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if (checking) {
        return <h5>Espere....</h5>;
    }

    return (
        <div>
            <Router>
                <Switch>
                    <PublicRoute 
                        exacto 
                        path="/login" 
                        component={LoginScreen} 
                        isAuthenticated = {!!uid}
                    />

                    <PrivateRoute 
                        exacto 
                        path="/" 
                        component={CalendarScreen} 
                        isAuthenticated = {!!uid}
                    />

                    <Redirect to="/" />
                </Switch>
            </Router>
        </div>
    );
};
