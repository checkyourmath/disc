"use client";

import { useParams } from "next/navigation";
import Image from "next/image";

import { ActionTooltip, TooltipAlign, TooltipSide } from "@/components/action-tooltip";
import { cn } from "@/lib/utils";

export type NavigationItemProps = {
  id: string;
  imageUrl: string;
  name: string;
};

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const params = useParams();
  // const router = useRouter();

  return (
    <ActionTooltip
      side={TooltipSide.RIGHT}
      align={TooltipAlign.CENTER}
      label={name}
    >
      <button
        type="button"
        onClick={() => {}}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image
            fill
            src={imageUrl}
            alt="Channel"
          />
        </div>
      </button>
    </ActionTooltip>
  );
};
