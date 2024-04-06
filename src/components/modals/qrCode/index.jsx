import { X, QrCode } from "lucide-react";
import React, { useRef, useState } from "react";
import { GenerateQRCode } from "../../../hooks/useGenerateQrCode";
import { GetGenerateQRCode } from "../../../hooks/useGetQrCode";

function Modal({ onClose, alias }) {
  const modalRef = useRef();
  const { data, loading, error, generateQrCode } = GenerateQRCode();
  const { urlLink, loadings, err, getGenerateQrCode } = GetGenerateQRCode();
  const [qrCodeImage, setQrCodeImage] = useState(null);
  const [getqrCodeImage, setgetQrCodeImage] = useState(null);

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const handleGetQRCode = async () => {
    await generateQrCode(alias);
    setQrCodeImage(data);
  };

  const getHandleGetQRCode = async () => {
    await getGenerateQrCode(alias);
    setgetQrCodeImage(urlLink);
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="mt-10 flex flex-col gap-5 text-white">
        <button onClick={onClose} className="place-self-end">
          <X size={30} />
        </button>
        <div className="bg-indigo-600 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
          <div>
            {getqrCodeImage ? (
              <img src={getqrCodeImage} alt="QR Code" />
            ) : qrCodeImage ? (
              <img src={qrCodeImage} alt="QR Code" />
            ) : (
              <>
                <QrCode size={300} />
                <p className="justify-center items-center ml-10">
                  This is just a QR Code Icon <br /> Click either button to view
                  QR Code
                </p>
              </>
            )}
          </div>
          <div className="flex justify-center items-center gap-80">
            <button
              className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 font-medium rounded-md bg-black"
              onClick={handleGetQRCode}
              disabled={loading}
            >
              {loading ? "Generating..." : "Get QR Code"}
            </button>
            <button
              className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 font-medium rounded-md bg-black"
              onClick={getHandleGetQRCode}
              disabled={loadings}
            >
              {loadings ? "Getting Qr code.." : "View QR Code"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
