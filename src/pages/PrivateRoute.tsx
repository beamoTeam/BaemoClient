import React from 'react';
import { Route, Redirect } from 'react-router';
import { useLoginState } from "../lib/recoil/loginState";

interface PrivateRouteProps {
  children: React.ReactNode;
  props: object;
}

export default function PrivateRoute({ children, props }: PrivateRouteProps ) {
  const [isLogin] = useLoginState();

  return (
      <Route
        {...props}
        render={({ location }) =>
           isLogin ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/home",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}
