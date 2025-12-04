'use client';
import { PageLayout } from "@/components/layout/PageLayout";
import { useSearchParams } from "next/navigation";
import { useType } from "@/features/analysis/useType";
import { TypeResultPage } from "@/components/TypeResultPage";
import { cn } from "@repo/ui/shared/cn";

const SharePage = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const { getMotivoTypeForString } = useType();

  const result = getMotivoTypeForString(String(type || ""));

  if (!result) {
    return (
      <PageLayout>
        <h1 className={cn("text-xl")}>잘못된 접근이에요.</h1>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <TypeResultPage result={result} />
    </PageLayout>
  );
};

export default SharePage;
