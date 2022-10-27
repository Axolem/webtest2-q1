import { IonList } from "@ionic/react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Item from "./Item";

const AllProducts = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const q = query(collection(db, "shop"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const productArr = [];
      querySnapshot.forEach((doc) => {
        const { id } = doc;
        productArr.push({ id, data: doc.data() });
      });
      setData(productArr);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <IonList>
      {data?.map((item) => (
        <Item key={item.id} id={item.id} data={item.data} />
      ))}
    </IonList>
  );
};
export default AllProducts;
