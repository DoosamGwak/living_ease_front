import { Container as MapDiv } from "react-naver-maps";
import CustomNaverMap from "../../Helpers/NaverMapSettings";

const LocationPage = () => {
  return (
    <div>
      <MapDiv
        style={{
          width: "80%",
          height: "300px",
          position: "relative",
        }}
      >
        <CustomNaverMap />
      </MapDiv>
    </div>
  );
};

export default LocationPage;
