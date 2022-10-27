import {
  IonIcon,
  IonPage,
  IonButton,
  IonHeader,
  IonToolbar,
  IonContent,
  IonText,
} from "@ionic/react";
import * as React from "react";
import { db } from "../firebase";
import Cart from "../utils/Cart";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Search from "../utils/Search";
import Tabs from "@mui/material/Tabs";
import { useNavigate } from "react-router-dom";
import AllProducts from "../utils/AllProducts";
import { logOutOutline } from "ionicons/icons";
import Typography from "@mui/material/Typography";
import { UserAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState([]);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      alert("You are logged out");
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    return async () => {
      const docRef = doc(db, "users", `${user.uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        alert("Some error occured");
        return handleLogout();
      }
    };
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: "30px",
              paddingRight: "30px",
              alignItems: "center",
            }}
          >
            <>
              <img
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
                src={`data:image/jpeg;base64,${data?.image}`}
                alt="Attachement"
              />
              <IonText color="secondary">
                <h2>{data?.name + " " + data?.surname}</h2>
              </IonText>
            </>
            <IonButton size="small" onClick={() => handleLogout()}>
              Logout
              <IonIcon slot="end" icon={logOutOutline}></IonIcon>
            </IonButton>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab
              style={{ width: "25%", height: "60px" }}
              label="All Products"
              {...a11yProps(0)}
            />
            <Tab
              style={{ width: "25%", height: "60px" }}
              label="Search"
              {...a11yProps(1)}
            />
            <Tab
              style={{ width: "25%", height: "60px" }}
              label="Cart"
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AllProducts />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Search />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Cart />
        </TabPanel>
      </IonContent>
    </IonPage>
  );
};
export default Home;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
