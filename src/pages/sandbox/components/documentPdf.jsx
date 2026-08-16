import { useEffect, useState } from "react";
import DocumentPdf from "../../../components/react-pdf/documentPdf";

const SandboxDocumentPdf = () => {
  const [base64, setBase64] = useState("");

  return (
    <div>
      <h1>Document PDF</h1>
      <DocumentPdf base64={base64} />
    </div>
  );
};

export default SandboxDocumentPdf;