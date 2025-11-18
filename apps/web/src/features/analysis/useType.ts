import typeData from "@/shared/data/type.json";

type BaseCode = "A" | "R" | "E" | "M";
type Categories = Record<BaseCode, number>;
type TypeData = typeof typeData;
type TypeKey = keyof TypeData;
type TypeInfo = TypeData[TypeKey];

export const useType = () => {
  function getMotivoType(categories: Categories): TypeInfo | null {
    // entries 변환 (타입 단언으로 확실히 좁혀줌)
    const entries = Object.entries(categories) as [BaseCode, number][];

    if (entries.length === 0) {
      // categories가 비어있을 가능성을 타입 상으로 차단
      return null;
    }

    // 점수 내림차순 정렬
    const sorted = [...entries].sort((a, b) => b[1] - a[1]);

    if (!sorted[0]) {
      return null;
    }

    const [topCode, highestScore] = sorted[0];

    // 모든 점수 0 이하인 경우
    if (highestScore <= 0) {
      return null;
    }

    // 최고 점수인 코드들 모으기
    const topCodes = sorted
      .filter(([, score]) => score === highestScore)
      .map(([code]) => code);

    if (!topCodes[0]) {
      return null;
    }

    let key: string;

    if (topCodes.length === 1) {
      // 단독형
      key = topCodes[0];
    } else {
      // 복합형 - 상위 2개만, 알파벳 순
      const [c1, c2] = topCodes.slice(0, 2);
      key = [c1, c2].sort().join("");
    }

    // 1차: 조합 키로 조회
    if (Object.prototype.hasOwnProperty.call(typeData, key)) {
      return typeData[key as TypeKey];
    }

    // 2차: 단독형 키로 fallback
    const fallback = topCodes[0];
    if (fallback && Object.prototype.hasOwnProperty.call(typeData, fallback)) {
      return typeData[fallback as TypeKey];
    }

    // 그래도 없으면 null
    return null;
  }
  return {
    getMotivoType,
  };
};
