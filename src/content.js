/**
 * Editable business content.
 * Service descriptions are proposed and must be confirmed by Delta before launch.
 * Add only verified company information and projects with permission to publish.
 * Set formEndpoint to a working HTTPS enquiry endpoint before accepting enquiries.
 */
export const site = {
  name: "DELTA DEMOLITION",
  area: "Toronto and the GTA",
  email: null,
  phone: null,
  formEndpoint: null,
  proposedServices: true,
  serviceAreas: [
    "Toronto",
    "Etobicoke",
    "North York",
    "Scarborough",
    "Mississauga",
    "Brampton",
    "Vaughan",
    "Markham",
    "Richmond Hill",
    "Oakville",
  ],
};

export const proposedServices = true;

export const services = [
  {
    slug: "residential",
    title: "Residential Demolition",
    category: "Residential",
    kicker: "MAKE ROOM FOR WHAT’S NEXT",
    description:
      "From an interior renovation to a complete rebuild, start with a clearly defined demolition scope.",
    image: "/images/residential.webp",
    imageAlt: "Excavator removing part of a brick house",
    offerings: [
      "House and garage demolition",
      "Interior strip-outs",
      "Kitchen and bathroom removal",
      "Deck and shed removal",
    ],
    scope: [
      "Every residential site has its own constraints. The starting point is understanding what needs to come out, what needs to stay, and how the work fits into your renovation or rebuild.",
      "An assessment helps define access, neighbouring properties, utility coordination, material handling and the condition required for handover. Share your plans, site photographs and intended schedule to help establish the scope.",
    ],
    faqs: [
      {
        question: "Can I request demolition for part of my home?",
        answer:
          "Yes. Describe the rooms, finishes or structures you want removed and the areas you want retained. The proposed scope can then be reviewed against the existing structure and your renovation plans.",
      },
      {
        question: "Do I need a demolition permit?",
        answer:
          "Permit requirements depend on the municipality and the work involved. Confirm the requirements with your local building department. Permit responsibilities should be agreed in writing before work starts.",
      },
      {
        question: "What should I prepare for an estimate?",
        answer:
          "Provide the property location, a description of the work, photographs or drawings if available, access details and your preferred timing. Identify any known utility or hazardous-material concerns.",
      },
    ],
  },
  {
    slug: "commercial",
    title: "Commercial Demolition",
    category: "Commercial",
    kicker: "PREPARE THE SPACE. KEEP THE PLAN MOVING.",
    description:
      "Prepare commercial spaces for their next use with scope, access and site coordination considered from the start.",
    image: "/images/commercial.webp",
    imageAlt: "Excavator dismantling a brick building",
    offerings: [
      "Office and retail strip-outs",
      "Tenant space preparation",
      "Partition and ceiling removal",
      "Commercial interior demolition",
    ],
    scope: [
      "Commercial demolition starts with a clear understanding of the space, the building’s requirements and the next phase of construction. A defined scope helps owners, contractors and property managers coordinate the work.",
      "Planning should account for loading access, shared areas, neighbouring tenants, working hours and debris routes. Any retained services, finishes or structural elements should be identified before removal begins.",
    ],
    faqs: [
      {
        question:
          "Can demolition be planned around building access restrictions?",
        answer:
          "Share loading dock rules, elevator access, working-hour restrictions and property management requirements with your enquiry. These constraints can be reviewed when preparing the scope and schedule.",
      },
      {
        question: "What information is useful for a commercial estimate?",
        answer:
          "Floor plans, a removal schedule, site photographs, landlord requirements and your intended handover date all help. Include any information about occupied areas or services that must remain operational.",
      },
      {
        question: "Is debris handling included?",
        answer:
          "Debris handling, container placement, removal routes and disposal responsibilities should be specified in the project estimate. The site assessment helps determine an appropriate approach.",
      },
    ],
  },
  {
    slug: "selective",
    title: "Selective Demolition",
    category: "Selective",
    kicker: "REMOVE WITH PURPOSE",
    description:
      "Targeted removal for renovations and alterations, with clear boundaries around what stays and what goes.",
    image: "/images/selective.webp",
    imageAlt:
      "Apartment interior with walls and trim exposed during renovation",
    offerings: [
      "Non-structural wall removal",
      "Flooring and finish removal",
      "Targeted interior removal",
      "Preparation for renovation",
    ],
    scope: [
      "Selective demolition focuses on defined parts of a building. Clear removal drawings and a shared understanding of retained elements help make the work suitable for the next trade.",
      "Before work begins, the scope should identify structural questions, concealed services, protection needs and material handling. Structural alterations and suspected hazardous materials require appropriate assessment before removal can proceed.",
    ],
    faqs: [
      {
        question: "How do you identify what needs to remain?",
        answer:
          "Use drawings, photographs and a site walk-through to mark the removal boundaries and retained elements. These details should be confirmed in the agreed scope before work starts.",
      },
      {
        question: "Can a load-bearing wall be removed?",
        answer:
          "A structural professional must assess proposed changes to load-bearing elements. Engineering, permits, support arrangements and demolition responsibilities must be resolved before any structural removal.",
      },
      {
        question: "What happens if unexpected materials are found?",
        answer:
          "Unexpected conditions need to be assessed before affected work continues. Suspected hazardous materials require qualified assessment and, where needed, a specialist removal scope.",
      },
    ],
  },
];

