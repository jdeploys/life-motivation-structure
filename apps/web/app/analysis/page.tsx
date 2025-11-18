"use client";
import { cn } from "@repo/ui/shared";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/card/Card";
import question from "@/shared/data/question_1_2.json";
import { useScore } from "@/features/analysis/useScore";
import { Button } from "@repo/ui/Button";
import Link from "next/link";

const AnalysisPage = () => {
  const { setAnswer, setResult, getAnswers } = useScore();
  const answers = getAnswers();

  return (
    <PageLayout>
      <h1 className={cn("text-xl")}>
        현재의 상태에 가장 적절한 답을 선택해주세요.
      </h1>
      <div className={cn("flex flex-col gap-4 my-12")}>
        {question.questions.map((row, index) => (
          <Card key={row.id}>
            <div className="flex flex-col gap-3">
              <div>
                {index + 1}. {row.text}
              </div>
              <div className="flex flex-col gap-2">
                {(Object.keys(getAnswers()) as (keyof typeof answers)[]).map(
                  (key) => (
                    <div key={key} className="flex items-center gap-4">
                      <input
                        type="radio"
                        id={`answer-${key}`}
                        name={`question-${row.id}`}
                        value={key}
                        className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        onChange={(e) => {
                          setAnswer({
                            id: row.id,
                            type: row.type as "A" | "R" | "E" | "M",
                            weight: row.weight,
                            score: Number(e.target.value || 0),
                          });
                        }}
                      />
                      <label htmlFor={`answer-${key}`}>{answers[key]}</label>
                    </div>
                  ),
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div>
        <Button onClick={setResult}>결과 보기</Button>
      </div>
    </PageLayout>
  );
};

export default AnalysisPage;
