"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import question from "@/shared/data/question_2.json";

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

    try {
      next.forEach(({ type, weight, score }) => {
        categories[type] += score * weight;
      });
    } catch {
      const hash = next.findIndex((row) => !row || !row.id) + 1;
      alert(`${hash}번 질문에 응답해주세요.`);
      throw Error(`${hash}번 질문에 응답해주세요.`, {
        cause: hash,
      });
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

  const hasValid = () => {
    if (
      question.questions.length !==
      answers.filter((row) => !!row?.score).length
    ) {
      const next = answers.slice(1);
      const target = next.findIndex((row) => !row?.score);

      if (target !== -1) {
        return target;
      }
    }

    if (answers.length - 1 !== question.questions.length) {
      return answers.length - 1;
    }

    return true;
  }

  return {
    answers,
    hasValid,
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
