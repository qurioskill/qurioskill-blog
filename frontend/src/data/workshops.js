const INDIVIDUAL_WORKSHOP_GROUPS = [
  {
    id: "career-design",
    title: "Career Design Studios",
    heading: "Shape a career narrative that feels modern and still human.",
    description:
      "Intimate labs for individuals who want to experiment with storytelling, portfolios, and decision-making in public.",
    workshops: [
      {
        id: "story-sprint",
        title: "Career Story Sprint",
        price: "$129",
        level: "All levels",
        duration: "2 live labs + async prompts",
        goal: "Clarify your positioning and build a narrative that resonates with hiring teams.",
        tags: ["storytelling", "career", "communication"],
        details:
          "Translate your wins into a narrative that recruiters and leaders can follow without a slide deck.",
        outcomes: ["Story spine kit", "Portfolio outline", "Peer review circle"],
        link: "/workshops/individuals"
      },
      {
        id: "practice-lab",
        title: "Practice Lab Membership",
        price: "$49/mo",
        level: "Individual contributors",
        duration: "Monthly micro-sims",
        goal: "Build consistent practice habits around feedback, facilitation, and negotiation.",
        tags: ["practice", "facilitation", "feedback"],
        details:
          "Drop into monthly simulations on negotiation, feedback, and facilitation with guided debriefs.",
        outcomes: ["Micro-sim recordings", "Coach office hours", "Action plan template"],
        link: "/workshops/individuals"
      }
    ]
  },
  {
    id: "digital-individual",
    title: "Digital Fluency Boosters",
    heading: "Build AI-aware habits without waiting for your org.",
    description:
      "Hands-on sessions where individuals explore co-pilots, automation, and analytics in their own sandbox environment.",
    workshops: [
      {
        id: "ai-playground",
        title: "AI Playground",
        price: "$99",
        level: "Beginner",
        duration: "90 min live",
        goal: "Experiment with copilots safely and design prompts that mirror your workflows.",
        tags: ["ai", "digital", "automation"],
        details:
          "Learn prompt ladders, safe experimentation guidelines, and co-pilot workflows for personal productivity.",
        outcomes: ["Prompt ladder", "Experiment tracker", "Safety checklist"],
        link: "/workshops/individuals"
      },
      {
        id: "automation-personal",
        title: "Personal Automation Build",
        price: "$149",
        level: "Intermediate",
        duration: "2 hr live build",
        goal: "Ship one automation that saves you time every week.",
        tags: ["automation", "systems", "digital"],
        details:
          "Ship one automated workflow using no-code tools and leave with a maintenance plan you can run solo.",
        outcomes: ["Automation storyboard", "Tool comparison", "Maintenance checklist"],
        link: "/workshops/individuals"
      }
    ]
  }
];

const ORGANIZATION_WORKSHOP_GROUPS = [
  {
    id: "digital-skills",
    title: "Digital Skills Labs",
    heading: "Build intuitive, AI-ready digital habits for your teams.",
    description:
      "Each digital sprint combines async simulations with live coaching to help teams ship automation wins and data-informed stories.",
    workshops: [
      {
        id: "ops-automation",
        title: "Automation Jumpstart",
        price: "Free",
        level: "Intermediate",
        duration: "90 min live + prep kit",
        details:
          "Pair up to rethink one workflow using no-code automation, AI co-pilots, and lightweight measurement templates.",
        outcomes: ["Automation storyboard", "AI prompt vault", "Adoption playbook"],
        link: "/workshops/organizations"
      },
      {
        id: "ai-primer",
        title: "AI Primer for Team Leads",
        price: "$149",
        level: "Manager",
        duration: "60 min live + coaching clinic",
        details:
          "Ground your team in responsible AI usage with practical guardrails, prompt ladders, and use-case prioritization canvases.",
        outcomes: ["AI readiness scorecard", "Prompt ladder", "Use-case backlog"],
        link: "/workshops/organizations"
      },
      {
        id: "data-story-studio",
        title: "Data Story Studio",
        price: "$249",
        level: "Advanced",
        duration: "2 hr live + async micro-sims",
        details:
          "Transform messy dashboards into narratives stakeholders remember by practicing with our micro-sim scenario stack.",
        outcomes: ["Story spine templates", "Visualization checklist", "Exec readout kit"],
        link: "/workshops/organizations"
      }
    ]
  },
  {
    id: "professional-skills",
    title: "Professional Skills Labs",
    heading: "Coach-ready experiences for people-first leaders.",
    description:
      "Help managers and individual contributors sharpen facilitation, feedback, and storytelling skills with guided practice.",
    workshops: [
      {
        id: "facilitation-lab",
        title: "Facilitation Lab Intensive",
        price: "$249",
        level: "Manager",
        duration: "2-week blended cohort",
        details:
          "Practice designing and leading hybrid sessions with real-time coaching, observation rubrics, and async micro-sims.",
        outcomes: ["Facilitation rubric", "Session storyboard", "Feedback loop"],
        link: "/workshops/organizations"
      },
      {
        id: "coaching-1-1",
        title: "Coaching Conversations 1:1",
        price: "Free",
        level: "People managers",
        duration: "75 min live + text nudges",
        details:
          "Learn the CURIOS coaching loop, practice with peers, and leave with scripts to unblock sticky conversations.",
        outcomes: ["Conversation scripts", "CURIOS cheat sheet", "Nudge series"],
        link: "/workshops/organizations"
      },
      {
        id: "storytelling-customers",
        title: "Customer Storytelling Lab",
        price: "$199",
        level: "Customer teams",
        duration: "90 min live + async roleplays",
        details:
          "Enable customer success and sales partners to frame value stories that feel human, concise, and measurable.",
        outcomes: ["Story spine", "Chorus-ready scripts", "Call recap template"],
        link: "/workshops/organizations"
      }
    ]
  }
];

const flattenWorkshops = (groups) =>
  groups.flatMap((group) =>
    group.workshops.map(({ id, title, price, details, link }) => ({
      id,
      title,
      price,
      details,
      link
    }))
  );

export const INDIVIDUAL_WORKSHOPS = INDIVIDUAL_WORKSHOP_GROUPS;
export const ORGANIZATION_WORKSHOPS = ORGANIZATION_WORKSHOP_GROUPS;
export const INDIVIDUAL_PREVIEW_WORKSHOPS = flattenWorkshops(INDIVIDUAL_WORKSHOP_GROUPS);
export const ORGANIZATION_PREVIEW_WORKSHOPS = flattenWorkshops(ORGANIZATION_WORKSHOP_GROUPS);
export const HOME_WORKSHOPS = [...INDIVIDUAL_PREVIEW_WORKSHOPS, ...ORGANIZATION_PREVIEW_WORKSHOPS].slice(0, 4);
