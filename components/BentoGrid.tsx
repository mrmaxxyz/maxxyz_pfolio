import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

interface BentoGridItemProps {
    children: ReactNode;
    className?: string;
    colSpan?: 1 | 2 | 3;
    rowSpan?: 1 | 2;
}

export const BentoGrid = ({ children, className }: BentoGridProps) => {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto auto-rows-[200px]",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    children,
    className,
    colSpan = 1,
    rowSpan = 1,
}: BentoGridItemProps) => {
    return (
        <div
            className={cn(
                "rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-0 overflow-hidden dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col",
                colSpan === 2 ? "md:col-span-2" : colSpan === 3 ? "md:col-span-3" : "md:col-span-1",
                rowSpan === 2 ? "md:row-span-2" : "md:row-span-1",
                className
            )}
        >
            {children}
        </div>
    );
};
