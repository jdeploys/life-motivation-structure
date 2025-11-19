"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Answer {
  id: number;
  type: "A" | "R" | "E" | "M";
  weight: number;
  score: number;
}

export const useScore = () => {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answer[]>([]);

  const setResult = () => {
    const categories = { A: 0, R: 0, E: 0, M: 0 };
    const next = answers.slice(1);
    if (next.length != 24 || next.find((row) => !row)) {
      // TODO: fallback 처리
      alert("답변에 응답해주세요.");
      return;
    }

    try {
      next.forEach(({ type, weight, score }) => {
        categories[type] += score * weight;
      });
    } catch {
      const hash = next.findIndex((row) => !row || !row.id) + 1;
      alert(`${hash}번 질문에 응답해주세요.`);
      location.hash = `#${hash}`;
      return;
    }

    const total = Object.values(categories).reduce((a, b) => a + b, 0);
    const result = Object.fromEntries(
      Object.entries(categories).map(([k, v]) => [
        k,
        Math.round((v / total) * 100),
      ]),
    );

    router.push(`/analysis/result?type=${JSON.stringify(result)}`);
  };

  return {
    setAnswer: (answer: Answer) => {
      const next = [...answers];
      next[answer.id] = answer;
      setAnswers(next);
    },
    getAnswers: () => ({
      "5": "매우 그렇다",
      "4": "가끔 그렇다",
      "3": "보통이다",
      "2": "그렇지 않다",
      "1": "전혀 아니다",
    }),
    setResult,
  };
};
