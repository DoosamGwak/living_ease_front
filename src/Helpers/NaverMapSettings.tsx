import { useCallback, useState } from "react";
import { NaverMap, useNavermaps } from "react-naver-maps";

export default function CustomNaverMap() {
  const navermaps = useNavermaps();

  const [zoom, setZoom] = useState(13);

  const [draggable, setDraggable] = useState(true);
  const [disableKineticPan, setDisableKineticPan] = useState(true);
  const [tileTransition, setTileTransition] = useState(true);
  const [minZoom, setMinZoom] = useState(7);
  const [scaleControl, setScaleControl] = useState(true);

  const handleZoomChanged = useCallback((zoom: any) => {
    console.log(`zoom: ${zoom}`);
  }, []);

  const normalBtnStyle = {
    backgroundColor: "#fff",
    border: "solid 1px #333",
    outline: "0 none",
    borderRadius: "5px",
    boxShadow: "2px 2px 1px 1px rgba(0, 0, 0, 0.5)",
    margin: "0 5px 5px 0",
  };

  const selectedBtnStyle = {
    ...normalBtnStyle,
    backgroundColor: "#2780E3",
    color: "white",
  };

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
        draggable={draggable}
        pinchZoom={draggable}
        scrollWheel={draggable}
        keyboardShortcuts={draggable}
        disableDoubleTapZoom={!draggable}
        disableDoubleClickZoom={!draggable}
        disableTwoFingerTapZoom={!draggable}
        // 관성 드래깅 옵션
        disableKineticPan={disableKineticPan}
        // 타일 fadeIn 효과
        tileTransition={tileTransition}
        // min/max 줌 레벨
        minZoom={minZoom}
        maxZoom={21}
        // 지도 컨트롤
        scaleControl={scaleControl}
        logoControl={scaleControl}
        mapDataControl={scaleControl}
        mapTypeControl={scaleControl}
        // zoomControl={scaleControl}
      />
    </>
  );
}
