import { ReactNode } from "react";

interface SectionItem {
  title: string;
  description: string;
  icon?: ReactNode;
}

interface SectionGridProps {
  title: string;
  intro?: string;
  headerIcon?: ReactNode;
  items: SectionItem[];
}

export default function SectionGrid({ title, intro, headerIcon, items }: SectionGridProps) {
  return (
    <section className="py-8 md:py-12">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <div className="flex items-start gap-3">
            {headerIcon && <span className="text-amber-600 mt-1">{headerIcon}</span>}
            <div>
              <h2 className="text-xl font-semibold text-black">{title}</h2>
              {intro && <p className="mt-2 text-sm text-neutral-600 leading-6">{intro}</p>}
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, idx) => (
              <div key={idx} className="rounded-md border border-neutral-200 p-4">
                <div className="flex items-start gap-3">
                  {item.icon && <span className="text-amber-600 mt-1">{item.icon}</span>}
                  <div>
                    <h3 className="text-sm font-semibold text-black">{item.title}</h3>
                    <p className="mt-1 text-sm text-neutral-600 leading-6">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

