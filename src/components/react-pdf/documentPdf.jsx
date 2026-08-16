import "./documentPdf.css";

import PropTypes from "prop-types";

import { useState } from "react";
import { Pagination } from "antd";
import { Document, Page, pdfjs } from "react-pdf";
import { isEmpty } from "lodash";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.296/pdf.worker.min.mjs`;

const DocumentPdf = ({ base64 = "" }) => {

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  if (isEmpty(base64)) {
    return <div>Document not found</div>;
  }

  return (
    <div className="documentPdf-container">
      <Pagination
        simple
        current={page}
        total={total}
        onChange={setPage}
        showSizeChanger={false}
      />
      <div className="documentPdf-react-pdf">
        <Document
          file={base64}
          onLoadSuccess={onLoadSuccess}
          onLoadError={onLoadError}
        >
          <Page
            pageNumber={page}
            renderTextLayer={false}     // ปิดการเรนเดอร์ Text Layer (แก้ Warning เรื่อง TextLayer.css)
            renderAnnotationLayer={false} // ปิดการเรนเดอร์ Annotation Layer (แก้ Warning เรื่อง AnnotationLayer.css)
          />
        </Document>
      </div>
    </div>
  );

  function onLoadSuccess({ numPages }) {
    setTotal(numPages * 10);
  }

  function onLoadError(error) {
    console.error("document load error: ", error);
  }
};

DocumentPdf.propTypes = {
  base64: PropTypes.string,
};

export default DocumentPdf;