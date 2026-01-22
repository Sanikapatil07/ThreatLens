export function getRuleScore(riskLevel) {
  if (riskLevel === "High") return 80;
  if (riskLevel === "Medium") return 50;
  return 20;
}

export function getFinalRiskScore(mlPercentage, ruleScore) {
  if (mlPercentage === null) return ruleScore;

  return Math.round(
    (mlPercentage * 0.6) + (ruleScore * 0.4)
  );
}
