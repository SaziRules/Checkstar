"use client";

import dynamic from "next/dynamic";
import { Download } from "lucide-react";

const FlipbookViewer = dynamic(
  () => import("./FlipbookViewer").then((m) => m.FlipbookViewer),
  { ssr: false, loading: () => null }
);

interface Props {
  pdfUrl: string;
  title: string;
}

export function CatalogueSection({ pdfUrl, title }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={pdfUrl}
        download
        className="inline-flex items-center gap-2 bg-orange text-white text-sm font-bold px-6 py-3 rounded-sm hover:bg-orange-hover transition-colors duration-200 shadow-orange"
      >
        <Download className="w-4 h-4" aria-hidden="true" />
        Download PDF
      </a>
      <FlipbookViewer pdfUrl={pdfUrl} title={title} />
    </div>
  );
}
