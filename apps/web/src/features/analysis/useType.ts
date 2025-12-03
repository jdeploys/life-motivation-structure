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

    const sorted = [...entries].sort((a, b) => b[1] - a[1]);

    if (!sorted[0]) {
      return null;
    }

    const [topCode, highestScore] = sorted[0];

    // 모든 점수 0 이하인 경우
    if (highestScore <= 0) {
      return null;
    }

    // 1등 이후 점수들
    const scoresAfterTop = sorted.slice(1);

    let key: string;

    if (scoresAfterTop.length === 0) {
      // 코드가 1개뿐인 경우 → 단독형
      key = topCode;
    } else {
      const secondScore = scoresAfterTop[0]?.[1];
      const allRestSame = scoresAfterTop.every(
        ([, score]) => score === secondScore,
      );

      if (allRestSame) {
        // 나머지 점수가 모두 동일 → 명확한 2순위 없음 → 단독형
        key = topCode;
      } else {
        // 명확한 2순위 존재 → 1등 + 2등 조합
        const secondCode = sorted[1]?.[0];
        if (secondCode) {
          key = [topCode, secondCode].join("");
        } else {
          key = topCode;
        }
      }
    }

    // 1차: 조합 키로 조회
    if (Object.prototype.hasOwnProperty.call(typeData, key)) {
      return typeData[key as TypeKey];
    }

    // 2차: 단독형 키로 fallback
    const fallback = topCode;
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
