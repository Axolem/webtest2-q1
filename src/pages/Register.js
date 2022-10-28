import {
  IonText,
  IonFab,
  IonCard,
  IonPage,
  IonList,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonContent,
  IonFabButton,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
} from "@ionic/react";
import { db } from "../firebase";
import { camera } from "ionicons/icons";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Geolocation } from "@capacitor/geolocation";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import jsSHA from "jssha";

const Register = () => {
  const nameHash = new jsSHA("SHA-512", "TEXT", {
    numRounds: 1,
    encoding: "UTF8",
  });
  const cvvHash = new jsSHA("SHA-512", "BYTES", {
    numRounds: 1,
    encoding: "UTF8",
  });

  const { createUser } = UserAuth();
  const navigate = useNavigate();
  const [image, setImage] = useState({});
  const [location, setLocation] = useState({});

  const handleSubmit = async (event) => {
    printCurrentPosition();
    event.preventDefault();
    const {
      cvv,
      name,
      email,
      phone,
      cardno,
      surname,
      expdate,
      address,
      password,
      cardname,
      cpassword,
    } = event.target;

    if (password.value !== cpassword.value)
      return alert("Passwords do not match");

    if (image.length < 200) return alert("Please take a picture of yourself");

    if (cardno.value.length !== 16) return alert("Ivalid card number");

    //Hashing CVV and Name on Card
    nameHash.update(cardname.value);
    const newName = nameHash.getHash("HEX");
    cvvHash.update(cvv.value);
    const newCvv = cvvHash.getHash("HEX");

    //Hashing Card numbers
    const newCardNo = `${cardno.value.substring(
      0,
      4
    )}########${cardno.value.substring(12)}`;

    try {
      const { user } = await createUser(email.value, password.value);
      const { uid } = user;
      await setDoc(doc(db, "users", uid), {
        name: name.value,
        surname: surname.value,
        email: email.value,
        address: address.value,
        phone: phone.value,
        image: image.base64String,
        location,
        card: {
          name: newName,
          number: newCardNo,
          exp: expdate.value,
          cvv: newCvv,
        },
      });
      navigate("/home");
    } catch (error) {
      alert(error);
    }
  };

  const printCurrentPosition = async () => {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = coordinates.coords;
      setLocation({ latitude, longitude });
    } catch (e) {
      alert(e);
    }
  };

  const PersonalDetails = () => {
    return (
      <IonList>
        <IonLabel>
          <IonText color="primary">
            <h3>Personal Details</h3>
          </IonText>
        </IonLabel>
        <IonItem>
          <IonLabel position="floating">Name:</IonLabel>
          <IonInput
            name="name"
            required
            inputmode="text"
            autocomplete="given-name"
            type="text"
            placeholder="John"
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Surname:</IonLabel>
          <IonInput
            name="surname"
            required
            inputmode="text"
            autocomplete="family-name"
            type="text"
            placeholder="Doe"
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Cellphone:</IonLabel>
          <IonInput
            name="phone"
            required
            inputmode="tel"
            autocomplete="tel"
            type="tel"
            placeholder="061 234 5678"
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Address:</IonLabel>
          <IonInput
            name="address"
            required
            inputmode="text"
            autocomplete="street-address"
            type="address"
            placeholder="1 bunting road, johunnesburg 2078"
          ></IonInput>
        </IonItem>
      </IonList>
    );
  };

  const CardDetails = () => {
    return (
      <IonList>
        <IonLabel>
          <IonText color="primary">
            <h3>Card Details</h3>
          </IonText>
        </IonLabel>
        <IonItem>
          <IonLabel position="stacked">Name on card:</IonLabel>
          <IonInput
            name="cardname"
            type="text"
            autocomplete="name"
            required
            placeholder="John Doe"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Card Number</IonLabel>
          <IonInput
            name="cardno"
            type="number"
            required
            autocomplete="cc-name"
            inputmode="numeric"
            placeholder="5995 5568 5584 5586"
            maxlength={16}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Expiry Date</IonLabel>
          <IonInput
            name="expdate"
            size={3}
            type="numeric"
            autocomplete="cc-exp"
            required
            placeholder="05/23"
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">CVV</IonLabel>
          <IonInput
            name="cvv"
            size={3}
            type="number"
            autocomplete="cc-csc"
            inputmode="numeric"
            placeholder="***"
            maxlength={3}
            required
            minlength={3}
          ></IonInput>
        </IonItem>
      </IonList>
    );
  };

  const LoginDetails = () => {
    return (
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
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Confirm Password:</IonLabel>
          <IonInput
            name="cpassword"
            size={3}
            type="password"
            autocomplete="new-password"
            required
            minlength={8}
          ></IonInput>
        </IonItem>
      </IonList>
    );
  };

  const takePhoto = async () => {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    });
    return setImage(cameraPhoto);
  };

  return (
    <IonPage>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonText color="primary">
                <h1>Register</h1>
              </IonText>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonFab vertical="top" horizontal="end" slot="fixed">
              <IonFabButton onClick={() => takePhoto()}>
                <img
                  src={`data:image/jpeg;base64,${image.base64String}`}
                  alt="Attachement"
                />
                <IonIcon icon={camera}></IonIcon>
              </IonFabButton>
            </IonFab>
            <form onSubmit={handleSubmit}>
              <PersonalDetails />
              <br />
              <CardDetails />
              <br />
              <LoginDetails />
              <IonButton type="submit">Register</IonButton>
            </form>
          </IonCardContent>
        </IonCard>
        <IonText color="dark">
          <p style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/">
              <IonText color="primary">Login</IonText>
            </Link>
          </p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};
export default Register;
