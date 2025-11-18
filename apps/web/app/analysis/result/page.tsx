"use client";
import { PageLayout } from "@/components/layout/PageLayout";
import { cn } from "@repo/ui/styles/cn";
import { useSearchParams } from "next/navigation";
import { useType } from "@/features/analysis/useType";
import { Card } from "@/components/card/Card";

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
      <h1 className={cn("text-xl")}>당신은...</h1>
      <div className="flex flex-col gap-3 my-12 w-full">
        <Card>
          <div className="flex flex-col gap-3">
            <span>{result.title} 유형이에요.</span>
            <span>{result.description}</span>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col gap-3">
            <span className="text-xl">대표 문장</span>
            <span>{result.representative_sentence}</span>
            <div className="w-full bg-separators-opaque h-[1px]"></div>
            <span className="text-xl">의미의 언어</span>
            <span>{result.language_of_meaning}</span>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col gap-3">
            <span className="text-xl">상징적인 순간</span>
            <span>{result.representative_scene}</span>
            <div className="w-full bg-separators-opaque h-[1px]"></div>
            <span className="text-xl">감각을 느끼는 순간</span>
            <span>{result.emotional_trigger}</span>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col gap-3">
            <span className="text-xl">의미의 근간</span>
            <span>{result.meaning_origin}</span>
            <div className="w-full bg-separators-opaque h-[1px]"></div>
            <span className="text-xl">핵심 감정</span>
            <span>{result.core_emotion}</span>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col gap-3">
            <span className="text-xl">가장 어려움을 느끼는 상황</span>
            <span>{result.hardest_to_endure}</span>
            <div className="w-full bg-separators-opaque h-[1px]"></div>
            <span className="text-xl">위기 상황</span>
            <span>{result.crisis_state}</span>
            <div className="w-full bg-separators-opaque h-[1px]"></div>
            <span className="text-xl">숨겨져 있는 두려움</span>
            <span>{result.hidden_fear}</span>
            <div className="w-full bg-separators-opaque h-[1px]"></div>
            <span className="text-xl">삶의 의미를 무시하는 긁히는 문장</span>
            <span>{result.itching_phrase}</span>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col gap-3">
            <span className="text-xl">의미 부여 구조</span>
            <span>{result.reward_structure}</span>
            <div className="w-full bg-separators-opaque h-[1px]"></div>
            <span className="text-xl">의미 회복 패턴</span>
            <span>{result.behavior_pattern.join('\n')}</span>
            <div className="w-full bg-separators-opaque h-[1px]"></div>
            <span className="text-xl">나를 표현하는 이미지</span>
            <span>{result.symbolic_image}</span>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AnalysisResultPage;
