import Navbar from "~/components/Navbar";
import { Ripple } from "~/components/ui/ripple";
import { Bot } from "~/components/animate-ui/icons/bot";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import FileUploader from "~/components/FileUploader";
const Upload = () => {
 const [ isProcessing, setIsProcessing ] = useState(false);
 const [statusText, setStatusText] = useState("");
 const [file, setFile ] = useState<File | null>(null);

 const handleFileSelect = (file: File | null) => {
  setFile(file);
 }

 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   setIsProcessing(true);
   setStatusText("Processing...");
   setTimeout(() => {
     setIsProcessing(false);
     setStatusText("Processed");
   }, 2000);
 }

  return (
    <main>
      <section className="flex flex-col items-center text-center relative">
        <Navbar />
        <div className="pt-20 pb-12 max-w-[400px] flex flex-col gap-5 z-10">
          <h1 className="text-5xl font-medium text-emerald-900">
            Smart feedback for your dream job
          </h1>
          <p className="text-lg text-emerald-700 max-w-[300px] mx-auto mb-4">
            Upload your resume and let our AI analyze it for you.
          </p>
        </div>
        <div className="absolute h-[500px] w-full overflow-hidden z-0">
          <Ripple borderColor={"border-emerald-950"} />
        </div>
      </section>
      <section className="flex items-center justify-center">
        {isProcessing ? (
             <Bot
          animate
          loop={true}
          loopDelay={500}
          size={60}
          className={"text-emerald-950"}
        />
        ) : (
          <form id="upload-form" onSubmit={handleSubmit} className="z-10 flex flex-col gap-5 w-[500px]">
            <div className="flex flex-col gap-2">
              <label htmlFor="company-name" className="text-sm font-medium text-emerald-900">Company name</label>
              <input type="text" id="company-name" placeholder="e.g. Google" className="border bg-white border-emerald-900/40 rounded-sm p-3 focus:border-emerald-900 focus:ring-emerald-900 focus:ring-1 focus:outline-none"/>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="job-title" className="text-sm font-medium text-emerald-900">Job title</label>
              <input type="text" id="job-title" placeholder="e.g. Software Engineer" className="border bg-white border-emerald-900/40 rounded-sm p-3 focus:border-emerald-900 focus:ring-emerald-900 focus:ring-1 focus:outline-none"/>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="job-description" className="text-sm font-medium text-emerald-900">Job description</label>
              <textarea rows={5} id="job-description" placeholder="e.g. 5 years of experience in software development" className="border bg-white border-emerald-900/40 rounded-sm p-3 focus:border-emerald-900 focus:ring-emerald-900 focus:ring-1 focus:outline-none" ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="uploader" className="text-sm font-medium text-emerald-900">Upload resume</label>
             <FileUploader onFileSelect={handleFileSelect}/>
            </div>
            <Button type="submit" className="text-sm font-normal rounded-sm bg-emerald-800 hover:bg-emerald-900 cursor-pointer">Upload</Button>
          </form>
        )}
       
      </section>
    </main>
  );
};

export default Upload;
