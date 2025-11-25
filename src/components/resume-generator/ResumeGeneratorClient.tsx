"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Save, Sparkles } from "lucide-react";
import { ResumeInput } from "./ResumeInput";
import { ResumePreview } from "./ResumePreview";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import type { ResumeData } from "~/server/db/schema/resumes";
import {
  generateResumeAction,
  saveResumeAction,
} from "~/server/actions/resume.actions";

export function ResumeGeneratorClient() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [template, setTemplate] = useState("technical");
  const [isSaving, setIsSaving] = useState(false);

  const generateResume = async () => {
    if (!file || !jobDescription) return;

    setIsGenerating(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("jobDescription", jobDescription);

      const data = await generateResumeAction(formData);
      setResumeData(data);

      // Auto-switch template based on AI suggestion if available
      if (data.type) {
        const typeMap: Record<string, string> = {
          CS: "technical",
          BUSINESS: "business",
          SCIENCE: "academic",
        };
        const mappedTemplate = typeMap[data.type];
        if (mappedTemplate) {
          setTemplate(mappedTemplate);
        }
      }
      toast.success("Resume generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate resume. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const saveResume = async () => {
    if (!resumeData) return;
    setIsSaving(true);
    try {
      await saveResumeAction(resumeData, template);
      toast.success("Resume saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save resume.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col lg:flex-row gap-6 overflow-hidden">
      {/* Left Pane: Inputs */}
      <div className="w-full lg:w-[420px] lg:border-r overflow-y-auto p-6 flex flex-col">
        <div className="mb-6 shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5" />
            <h1 className="text-2xl font-bold">Resume Generator</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Tailor your resume to any job description
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {/* Generation Status */}
          {isGenerating && (
            <Card className="border-primary/30 bg-primary/5 p-4 shrink-0">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="animate-spin text-2xl">⏳</div>
                  <div>
                    <p className="font-medium text-sm">AI is working...</p>
                    <p className="text-xs text-muted-foreground">
                      Analyzing your resume and optimizing for the job description
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 bg-primary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary animate-pulse rounded-full" style={{ width: "60%" }} />
                  </div>
                  <p className="text-xs text-muted-foreground">This usually takes 10-30 seconds...</p>
                </div>
              </div>
            </Card>
          )}

          {/* Input Form */}
          <div className="flex-1 min-h-0">
            <ResumeInput
              file={file}
              setFile={setFile}
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              onGenerate={generateResume}
              isGenerating={isGenerating}
            />
          </div>

          {/* Save Actions */}
          {resumeData && (
            <Card className="border-green-200/50 bg-green-50/50 dark:bg-green-950/20 p-4 shrink-0">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-sm">Resume Ready!</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    ✨ Your tailored resume has been generated. Download or save to your account.
                  </p>
                </div>
                <Button
                  onClick={saveResume}
                  disabled={isSaving}
                  className="w-full gap-2"
                  variant="default"
                  size="sm"
                >
                  {isSaving ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save to Account
                    </>
                  )}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Right Pane: Preview - Hidden on mobile */}
      <div className="hidden lg:flex flex-1 overflow-hidden p-6">
        <ResumePreview
          data={resumeData}
          template={template}
          setTemplate={setTemplate}
        />
      </div>
    </div>
  );
}
