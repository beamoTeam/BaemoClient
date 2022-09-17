import { IonPage, IonContent } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import restaurantService from "../lib/api/RestaurantService";
import { MenuModel } from "../types/menu";
import MenuList from "../components/menu/MenuList";

export default function Menu() {
  const { r_seq } = useParams<{ r_seq: string }>();
  const [menus, setMenus] = useState<MenuModel[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await restaurantService.fetchAllMenus(r_seq);
      console.log(data);
      setMenus(data);
    })();
  }, [r_seq]);

  if (!menus) return <h4>Loading...</h4>;
  if (menus.length === 0) return <h4>No Menus</h4>;

  return (
    <IonPage>
      <IonContent>
        <MenuList menus={menus} />
      </IonContent>
    </IonPage>
  );
}
