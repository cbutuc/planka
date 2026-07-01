import React from "react";
import { useDroppable } from "@dnd-kit/core";

type DroppableAreaProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

export function DroppableArea({ id, children, className }: DroppableAreaProps) {
  const { setNodeRef } = useDroppable({
    id: id,
    data: {
      type: "Column",
      status: id,
    },
  });

  return (
    <div ref={setNodeRef} className={className}>
      {children}
    </div>
  );
}
