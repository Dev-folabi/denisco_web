interface SectionHeadProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export function SectionHead({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadProps) {
  return (
    <div
      className={`mb-[54px] max-w-[620px] ${
        align === "center" ? "mx-auto text-center" : "text-left"
      }`}
    >
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className="text-[38px] font-semibold max-sm:text-[31px] max-[390px]:text-[28px]">
        {title}
      </h2>
      {description && <p className="mt-2 text-muted">{description}</p>}
    </div>
  );
}
