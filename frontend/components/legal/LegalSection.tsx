interface LegalSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export default function LegalSection({
  id,
  title,
  children,
}: LegalSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-32 py-8 border-t border-zinc-100 dark:border-zinc-800/50 first:border-t-0 first:pt-0"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight">
        {title}
      </h2>
      <div className="space-y-3 text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:md:pl-10 [&_ul]:space-y-1.5 [&_ul]:mt-2 [&_h3]:text-sm [&_h3]:md:text-base [&_h3]:font-semibold [&_h3]:uppercase [&_h3]:tracking-widest [&_h3]:text-zinc-500 [&_h3]:dark:text-zinc-500 [&_h3]:mt-5 [&_h3]:mb-2 [&_a]:text-primary-600 [&_a]:dark:text-primary-400 [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </section>
  );
}
