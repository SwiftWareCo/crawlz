"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Download } from "lucide-react";
import { ResumeDocument } from "./ResumeDocument";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Card } from "~/components/ui/card";
import type { ResumeData } from "~/server/db/schema/resumes";

// Dynamically import PDFViewer to avoid SSR issues
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse bg-slate-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-2">⏳</div>
          <p className="text-sm font-medium">Loading preview...</p>
        </div>
      </div>
    ),
  },
);

interface ResumePreviewProps {
  data: ResumeData | null;
  template: string;
  setTemplate: (template: string) => void;
}

export function ResumePreview({
  data,
  template,
  setTemplate,
}: ResumePreviewProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!data) return;

    setIsDownloading(true);
    try {
      const ReactPDF = await import("@react-pdf/renderer");
      const fileName = `resume-${data.personalInfo.name.replace(/\s+/g, "-").toLowerCase()}.pdf`;

      const doc = <ResumeDocument data={data} template={template} />;
      const blob = await ReactPDF.pdf(doc).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!data) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center px-4">
        <div className="text-5xl mb-2">📄</div>
        <h3 className="text-lg font-semibold">No Resume Generated Yet</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Upload your resume and job description to generate a tailored preview
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-3">
      {/* Controls */}
      <Card className="p-3 border-0 shadow-sm bg-background/50 backdrop-blur">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-sm font-semibold">Resume Preview</h2>
            <p className="text-xs text-muted-foreground">
              {data.personalInfo.name} • {template.charAt(0).toUpperCase() + template.slice(1)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <span className="text-xs font-medium px-2">Template:</span>
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger className="border-0 bg-transparent h-8 w-[140px] shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical (CS)</SelectItem>
                  <SelectItem value="business">Professional</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              size="sm"
              className="gap-2"
              variant="default"
            >
              {isDownloading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Download
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* PDF Preview */}
      <div className="flex-1 overflow-hidden rounded-lg border border-border shadow-sm bg-white">
        <PDFViewer width="100%" height="100%" showToolbar={false}>
          <ResumeDocument data={data} template={template} />
        </PDFViewer>
      </div>
    </div>
  );
}
