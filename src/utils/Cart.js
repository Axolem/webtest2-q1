import { clear } from "../context/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { cartTotalSelector } from "../context/selectors";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonImg,
  IonText,
} from "@ionic/react";
import DataTable from "react-data-table-component";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";

const columns = [
  {
    name: "Img",
    selector: (row) => <IonImg style={{ height: "100px" }} src={row.image} />,
  },
  {
    name: "Title",
    selector: (row) => row.title,
  },
  {
    name: "Quantity",
    selector: (row) => row.quantity,
  },
  {
    name: "Price",
    selector: (row) => row.price,
  },
];

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { user } = UserAuth();

  const handleClick = async () => {
    try {
      await setDoc(doc(db, "orders", user.uid), {
        cart,
        time: serverTimestamp(),
      });
      alert("Saved successfully");
      return dispatch(clear());
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <IonCard style={{ width: "80%" }}>
        <IonCardContent>
          <DataTable columns={columns} data={cart} />
        </IonCardContent>
      </IonCard>
      <IonCard style={{ width: "80%" }}>
        <IonCardContent>
          <IonText>
            <h2>Total: R {cartTotalSelector}</h2>
          </IonText>
          <br />
          <IonButton onClick={() => handleClick()}>Checkout</IonButton>
        </IonCardContent>
      </IonCard>
    </>
  );
};
export default Cart;
