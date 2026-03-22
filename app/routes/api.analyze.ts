import Groq from "groq-sdk";
import { AIResponseFormat } from "~/constants";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function action({ request }: { request: Request }) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { resumeText, jobTitle, jobDescription } = await request.json();

    if (!resumeText) {
      return Response.json(
        { error: "Resume text is required" },
        { status: 400 },
      );
    }

    const prompt = `You are an expert in ATS (Applicant Tracking System) and resume analysis.
Please analyze and rate this resume and suggest how to improve it.
The rating can be low if the resume is bad.
Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
If available, use the job description for the job user is applying to to give more detailed feedback.
If provided, take the job description into consideration.
The job title is: ${jobTitle || "Not specified"}
The job description is: ${jobDescription || "Not provided"}

Here is the resume text:
---
${resumeText}
---

Provide the feedback using the following format: ${AIResponseFormat}
Return the analysis as a JSON object, without any other text and without the backticks.
Do not include any other text or comments.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 4096,
    });

    const responseText = completion.choices[0]?.message?.content;

    if (!responseText) {
      return Response.json(
        { error: "No response from AI" },
        { status: 500 },
      );
    }

    const feedback = JSON.parse(responseText);
    return Response.json(feedback);
  } catch (error) {
    console.error("Analysis error:", error);
    const message =
      error instanceof Error ? error.message : "Analysis failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
