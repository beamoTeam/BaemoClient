import React from 'react';
import { Redirect } from 'react-router';
import { IonRouterOutlet } from '@ionic/react';
import { useLoginState } from "../lib/recoil/loginState";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps ) {
  const [isLogin] = useLoginState();

  if (!isLogin) {
    return <Redirect to="/home" />;
  }

  return <IonRouterOutlet />;
}
