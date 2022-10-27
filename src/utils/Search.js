import {
  IonButton,
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonList,
  IonRow,
  useIonLoading,
} from "@ionic/react";
import Item from "./Item";
import { useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

const Search = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [present, dismiss] = useIonLoading();

  const search = () => {
    const q = query(collection(db, "shop"));

    onSnapshot(q, (querySnapshot) => {
      const productArr = [];
      querySnapshot.forEach((doc) => {
        const { id } = doc;
        productArr.push({ id, data: doc.data() });
      });
      setData(productArr);
      dismiss();
    });
  };

  return (
    <>
      <IonCard style={{ width: "90%", marginTop: "5px", padding: "5px" }}>
        <IonCardContent>
          <IonRow>
            <IonItem
              style={{ width: "60%", marginLeft: "auto", marginRight: "20px" }}
            >
              <IonInput
                clearInput={true}
                type="search"
                clearOnEdit={true}
                placeholder="What are you shoping for?"
                onIonChange={(e) => setText(e.target.value)}
                value={text}
              />
            </IonItem>
            <IonButton
              style={{ marginRight: "auto" }}
              onClick={() => {
                present({
                  message: "Loading...",
                  duration: 3000,
                  cssClass: "custom-loading",
                });
                search();
              }}
            >
              Search
            </IonButton>
          </IonRow>
        </IonCardContent>
      </IonCard>
      <IonList>
        {data
          ?.filter((item) => {
            return item.data.name.toLowerCase().includes(text.toLowerCase());
          })
          .map((item) => (
            <Item key={item.id} id={item.id} data={item.data} />
          ))}
      </IonList>
    </>
  );
};
export default Search;
