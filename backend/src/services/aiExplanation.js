export async function generateExplanation(message, riskLevel, matchedWords) {
  // This is a MOCK AI explanation (no API, no tokens)

  if (matchedWords.length === 0) {
    return "No suspicious patterns were detected in this message.";
  }

  return `This message is classified as ${riskLevel} risk because it contains suspicious indicators such as ${matchedWords.join(
    ", "
  )}. Phishing attacks often use urgency and sensitive keywords to manipulate users into acting quickly.`;
}

