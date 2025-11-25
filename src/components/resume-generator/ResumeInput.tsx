"use client";

import { useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";

interface ResumeInputProps {
  file: File | null;
  setFile: (file: File | null) => void;
  jobDescription: string;
  setJobDescription: (jd: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function ResumeInput({
  file,
  setFile,
  jobDescription,
  setJobDescription,
  onGenerate,
  isGenerating,
}: ResumeInputProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf" || droppedFile.type.startsWith("image/")) {
        setFile(droppedFile);
      }
    }
  };

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Resume Upload */}
      <Card className="border-2 border-dashed transition-all">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Resume
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "relative rounded-lg border-2 border-dashed p-6 text-center transition-all duration-200",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            )}
          >
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="resume-upload"
              className="cursor-pointer"
            >
              <div className="flex flex-col items-center gap-2">
                <div className={cn(
                  "rounded-lg p-2 transition-colors",
                  isDragging ? "bg-primary/10" : "bg-muted"
                )}>
                  <Upload className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {file ? `📄 ${file.name}` : "Drag your resume here"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {file ? "Click to change" : "or click to browse"}
                  </p>
                </div>
              </div>
            </label>
            {file && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setFile(null);
                }}
                className="absolute top-2 right-2 p-1 hover:bg-destructive/10 rounded transition-colors"
                title="Remove file"
              >
                <X className="h-4 w-4 text-destructive" />
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Job Description */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Job Description
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <Textarea
            placeholder="Paste the job description here..."
            className="flex-1 resize-none"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <div className="text-xs text-muted-foreground mt-2">
            {jobDescription.length > 0 && `${jobDescription.length} characters`}
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <Button
        size="lg"
        className="w-full font-semibold"
        onClick={onGenerate}
        disabled={isGenerating || !file || !jobDescription}
      >
        {isGenerating ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin">⏳</span>
            Generating Resume...
          </span>
        ) : (
          "Generate Resume"
        )}
      </Button>
    </div>
  );
}
