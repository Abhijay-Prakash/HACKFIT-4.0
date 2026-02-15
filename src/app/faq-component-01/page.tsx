import FAQ, {
  type FAQItem,
} from "../../components/shadcn-studio/blocks/faq-component-01/faq-component-01";

const faqItems: FAQItem[] = [
  {
    question: "Do you charge for each upgrade?",
    answer:
      "Some upgrades are free, while others may have an additional cost depending on your track add-ons and hardware requests.",
  },
  {
    question: "Do I need a separate license per build site?",
    answer:
      "Yes. Each HackFit deployment requires a distinct license to keep our telemetry and mentor allocation fair for every region.",
  },
  {
    question: "What is the regular license?",
    answer:
      "The regular license grants access to all shared assets for a single build site with community support and daily syncs.",
  },
  {
    question: "What is the extended license?",
    answer:
      "It unlocks multi-site deployments, private mentor hours, and premium telemetry dashboards built for partner programs.",
  },
];

const FAQPage = () => {
  return <FAQ faqItems={faqItems} />;
};

export default FAQPage;
