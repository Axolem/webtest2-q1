import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
} from "@ionic/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const { signIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target;
    try {
      await signIn(email.value, password.value);
      navigate("/home");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <IonPage>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonText color="primary">
                <h1>Login</h1>
              </IonText>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <form onSubmit={handleSubmit}>
              <IonList>
                <IonLabel>
                  <IonText color="primary">
                    <h3>Login Details</h3>
                  </IonText>
                </IonLabel>
                <IonItem>
                  <IonLabel position="stacked">Email:</IonLabel>
                  <IonInput
                    name="email"
                    type="email"
                    autocomplete="email"
                    placeholder="johndoe@gmail.com"
                    required
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Password:</IonLabel>
                  <IonInput
                    name="password"
                    type="password"
                    autocomplete="new-password"
                    required
                    minlength={8}
                  ></IonInput>
                </IonItem>{" "}
              </IonList>
              <IonButton  type="submit">Login</IonButton>
            </form>
          </IonCardContent>
        </IonCard>
        <IonText color="dark">
          <p style={{ textAlign: "center" }}>
           New to compaire price?{" "}
            <Link to="/register">
              <IonText color="primary">Register</IonText>
            </Link>
          </p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};
export default Login;
