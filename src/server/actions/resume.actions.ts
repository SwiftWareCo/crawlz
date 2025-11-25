"use server";

import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { db } from "~/server/db";
import { resumes } from "~/server/db/schema";
import type { ResumeData } from "~/server/db/schema/resumes";

const ai = new GoogleGenAI({});

export async function generateResumeAction(
  formData: FormData,
): Promise<ResumeData> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const file = formData.get("file") as File;
  const jobDescription = formData.get("jobDescription") as string;

  if (!file || !jobDescription) {
    throw new Error("Missing file or job description");
  }

  // Convert file to base64
  const arrayBuffer = await file.arrayBuffer();
  const base64Data = Buffer.from(arrayBuffer).toString("base64");
  const mimeType = file.type;

  const prompt = `
    You are an expert Resume Writer and ATS Optimizer.
    I will provide you with a candidate's current resume (file) and a target Job Description.
    
    Your task is to extract information from the resume and restructure it into a JSON format optimized for the target job.
    
    CRITICAL INSTRUCTIONS:
    1. **Analyze the Job Description**: Identify key skills, keywords, and requirements.
    2. **Tailor the Resume**: 
       - Rewrite the "Summary" to highlight relevance to the JD.
       - Reorder or emphasize "Skills" that match the JD.
       - Refine "Experience" bullet points. Use strong action verbs. If a bullet point is vague, IMPROVE it by suggesting metrics or results (e.g., "Managed a team" -> "Managed a team of 5, increasing efficiency by 20%").
    3. **Structure**: Return ONLY valid JSON matching this structure:
    {
      "personalInfo": { 
        "name": "Name", 
        "title": "Target Role Title (based on JD)",
        "contact": { "email": "", "phone": "", "linkedin": "", "github": "", "portfolio": "" } 
      },
      "summary": "Tailored summary...",
      "skills": ["Skill 1", "Skill 2", ...], 
      "experience": [
        { "role": "", "company": "", "date": "", "bullets": ["Action verb + metric + result"] }
      ],
      "education": [ 
        { "degree": "", "school": "", "year": "" } 
      ],
      "projects": [ 
        { "name": "", "techStack": "", "description": "" } 
      ],
      "type": "CS" // Infer the best template type: "CS", "BUSINESS", or "SCIENCE" based on the content.
    }

    Target Job Description:
    ${jobDescription}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data,
              },
            },
          ],
        },
      ],
    });

    const text = response.text;

    if (!text) {
      throw new Error("No text generated");
    }

    // Clean up potential markdown code blocks
    const jsonString = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const data = JSON.parse(jsonString) as ResumeData;
    return data;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate resume");
  }
}

export async function saveResumeAction(data: ResumeData, template: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    await db.insert(resumes).values({
      clerkUserId: userId,
      content: data,
      template: template,
    });
    return { success: true };
  } catch (error) {
    console.error("Save Resume Error:", error);
    throw new Error("Failed to save resume");
  }
}
