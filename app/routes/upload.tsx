import Navbar from "~/components/Navbar";
import { Ripple } from "~/components/ui/ripple";
import { Bot } from "~/components/animate-ui/icons/bot";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "~/constants";

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    try {
      setIsProcessing(true);
      setStatusText("Processing...");

      console.log("Uploading resume...");
      // Handle potential array return from fs.upload
      const uploadResult = await fs.upload([file]);
      const uploadedFile =
        Array.isArray(uploadResult) ? uploadResult[0] : uploadResult;

      console.log("Resume upload result:", uploadedFile);

      if (!uploadedFile) {
        setIsProcessing(false);
        return setStatusText("Failed to upload file");
      }

      setStatusText("Converting to image...");
      const imageFile = await convertPdfToImage(file);
      if (!imageFile.file) {
        console.error(imageFile.error);
        setIsProcessing(false);
        return setStatusText("Failed to convert to image");
      }

      setStatusText("Uploading the image...");

      const imageUploadResult = await fs.upload([imageFile.file]);
      const uploadedImage =
        Array.isArray(imageUploadResult) ?
          imageUploadResult[0]
        : imageUploadResult;

      console.log("Image upload result:", uploadedImage);

      if (!uploadedImage) {
        setIsProcessing(false);
        return setStatusText("Failed to upload image");
      }

      setStatusText("Preparing data...");

      const uuid = generateUUID();
      const data = {
        id: uuid,
        resumePath: uploadedFile.path,
        iamgePath: uploadedImage.path,
        companyName,
        jobTitle,
        jobDescription,
        feedback: {}, // Initialize as object or whatever type expects
      };

      await kv.set(`resume:${uuid}`, JSON.stringify(data));

      setStatusText("Analyzing...");

      const feedback = await ai.feedback(
        uploadedFile.path,
        prepareInstructions({ jobTitle, jobDescription })
      );

      if (!feedback) {
        setIsProcessing(false);
        return setStatusText("Failed to analyze");
      }

      console.log("Feedback received:", feedback);

      const feedbackText =
        typeof feedback.message.content === "string" ?
          feedback.message.content
        : feedback.message.content[0].text;

      data.feedback = JSON.parse(feedbackText);

      await kv.set(`resume:${uuid}`, JSON.stringify(data));

      setStatusText("Analysis complete, redirecting...");
      console.log(data);
      navigate(`/resume/${uuid}`);
    } catch (error) {
      console.error("Error in handleAnalyze:", error);
      setStatusText(
        "Error: " + (error instanceof Error ? error.message : "Unknown error")
      );
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget.closest("form");
    if (!form) return;

    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    console.log({ companyName, jobTitle, jobDescription, file });

    if (!file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="pb-20">
      <section className="flex flex-col items-center text-center relative">
        <Navbar />
        <div className="pt-20 pb-12 max-w-[400px] flex flex-col gap-5 z-10">
          <h1 className="text-5xl font-medium text-emerald-900">
            Smart feedback for your dream job
          </h1>
          <p className="text-lg text-emerald-700 max-w-[300px] mx-auto mb-4">
            {statusText ?
              statusText
            : "Upload your resume and let our AI analyze it for you."}
          </p>
        </div>
        <div className="absolute h-[500px] w-full overflow-hidden z-0">
          <Ripple borderColor={"border-emerald-950"} />
        </div>
      </section>
      <section className="flex items-center justify-center">
        {isProcessing ?
          <Bot
            animate
            loop={true}
            loopDelay={500}
            size={60}
            className={"text-emerald-950"}
          />
        : <form
            id="upload-form"
            onSubmit={handleSubmit}
            className="z-10 flex flex-col gap-5 w-[500px]"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="company-name"
                className="text-sm font-medium text-emerald-900"
              >
                Company name
              </label>
              <input
                type="text"
                name="company-name"
                id="company-name"
                placeholder="e.g. Google"
                className="border bg-white border-emerald-900/40 rounded-sm p-3 focus:border-emerald-900 focus:ring-emerald-900 focus:ring-1 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="job-title"
                className="text-sm font-medium text-emerald-900"
              >
                Job title
              </label>
              <input
                type="text"
                name="job-title"
                id="job-title"
                placeholder="e.g. Software Engineer"
                className="border bg-white border-emerald-900/40 rounded-sm p-3 focus:border-emerald-900 focus:ring-emerald-900 focus:ring-1 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="job-description"
                className="text-sm font-medium text-emerald-900"
              >
                Job description
              </label>
              <textarea
                name="job-description"
                rows={5}
                id="job-description"
                placeholder="e.g. 5 years of experience in software development"
                className="border bg-white border-emerald-900/40 rounded-sm p-3 focus:border-emerald-900 focus:ring-emerald-900 focus:ring-1 focus:outline-none"
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="uploader"
                className="text-sm font-medium text-emerald-900"
              >
                Upload resume
              </label>
              <FileUploader onFileSelect={handleFileSelect} />
            </div>
            <Button
              type="submit"
              className="text-sm font-normal rounded-sm bg-emerald-800 hover:bg-emerald-900 cursor-pointer"
            >
              Upload
            </Button>
          </form>
        }
      </section>
    </main>
  );
};

export default Upload;
