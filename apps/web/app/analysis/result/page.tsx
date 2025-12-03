"use client";
import { PageLayout } from "@/components/layout/PageLayout";
import { cn } from "@/shared/cn";
import { useSearchParams } from "next/navigation";
import { useType } from "@/features/analysis/useType";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@repo/ui/card";

interface CardItemProps {
  title: string;
  description: string;
}

const CardItem = ({ title, description }: CardItemProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="whitespace-break-spaces">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

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
        <CardItem
          title={`${result.title} 유형이에요.`}
          description={result.description}
        />
        <CardItem
          title="의미의 언어"
          description={result.representative_sentence}
        />
        <CardItem
          title="대표 문장"
          description={result.language_of_meaning}
        />
        <CardItem
          title="상징적인 순간"
          description={result.representative_scene}
        />
        <CardItem
          title="삶의 동력을 느끼는 순간"
          description={result.emotional_trigger}
        />
        <CardItem
          title="의미의 근간"
          description={result.meaning_origin}
        />
        <CardItem
          title="핵심 감정"
          description={result.core_emotion}
        />
        <CardItem
          title="가장 어려움을 느끼는 상황"
          description={result.hardest_to_endure}
        />
        <CardItem
          title="위기 상황"
          description={result.crisis_state}
        />
        <CardItem
          title="숨기고 싶은 두려움"
          description={result.hidden_fear}
        />
        <CardItem
          title="삶의 동력을 무시하는 긁히는 문장"
          description={result.itching_phrase}
        />
        <CardItem
          title="의미 부여 구조"
          description={result.reward_structure}
        />
        <CardItem
          title="행동 패턴"
          description={result.behavior_pattern.join("\n")}
        />
        <CardItem
          title="나를 표현하는 이미지"
          description={result.symbolic_image}
        />
        <CardItem
          title="그래서 어떻게 살아야 덜 힘들까?"
          description={result.how_to_life}
        />
      </div>
    </PageLayout>
  );
};

export default AnalysisResultPage;
