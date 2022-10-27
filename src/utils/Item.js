import {
  IonImg,
  IonRow,
  IonCol,
  IonGrid,
  IonItem,
  IonText,
  IonCard,
  IonButton,
  IonCardContent,
} from "@ionic/react";
import { Link } from "react-router-dom";

const Item = ({ data }) => {
  return (
    <IonCard style={{ width: "90%", marginTop: "5px", padding: "5px" }}>
      <IonCardContent>
        <IonItem>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonImg style={{ height: "100px" }} src={data.picture}></IonImg>
              </IonCol>
              <IonCol size={3}>
                <IonText color="success" style={{ marginRight: "20px" }}>
                  <h2>{data.name}</h2>
                </IonText>
              </IonCol>
              <IonCol>
                <IonText>
                  <h2>Incredible Connection</h2>
                </IonText>
                <IonText>
                  <p>R {` ${data.incredibleconnection[0].toFixed(2)}`}</p>
                </IonText>
                <IonText color="tertiary">
                  <a
                    href={data.incredibleconnection[2]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p>View</p>
                  </a>
                </IonText>
              </IonCol>
              <IonCol>
                <IonText>
                  <h2>Take A Lot</h2>
                </IonText>
                <IonText>
                  <p>R {` ${data.takealot[0].toFixed(2)}`}</p>
                </IonText>
                <IonText color="tertiary">
                  <a href={data.takealot[2]} target="_blank" rel="noreferrer">
                    <p>View</p>
                  </a>
                </IonText>
              </IonCol>
              <IonCol>
                <IonText>
                  <h2>EveryShop</h2>
                </IonText>
                <IonText>
                  <p>R {` ${data.everyshop[0].toFixed(2)}`}</p>
                </IonText>
                <IonText color="tertiary">
                  <a href={data.everyshop[2]} target="_blank" rel="noreferrer">
                    <p>View</p>
                  </a>
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonButton>
            <IonText>
              <p>Add to cart</p>
            </IonText>
          </IonButton>
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};
export default Item;
