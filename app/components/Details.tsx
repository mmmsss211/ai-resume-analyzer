import { cn } from "~/lib/utils";
import { Check, TriangleAlert } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";
import type { Feedback } from "@/types";

const ScoreBadge = ({ score }: { score: number }) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-1 items-center px-3 py-1 rounded-full",
        score > 69 ? "bg-green-100 text-green-700"
        : score > 39 ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700",
      )}
    >
      {score > 69 ?
        <Check className="size-4" />
      : <TriangleAlert className="size-4" />}
      <p className={cn("text-xs font-medium")}>
        {score} <span className="opacity-60">/ 100</span>
      </p>
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row gap-4 items-center py-2">
      <p className="font-semibold">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-3 text-sm">
        {tips.map((tip, index) => (
          <div className="flex flex-row gap-3 items-start" key={index}>
            {tip.type === "good" ?
              <Check className="size-5 text-green-600 shrink-0" />
            : <TriangleAlert className="size-5 text-yellow-600 shrink-0" />}
            <p className="text-gray-700">{tip.tip}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 w-full">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={cn(
              "p-4 rounded-md",
              tip.type === "good" ?
                "bg-green-50 text-green-900"
              : "bg-yellow-50 text-yellow-900",
            )}
          >
            <p className="text-sm leading-relaxed">{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Accordion>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader
              title="Tone & Style"
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="Content"
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="Structure"
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="Skills"
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
