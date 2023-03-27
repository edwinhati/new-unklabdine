/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import QrScanner from "qr-scanner";

export default function scanPage() {
  const [result, setResult] = useState("");
  const ref = useRef(null);
  useEffect(() => {
    const videoSource = ref.current;
    if (!videoSource) return;
    const scanner = new QrScanner(
      videoSource,
      (res) => {
        setResult(res);
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        higahlightCodeOutline: true,
        preferredCamera: "environment",
        video: {
          facingMode: "environment",
          width: 250,
          height: 250,
        },
      }
    );
    scanner.start();
  }, []);

  return (
    <>
      <Header label="Scan" hasBack={false} />
      <div className="flex flex-col bg-[#f0f0f0] pt-12">
        <div className="flex flex-col justify-center items-center">
          <p className="text-[14px] text-[#2D2D2D]">
            Please scan the QR code to check in
          </p>
        </div>
        {result ? (
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-[18px] text-[#2D2D2D]">
              You have checked in
            </h1>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <video
              id="video"
              ref={ref}
              className="ml-auto mr-automt-[5px]shadow-udine-1"
            />
          </div>
        )}
      </div>
      <Navigation />
    </>
  );
}