// Genuine Delta projects only. Stock imagery must never be presented as company work.
// Schema: { slug, title, location, category, description, image, imageAlt, scope: [] }
export const projects = [];

export const planningPoints = [
  {
    title: "Understand the site",
    description:
      "Review the existing conditions, proposed removals and the elements that need to remain.",
  },
  {
    title: "Define the scope",
    description:
      "Agree on the work, responsibilities and handover requirements before the project begins.",
  },
  {
    title: "Plan the access",
    description:
      "Account for entry points, neighbouring properties, loading areas and working-hour restrictions.",
  },
  {
    title: "Coordinate debris handling",
    description:
      "Plan material separation, container placement and removal routes around the site.",
  },
  {
    title: "Prepare for handover",
    description:
      "Check the completed scope and confirm the site condition needed for the next phase.",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Tell us about the project",
    description:
      "Share your location, the work you have in mind and your preferred timing.",
  },
  {
    number: "02",
    title: "Assess the site",
    description:
      "Review site conditions, access and any details that affect the demolition scope.",
  },
  {
    number: "03",
    title: "Agree on the plan",
    description:
      "Confirm the scope, estimate, responsibilities and proposed schedule.",
  },
  {
    number: "04",
    title: "Clear the way",
    description:
      "Carry out the agreed work and review the site for handover to the next phase.",
  },
];

export const generalFaqs = [
  {
    question: "What areas do you serve?",
    answer:
      "Delta’s service area is Toronto and the Greater Toronto Area. Include the project address or nearest intersection in your enquiry so availability and site access can be confirmed.",
  },
  {
    question: "What affects the cost of demolition?",
    answer:
      "The scope, building materials, access, disposal requirements and site conditions all affect an estimate. Drawings and photographs help, and a site assessment may be needed before pricing can be confirmed.",
  },
  {
    question: "Can I get an estimate before my plans are final?",
    answer:
      "You can start a conversation with an outline of the project. Identify which decisions are still open, as changes to the scope or site conditions may affect the estimate.",
  },
  {
    question: "How should I prepare the site?",
    answer:
      "Preparation depends on the agreed scope. Permits, utilities, personal belongings, access and any hazardous-material assessments should be discussed before work is scheduled.",
  },
  {
    question: "Do you handle hazardous materials?",
    answer:
      "Suspected asbestos, lead and other hazardous materials need qualified assessment. Any specialist removal requirements must be identified and addressed before the affected demolition work proceeds.",
  },
];
