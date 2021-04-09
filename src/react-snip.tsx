import html2canvas from "html2canvas";
import React, { useRef, useState } from "react";

const ReactSnip: React.FC<{
  visible: boolean;
  onSnip: (canvas: HTMLCanvasElement) => void;
  onClose: () => void;
}> = ({ visible, onSnip, onClose }) => {
  const maskRef = useRef<HTMLDivElement>(null);
  const [startPoint, setStartPoint] = useState<[number, number]>([0, 0]);
  const [endPoint, setEndPoint] = useState<[number, number]>([0, 0]);
  const [mouseDown, setMouseDown] = useState(false);

  const x = Math.min(startPoint[0], endPoint[0]);
  const y = Math.min(startPoint[1], endPoint[1]);

  const width = Math.abs(endPoint[0] - startPoint[0]);
  const height = Math.abs(endPoint[1] - startPoint[1]);

  const setMaskDisplay = (show: boolean) => {
    if (maskRef.current) {
      maskRef.current.style.display = show ? "block" : "none";
    }
  };

  return (
    <div
      style={{
        display: visible ? "block" : "none",
        color: "white",
        userSelect: "none",
      }}
    >
      <div
        ref={maskRef}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 999,
          height: "100%",
          backgroundColor: "rgba(0,0,0,.45)",
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onMouseDown={(e) => {
          setStartPoint([e.clientX, e.clientY]);
          setMouseDown(true);
        }}
        onMouseMove={(e) => {
          setEndPoint([e.clientX, e.clientY]);
        }}
        onMouseUp={(e) => {
          onClose();

          if (e.button === 0) {
            setMouseDown(false);
            setMaskDisplay(false);

            html2canvas(document.body, {
              x: window.scrollX + x,
              y: window.scrollY + y,
              width,
              height,
              useCORS: true,
            }).then((can) => {
              onSnip(can);
              setMaskDisplay(true);
            });
          }
        }}
      >
        <h1>Drag mouse to select area</h1>
        <h2>Right click to cancel</h2>
        {mouseDown && (
          <div
            style={{
              position: "fixed",
              zIndex: 1000,
              borderStyle: "dotted",
              borderWidth: 1,
              borderColor: "white",
              left: x,
              top: y,
              width,
              height,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ReactSnip;
