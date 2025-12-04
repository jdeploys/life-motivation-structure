"use client";
import { PageLayout } from "@/components/layout/PageLayout";
import { cn } from "@/shared/cn";
import { useSearchParams } from "next/navigation";
import { useType } from "@/features/analysis/useType";
import { TypeResultPage } from "@/components/TypeResultPage";
import { Button } from "@repo/ui/button";
import { toast } from "@repo/ui/toast";

const AnalysisResultPage = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const parsedType = type ? JSON.parse(type) : {};
  const { getMotivoType } = useType();

  const result = getMotivoType(parsedType);

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
      <div>
        <Button
          onClick={() => {
            navigator.clipboard
              .writeText(`${window.location.origin}/share?type=${result.code}`)
              .then(() => {
                toast("클립보드에 공유 주소가 복사되었어요.");
              });
          }}
        >
          공유하기
        </Button>
      </div>
    </PageLayout>
  );
};

export default AnalysisResultPage;
