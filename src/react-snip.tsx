import html2canvas from "html2canvas";
import { useRef, useState } from "react";

const ReactSnip: React.FC<{
  visible: boolean;
  onSnap: (canvas: HTMLCanvasElement) => void;
}> = ({ visible, onSnap }) => {
  const [startPoint, setStartPoint] = useState<[number, number]>([0, 0]);
  const [endPoint, setEndPoint] = useState<[number, number]>([0, 0]);
  const [mouseDown, setMouseDown] = useState(false);
  const maskRef = useRef<HTMLDivElement>(null);

  const width = endPoint[0] - startPoint[0];
  const height = endPoint[1] - startPoint[1];

  return (
    <div
      ref={maskRef}
      style={{
        display: visible ? "block" : "none",
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 999,
        height: "100%",
        backgroundColor: "rgba(0,0,0,.45)",
      }}
      onMouseDown={(e) => {
        setStartPoint([e.clientX, e.clientY]);
        setMouseDown(true);
      }}
      onMouseMove={(e) => {
        setEndPoint([e.clientX, e.clientY]);
      }}
      onMouseUp={() => {
        setMouseDown(false);

        if (maskRef.current) {
          maskRef.current.style.display = "none";
        }

        html2canvas(document.body, {
          x: window.scrollX + startPoint[0],
          y: window.scrollY + startPoint[1],
          width,
          height,
          useCORS: true,
        }).then((can) => onSnap(can));
      }}
    >
      {mouseDown && (
        <div
          style={{
            position: "fixed",
            zIndex: 1000,
            borderStyle: "dotted",
            borderWidth: 1,
            borderColor: "white",
            left: startPoint[0],
            top: startPoint[1],
            width,
            height,
          }}
        />
      )}
    </div>
  );
};

export default ReactSnip;
