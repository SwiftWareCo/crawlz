import { Document, Page } from "@react-pdf/renderer";
import type { ResumeData } from "~/server/db/schema/resumes";
import { TemplateCS } from "./templates/TemplateCS";
import { TemplateBusiness } from "./templates/TemplateBusiness";
import { TemplateScience } from "./templates/TemplateScience";

interface ResumeDocumentProps {
  data: ResumeData;
  template: string;
}

export function ResumeDocument({ data, template }: ResumeDocumentProps) {
  const renderTemplate = () => {
    switch (template) {
      case "business":
        return <TemplateBusiness data={data} />;
      case "academic":
        return <TemplateScience data={data} />;
      case "technical":
      default:
        return <TemplateCS data={data} />;
    }
  };

  return (
    <Document>
      <Page size="A4">{renderTemplate()}</Page>
    </Document>
  );
}
