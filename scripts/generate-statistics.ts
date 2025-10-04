import { writeFileSync } from "fs";
import { join } from "path";
import { POLICIES } from "../src/constants.js";

interface PatternStats {
  totalPatterns: number;
  totalCategories: number;
  patternsByCategory: Record<string, number>;
  lastUpdated: string;
}

function generatePatternStats(): PatternStats {
  const patternsByCategory: Record<string, number> = {};

  for (const pattern of POLICIES) {
    const category = pattern.category;
    patternsByCategory[category] = (patternsByCategory[category] || 0) + 1;
  }

  const totalCategories = Object.keys(patternsByCategory).length;

  return {
    totalPatterns: POLICIES.length,
    totalCategories,
    patternsByCategory,
    lastUpdated: new Date().toISOString(),
  };
}

function main(): void {
  const stats = generatePatternStats();
  const outputPath = join(process.cwd(), "category-statistics.json");

  writeFileSync(outputPath, `${JSON.stringify(stats, null, 2)  }\n`);

  console.log(
    `Generated pattern stats: ${stats.totalPatterns} patterns across ${stats.totalCategories} categories`
  );
  console.log(`Written to category-statistics.json`);
}

main();
