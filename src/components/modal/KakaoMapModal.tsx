import React, { ReactElement, useEffect, useState } from "react";
import SheetModal from "./common/SheetModal";
import KakaoMap from "../map/KakaoMap";

export default function KakaoMapModal() {
  const [map, setMap] = useState<ReactElement | null>(null);

  useEffect(() => {
    setMap(
      <div>
        <SheetModal>
          <KakaoMap />
        </SheetModal>
      </div>
    );

    return () => setMap(null);
  }, []);

  return <>{map}</>;
}
