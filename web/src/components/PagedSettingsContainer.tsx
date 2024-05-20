import { cn } from "@/src/utils/tailwind";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";

type SettingsProps = {
  pages: Array<
    {
      title: string;
    } & ({ content: ReactNode } | { href: string })
  >;
};

export const PagedSettingsContainer = ({ pages }: SettingsProps) => {
  const [currentPageTitle, setCurrentPageTitle] = useQueryParam(
    "page",
    withDefault(StringParam, pages[0].title),
  );
  const currentPage = pages.find((page) => page.title === currentPageTitle);
  return (
    <main className="flex flex-1 flex-col gap-4 py-4 md:gap-8">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid gap-4 text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          {pages.map((page) =>
            "href" in page ? (
              <Link
                key={page.title}
                href={page.href}
                className="flex flex-row items-center gap-2 font-semibold"
              >
                {page.title}
                <ArrowUpRight size={14} className="inline" />
              </Link>
            ) : (
              <span
                key={page.title}
                onClick={() => setCurrentPageTitle(page.title)}
                className={cn(
                  "cursor-pointer font-semibold",
                  page.title === currentPageTitle && "text-primary",
                )}
              >
                {page.title}
              </span>
            ),
          )}
        </nav>
        {currentPage && "content" in currentPage ? currentPage.content : null}
      </div>
    </main>
  );
};
