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
    <div className="flex flex-col gap-4 w-full">
      {tips.map((tip, index) => (
        <div
          key={index}
          className={cn(
            "rounded-md border-l-4 p-4",
            tip.type === "good"
              ? "border-green-500 bg-green-50"
              : "border-yellow-500 bg-yellow-50",
          )}
        >
          <div className="flex flex-row gap-2 items-center mb-2">
            {tip.type === "good" ?
              <Check className="size-4 text-green-600 shrink-0" />
            : <TriangleAlert className="size-4 text-yellow-600 shrink-0" />}
            <p
              className={cn(
                "text-sm font-semibold",
                tip.type === "good" ? "text-green-800" : "text-yellow-800",
              )}
            >
              {tip.tip}
            </p>
          </div>
          <p
            className={cn(
              "text-sm leading-relaxed ml-6",
              tip.type === "good" ? "text-green-900/80" : "text-yellow-900/80",
            )}
          >
            {tip.explanation}
          </p>
        </div>
      ))}
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
