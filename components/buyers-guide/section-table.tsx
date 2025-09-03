import { ReactNode } from "react";

interface SectionItem {
  title: string;
  description: string;
  icon?: ReactNode;
}

interface SectionTableProps {
  title: string;
  intro?: string;
  headerIcon?: ReactNode;
  items: SectionItem[];
}

export default function SectionTable({ title, intro, headerIcon, items }: SectionTableProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-8 md:py-12">
      <div className="rounded-lg bg-white ">
      {/* Mobile stacked layout */}
      <div className="md:hidden">
        <div className="rounded-md border border-neutral-200 p-5">
          <div className="flex items-start gap-3">
            {headerIcon && <span className="text-amber-600 mt-1">{headerIcon}</span>}
            <div>
              <h2 className="text-xl font-semibold special-header text-black">{title}</h2>
              {intro && <p className="mt-2 text-xs text-neutral-600 leading-6">{intro}</p>}
            </div>
          </div>
        </div>
        <div className="mt-4 overflow-hidden rounded-md border border-neutral-200 divide-y divide-neutral-200">
          {items.map((item, idx) => (
            <div key={idx} className="p-5">
              <ItemRow {...item} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop table layout */}
      <div className="hidden md:block">
        <table className="w-full border-separate [border-spacing:0]" aria-label={title}>
          <tbody>
            <tr>
              <td
                rowSpan={items.length}
                className="align-top md:w-1/3 p-6 border-y border-l border-neutral-200 rounded-l-md"
              >
                <div className="flex items-start gap-3">
                  {headerIcon && <span className="text-amber-600 mt-1">{headerIcon}</span>}
                  <div>
                    <h2 className="text-xl font-semibold special-header text-black">{title}</h2>
                    {intro && <p className="mt-2 text-sm text-neutral-600 leading-6">{intro}</p>}
                  </div>
                </div>
              </td>
              <td className="p-6 border border-neutral-200 md:border-l rounded-tr-md">
                <ItemRow {...items[0]} />
              </td>
            </tr>
            {items.slice(1).map((item, idx) => {
              const isLast = idx === items.length - 2; // because sliced
              return (
                <tr key={idx}>
                  <td className={`p-6 border-x border-b border-neutral-200 md:border-l ${isLast ? "rounded-br-md" : ""}`}>
                    <ItemRow {...item} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </div>
    </section>
  );
}

function ItemRow({ title, description, icon }: SectionItem) {
  return (
    <div className="flex items-start gap-3">
      {icon && <span className="text-amber-600 mt-1">{icon}</span>}
      <div>
        <h3 className="text-sm font-semibold text-black">{title}</h3>
        <p className="mt-1 text-sm text-neutral-600 leading-6">{description}</p>
      </div>
    </div>
  );
}

