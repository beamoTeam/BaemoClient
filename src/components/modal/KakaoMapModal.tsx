import SheetModal from "./common/SheetModal";
import KakaoMap from "../map/KakaoMap";

export default function KakaoMapModal() {
  return (
    <div>
      <SheetModal trigger="open-map-modal">
        <KakaoMap />
      </SheetModal>
    </div>
  );
}
