import { Map, CustomOverlayMap } from "react-kakao-maps-sdk";

const MNU_POSITION = {
  lat: 34.909723459036314,
  lng: 126.43952665825337,
};

export default function KakaoMap() {
  return (
    <div>
      <Map
        center={{ lat: MNU_POSITION.lat, lng: MNU_POSITION.lng }}
        style={{ width: "100%", height: "250px" }}
      >
        <CustomOverlayMap
          position={{ lat: MNU_POSITION.lat, lng: MNU_POSITION.lng }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              background: "#3880ff",
              borderRadius: "50%",
              width: "35px",
              height: "35px",
              color: "white",
              textAlign: "center",
              lineHeight: "35px",
              fontWeight: "bold",
            }}
          >
            3
          </div>
        </CustomOverlayMap>
      </Map>
    </div>
  );
}
