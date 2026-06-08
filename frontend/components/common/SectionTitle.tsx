import { cn } from "@/lib/utils"; // Or your project's class-merging utility

const SectionTitle = ({
  title,
  paragraph,
  width = "600px",
  center,
  className,
  mb = "20px",
}: {
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
  mb?: string;
  className?: string;
}) => {
  return (
    <>
      <div
        className={cn("w-full", center && "mx-auto text-center", className)}
        style={{ maxWidth: width, marginBottom: mb }}
      >
        <h2 className="mb-2 text-lg md:text-xl lg:text-2xl font-bold leading-tight! text-black dark:text-white">
          {title}
        </h2>
        <p className="text-xs leading-relaxed! text-muted-foreground md:text-sm">
          {paragraph}
        </p>
      </div>
    </>
  );
};

export default SectionTitle;
