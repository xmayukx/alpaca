import { Props } from "next/script";
import React from "react";
type PDFViwerProps = {
  pdf_url: string;
};
export default function PDFViewer({ pdf_url }: PDFViwerProps) {
  const url = pdf_url;
  console.log(url);
  const url2 = `https://docs.google.com/gview?url=${pdf_url}&embedded=true`;
  return <iframe src={url2} className=" w-full h-full"></iframe>;
}
