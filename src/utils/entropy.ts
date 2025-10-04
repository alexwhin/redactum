/**
 * Calculates Shannon entropy of a string to measure randomness.
 *
 * @public
 * @param text - The text to calculate entropy for
 * @returns Entropy value between 0 and 8 (higher means more random)
 * @example
 * ```typescript
 * const entropy = redactumCalculateEntropy("abc123");
 * console.log(entropy);
 * ```
 */
export function redactumCalculateEntropy(text: string): number {
  if (!text || text.length === 0) {
    return 0;
  }

  const frequencies = new Map<string, number>();

  for (const char of text) {
    frequencies.set(char, (frequencies.get(char) ?? 0) + 1);
  }

  let entropy = 0;
  const length = text.length;

  for (const count of frequencies.values()) {
    const probability = count / length;
    entropy -= probability * Math.log2(probability);
  }

  return entropy;
}

/**
 * Heuristic check to determine if a string looks like a secret or API key.
 *
 * @public
 * @param text - The text to analyze
 * @param minLength - Minimum length to consider (default: 16)
 * @param entropyThreshold - Entropy threshold for randomness (default: 4.5)
 * @returns True if the text appears to be a secret
 * @example
 * ```typescript
 * const isSecret = redactumLooksLikeSecret("sk_live_4eC39HqLyjWDarjtT1zdp7dc");
 * console.log(isSecret);
 * ```
 */
export function redactumLooksLikeSecret(
  text: string,
  minLength: number = 16,
  entropyThreshold: number = 4.5
): boolean {
  if (text.length < minLength) {
    return false;
  }

  const entropy = redactumCalculateEntropy(text);

  if (entropy > entropyThreshold) {
    return true;
  }

  const hasUpperCase = /[A-Z]/.test(text);
  const hasLowerCase = /[a-z]/.test(text);
  const hasNumbers = /[0-9]/.test(text);
  const hasSpecialChars = /[^A-Za-z0-9]/.test(text);

  const complexityScore = [
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    hasSpecialChars,
  ].filter(Boolean).length;

  return complexityScore >= 3 && entropy > 3.5;
}
