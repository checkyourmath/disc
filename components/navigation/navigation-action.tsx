"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";
import { DialogType, useDialog } from "@/hooks/use-dialog-store";

// TODO: more appropriate component name

export const NavigationAction = () => {
  const { openDialog } = useDialog();

  return (
    <div>
      <ActionTooltip
        side="right"
        align="center"
        label="Create a Server"
      >
        <button
          type="button"
          className="group flex items-center"
          onClick={() => openDialog(DialogType.CREATE_SERVER)}
        >
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
