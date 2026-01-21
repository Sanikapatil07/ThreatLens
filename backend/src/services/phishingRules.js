export function analyzeWithRules(message) {
  const suspiciousKeywords = [
    "urgent",
    "verify",
    "click",
    "account",
    "password",
    "bank",
    "login",
    "immediately"
  ];

  const lowerMessage = message.toLowerCase();

  let matchCount = 0;
  const matchedWords = [];

  suspiciousKeywords.forEach((word) => {
    if (lowerMessage.includes(word)) {
      matchCount++;
      matchedWords.push(word);
    }
  });

  let riskLevel = "Low";

  if (matchCount >= 3) {
    riskLevel = "High";
  } else if (matchCount >= 1) {
    riskLevel = "Medium";
  }

  return {
    riskLevel,
    matchedWords
  };
}
