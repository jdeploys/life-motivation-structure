import questions from "@/shared/data/question_2.json";

const forcedChoicePairs = [
  { id: "FC1", A: "A", E: "E" },
  { id: "FC2", M: "M", R: "R" },
  { id: "FC3", A: "A", E: "E" },
  { id: "FC4", M: "M", R: "R" },
  { id: "FC5", E: "E", A: "A" },
  { id: "FC6", R: "R", M: "M" },
  { id: "FC7", A: "A", E: "E" },
  { id: "FC8", M: "M", R: "R" },
];

// ---------- 3) Helper: sum weights per type & min/max theoretical ----------
function sumWeightsByType() {
  const sums = { A: 0, R: 0, E: 0, M: 0 };
  for (const q of questions) sums[q.type] += q.weight;
  return sums;
}
const weightSums = sumWeightsByType();
// For theoretical min/max: min = sumWeights * 1, max = sumWeights * 5

// ---------- 4) Compute raw weighted scores ----------
function computeRawScores(responses) {
  // responses: object { id:score } where score in 1..5
  const raw = { A: 0, R: 0, E: 0, M: 0 };
  for (const q of questions) {
    const r = responses[q.id];
    if (typeof r !== "number" || r < 1 || r > 5) {
      throw new Error(`Missing/invalid response for id ${q.id}`);
    }
    const adjusted = q.reverse ? 6 - r : r;
    raw[q.type] += adjusted * q.weight;
  }
  return raw;
}

// ---------- 5) Theoretical normalization (0..100) ----------
function normalizeTheoretical(raw) {
  const scaled = {};
  for (const t of ["A", "R", "E", "M"]) {
    const min = weightSums[t] * 1;
    const max = weightSums[t] * 5;
    const val = ((raw[t] - min) / (max - min)) * 100;
    scaled[t] = Math.max(0, Math.min(100, val));
  }
  return scaled;
}

// ---------- 6) Forced-choice boost application ----------
function applyForcedChoiceBoost(scaled, chosenType, boost = 5) {
  // boost is in scaled-points (0..100 scale). add and clamp.
  scaled[chosenType] = Math.min(100, scaled[chosenType] + boost);
  return scaled;
}

// ---------- 7) Decision logic ----------
function decideResult(
  scaled,
  options = {
    gapCombo: 15,
    gapComboMin: 5,
    tieThreshold: 5,
    forcedBoost: 5,
    maxForcedRounds: 1,
  },
  userFCChooser = null,
) {
  // userFCChooser: function(topType, secondType, candidates) -> returns chosenType or null
  const order = Object.entries(scaled).sort((a, b) => b[1] - a[1]); // [ [type,score], ... ]
  let top = order[0][0],
    second = order[1][0];
  let gap = scaled[top] - scaled[second];

  // If near-tie (gap < tieThreshold), use forced-choice
  if (gap < options.tieThreshold) {
    // If we have a provided chooser, ask once (or up to maxForcedRounds)
    if (typeof userFCChooser === "function") {
      for (let round = 0; round < options.maxForcedRounds; round++) {
        const chosen = userFCChooser(top, second, forcedChoicePairs);
        if (chosen && ["A", "R", "E", "M"].includes(chosen)) {
          // apply boost and re-evaluate
          applyForcedChoiceBoost(scaled, chosen, options.forcedBoost);
          const newOrder = Object.entries(scaled).sort((a, b) => b[1] - a[1]);
          top = newOrder[0][0];
          second = newOrder[1][0];
          gap = scaled[top] - scaled[second];
          break;
        } else {
          // if no valid choice, break
          break;
        }
      }
    } else {
      // no chooser provided -> return ambiguous combo
      return {
        label: `${top}+${second} (near-equal)`,
        primary: top,
        secondary: second,
        scores: scaled,
        confidence: gap,
        note: "near tie and no forced-choice performed",
      };
    }
  }

  // Now decide final label
  if (gap >= options.gapCombo) {
    return {
      label: top,
      primary: top,
      secondary: second,
      scores: scaled,
      confidence: gap,
    };
  } else if (gap >= options.gapComboMin) {
    return {
      label: `${top}+${second}`,
      primary: top,
      secondary: second,
      scores: scaled,
      confidence: gap,
    };
  } else {
    // fallback (shouldn't reach because tieThreshold handled above)
    return {
      label: `${top}+${second} (weak)`,
      primary: top,
      secondary: second,
      scores: scaled,
      confidence: gap,
    };
  }
}

// ---------- 8) Example usage ----------

// Sample response set 1 - clear A-dominant
const sampleResponsesA = {
  1: 5,
  2: 5,
  3: 4,
  4: 2,
  5: 4,
  6: 2,
  7: 2,
  8: 2,
  9: 2,
  10: 3,
  11: 4,
  12: 2,
  13: 2,
  14: 2,
  15: 2,
  16: 2,
  17: 4,
  18: 2,
  19: 2,
  20: 2,
  21: 2,
  22: 3,
  23: 4,
  24: 2,
};

// Sample response set 2 - near tie A vs E (for forced-choice demo)
const sampleResponsesTie = {
  1: 5,
  2: 5,
  3: 4,
  4: 2,
  5: 4,
  6: 2,
  7: 2,
  8: 2,
  9: 4,
  10: 4,
  11: 4,
  12: 2,
  13: 4,
  14: 4,
  15: 4,
  16: 3,
  17: 2,
  18: 4,
  19: 2,
  20: 2,
  21: 2,
  22: 3,
  23: 4,
  24: 2,
};

// compute & show
function runDemo(responses, name = "demo", userFCChooser = null) {
  console.log(`\n=== Run: ${name} ===`);
  const raw = computeRawScores(responses);
  console.log("raw:", raw);
  const scaled = normalizeTheoretical(raw);
  console.log("scaled (0-100):", scaled);
  const result = decideResult(
    scaled,
    {
      gapCombo: 15,
      gapComboMin: 5,
      tieThreshold: 5,
      forcedBoost: 7,
      maxForcedRounds: 1,
    },
    userFCChooser,
  );
  console.log("result:", result);
}
