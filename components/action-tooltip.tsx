"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Align, Side } from "@radix-ui/react-popper/dist";

export enum TooltipAlign {
  START = "start",
  CENTER = "center",
  END = "end"
}

type ActionTooltipProps = {
  label: string;
  children: React.ReactNode;
  side?: Side;
  align?: Align;
};

const ActionTooltip = ({ label, children, side, align }: ActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
        >
          <p className="font-semibold text-sm capitalize">{label.toLowerCase()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionTooltip;
