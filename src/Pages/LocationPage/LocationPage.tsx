import React from "react";
import { NaverMap, Container as MapDiv } from "react-naver-maps";
import CustomNaverMap from "../../Helpers/NaverMapSettings";

type Props = {};

const LocationPage = (props: Props) => {
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
