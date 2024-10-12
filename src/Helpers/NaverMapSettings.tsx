import { useCallback } from "react";
import { NaverMap, useNavermaps } from "react-naver-maps";

export default function CustomNaverMap() {
  const navermaps = useNavermaps();

  const handleZoomChanged = useCallback((zoom: any) => {
    console.log(`zoom: ${zoom}`);
  }, []);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1000,
          padding: 5,
        }}
      ></div>
      <NaverMap
        zoomControl
        zoomControlOptions={{
          position: navermaps.Position.TOP_RIGHT,
        }}
        defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
        defaultZoom={13}
        onZoomChanged={handleZoomChanged}
        // 지도 인터랙션 옵션
        draggable={true}
        pinchZoom={true}
        scrollWheel={true}
        keyboardShortcuts={true}
        disableDoubleTapZoom={!true}
        disableDoubleClickZoom={!true}
        disableTwoFingerTapZoom={!true}
        // 관성 드래깅 옵션
        disableKineticPan={true}
        // 타일 fadeIn 효과
        tileTransition={true}
        // min/max 줌 레벨
        minZoom={10}
        maxZoom={21}
        // 지도 컨트롤
        scaleControl={true}
        logoControl={true}
        mapDataControl={true}
        mapTypeControl={true}
        // zoomControl={scaleControl}
      />
    </>
  );
}
