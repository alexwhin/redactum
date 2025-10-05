import DefaultTheme from "vitepress/theme";
import TwoColumnSection from "./components/TwoColumnSection.vue";
import RedactionDemo from "./components/RedactionDemo.vue";
import CustomHero from "./components/CustomHero.vue";
import PatternStats from "./components/PatternStats.vue";
import TestCaseStats from "./components/TestCaseStats.vue";
import RedactionOutput from "./components/RedactionOutput.vue";
import EmojiTitle from "./components/EmojiTitle.vue";
import type { App } from "vue";
import { onMounted } from "vue";
import "./style.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component("TwoColumnSection", TwoColumnSection);
    app.component("RedactionDemo", RedactionDemo);
    app.component("CustomHero", CustomHero);
    app.component("PatternStats", PatternStats);
    app.component("TestCaseStats", TestCaseStats);
    app.component("RedactionOutput", RedactionOutput);
    app.component("EmojiTitle", EmojiTitle);
  },
  setup() {
    onMounted(() => {
      const highlightRedacted = () => {
        const textBlocks = document.querySelectorAll('.vp-code-group div[class*="language-text"] code');
        textBlocks.forEach((block) => {
          if (block.innerHTML && !block.dataset.highlighted) {
            block.innerHTML = block.innerHTML.replace(
              /\[(EMAIL|PHONE|REDACTED|SSN|CREDIT_CARD|API_KEY|PASSWORD|EMPLOYEE_ID|DATABASE_CREDENTIALS|IP_ADDRESS|AWS_KEY|[A-Z_]+)\]/g,
              '<span style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-dark); padding: 2px 6px; border-radius: 4px; font-weight: 600;">[$1]</span>'
            );
            block.dataset.highlighted = "true";
          }
        });

        const jsonBlocks = document.querySelectorAll('.vp-code-group div[class*="language-json"] code');
        jsonBlocks.forEach((block) => {
          if (block.innerHTML && !block.dataset.highlighted) {
            block.innerHTML = block.innerHTML.replace(
              /\[(EMAIL|PHONE|REDACTED|SSN|CREDIT_CARD|API_KEY|PASSWORD|EMPLOYEE_ID|DATABASE_CREDENTIALS|IP_ADDRESS|AWS_KEY|[A-Z_]+)\]/g,
              '<span style="background: var(--vp-c-brand-soft); color: var(--vp-c-brand-dark); padding: 2px 6px; border-radius: 4px; font-weight: 600;">[$1]</span>'
            );
            block.dataset.highlighted = "true";
          }
        });
      };

      highlightRedacted();

      const observer = new MutationObserver(highlightRedacted);
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }
};