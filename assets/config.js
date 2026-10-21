export const S_INTEREST = "S_INTEREST";
export const S_AGREEMENT = "S_AGREEMENT";
export const S_INTO = "S_INTO";
export const S_UNSET = "S_UNSET";

export const SCALES = {
  [S_INTEREST]: {
    caption: "I am [x] interested in...",
    values: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  },
  [S_AGREEMENT]: {
    caption: "I agree/disagree with this statement...",
    values: ["Strongly Disagree", "Disagree", "Neither Agree/Disagree", "Agree", "Strongly Agree"]
  },
  [S_INTO]: {
    caption: "I am [x] into...",
    values: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  },
  [S_UNSET]: {
    caption: "I am UNSET [x] into...",
    values: ["Never", "Rarely", "Sometimes", "Often", "Always"]

  }
}

export const GROUPS = [
  {
    "caption": "Partner Choice",
    "kinks": [
      "I enjoy working with males",
      "I enjoy working with females",
      "I enjoy working with trans people",
      "I enjoy working with gender-fluid people",
      "Gender doesn't matter to me"
    ],
    "sides": [
      "General"
    ],
    scale: S_INTEREST
  },
  {
    "caption": "Trance Behaviour",
    "kinks": [
      "I am a very suggestible person",
      "I need a very safe environment",
      "I drop very easily",
      "I move or twitch a lot while under",
      "I come out of trance easily",
      "I am disoriented after coming back",
      "I experience amnesia after coming back"
    ],
    "sides": [
      "No Suggestions"
    ],
    scale: S_AGREEMENT
  },
  {
    "caption": "Safety Agreements",
    "kinks": [
      "Having an Unknown play partner",
      "Importance of Trust",
      "In-Depth Safety talk",
      "Long Pre-Trance talk",
      "Post Trance talk/Aftercare",
      "Less Rapport/Empathy,More Trances",
      "Knowing what will happen before Trance",
      "Deleting the Triggers after the session",
      "Being told to wake up if necessary"
    ],
    "sides": [
      "General"
    ],
    scale: S_INTO,
  },
  {
    "caption": "Consent Preferences",
    "kinks": [
      "Wishing for things to happen in the Trance",
      "Having Clear consent before going under",
      "Other People watching the trance",
      "Being shown off to others while tranced",
      "Dropping without Warning",
      "Triggers being used without warning",
      "Triggers being used in public"
    ],
    "sides": [
      "Giving",
      "Receiving"
    ],
    scale: S_INTO,
  },
  {
    "caption": "Types Of Trance",
    "kinks": [
      "Non-erotic For Fun/Recreational",
      "Non-erotic Therapeutic",
      "Erotic",
      "Covert",
      "Stage-Style",
      "BDSM components",
      "Dom/Slave components"
    ],
    "sides": [
      "Giving",
      "Receiving"
    ],
    scale: S_INTO,
  },
  {
    "caption": "Medium and Context",
    "kinks": [
      "Text",
      "Audio",
      "Video",
      "In person",
      "Multiple hypnotists at once",
      "Multiple subjects at once (Group Trance)"
    ],
    "sides": [
      "Giving",
      "Receiving"
    ],
    scale: S_INTO
  },
  {
    "caption": "Stimuli",
    "kinks": [
      "Auditory (files, binurals, etc)",
      "Kinesthetic (Self Body Movement)",
      "Visual (Spirals, Videos, etc)"
    ],
    "sides": [
      "Giving",
      "Receiving"
    ],
    scale: S_INTO
  },
  {
    "caption": "Stimuli Specifics",
    "kinks": [
      "Binaurals",
      "Snapping fingers",
      "Spirals",
      "Pendulums",
      "Shiny items",
      "Crystals",
      "Flashing light",
      "Pocket watch",
      "Metronome",
      "Hand movements/signs"
    ],
    "sides": [
      "Giving",
      "Receiving"
    ],
    scale: S_INTO
  },
  {
    "caption": "Suggestions 1",
    "kinks": [
      "Post-hypnotic suggestions",
      "Catalepsy(trouble staying awake)",
      "Immobilization",
      "Levitation(floating)",
      "Freeze / ‘Stop’ Triggers",
      "Being Blank and empty",
      "Having Amnesia",
      "Repeating Mantras",
      "Positive Hallucination",
      "Negative Hallucination",
      "Mind melting",
      "Brainwashing",
      "Mind control",
      "Transformation(into furries)",
      "Transformation(into animals)",
      "Behavior modification",
      "Personality play",
      "Gender Play",
      "Pet play",
      "Complete control to the Tist",
      "Daddy and little play",
      "Surrendering as a sub",
      "Submission",
      "Simulated Drugging",
      "Being playful",
      "Being naughty",
      "Captivity / helplessness",
      "Power play",
      "Passiveness",
      "Orgasm trigger",
      "Seduction",
      "Unawareness of following Commands",
      "Unawareness of Moving or Actions",
      "Touch-free pleasure",
      "Touch-free orgasm"
    ],
    "sides": [
      "Giving",
      "Receiving"
    ],
    scale: S_INTO
  },
  {
    "caption": "Suggestions 2",
    "kinks": [
      "Feminization",
      "Masculinization",
      "Dollification",
      "Robotization",
      "Objectification",
      "Bimbofication",
      "Sissy training",
      "Diaper Play",
      "IQ Play",
      "Memory play",
      "Furry Play",
      "Rape play",
      "BDSM Play",
      "D/S-Play",
      "Consensual non consent",
      "Blackmail",
      "Watersports",
      "Obedience",
      "Pain triggers",
      "Tease and release",
      "Tease and denial",
      "Ruined Orgasms",
      "Edging",
      "Covert Dom / Slave Play",
      "Resistance Play",
      "Indirect sexual desc of Self",
      "Direct sexual desc of Self",
      "Getting attention",
      "Being guided",
      "Being ordered to undress",
      "Being ordered to masturbate",
      "Being ordered to do something",
      "Being forced to do something"
    ],
    "sides": [
      "Giving",
      "Receiving"
    ],
    scale: S_INTO
  },
  {
    "caption": "Personal Traits/Preferences",
    "kinks": [
      "do Resistance Play",
      "be Bratty",
      "be surprised",
      "Talk/Type while under",
      "have Long trance sessions",
      "Drool under trance",
      "have Eye rolling",
      "Watch others go under",
      "Watch others hypnotize someone",
      "Hypnotist doing what they want( C-N-C )"
    ],
    "sides": [
      "You like to…"
    ],
    scale: S_UNSET
  },
  {
    "caption": "Preferred Role",
    "kinks": [
      "Being submissive",
      "Receiving Dominance",
      "Being Dominant",
      "Receiving Submission",
      "Being a Switch",
      "Receiving both Sub and Dom attention"
    ],
    "sides": [
      "you usually are"
    ],
    scale: S_UNSET
  },
  {
    "caption": "Induction Preferences",
    "kinks": [
      "With Slow speech",
      "With Faster speech",
      "With Soothing or Whispering extra Voices",
      "With Visual elements",
      "With Auditory elements"
    ],
    "sides": [
      "Add-on/Extras"
    ],
    scale: S_UNSET
  },
  {
    "caption": "Induction Types",
    "kinks": [
      "Relaxation",
      "Conversational",
      "Confusion",
      "Countdown",
      "Mirroring",
      "Instant inductions",
      "Fractionation",
      "Eye fixation",
      "Focusing on an Object/Person",
      "Overloading/Brain Overwhelming",
      "Progressive Muscle Relaxation",
      "Recalling Last trance"
    ],
    "sides": [
      "Giving",
      "Receiving"
    ],
    scale: S_UNSET
  },
  {
    "caption": "Emotion Play",
    "kinks": [
      "Various Amounts of Pleasure",
      "Exploring fantasies",
      "Impersonal Experiences(Out of Body)"
    ],
    "sides": [
      "I enjoy"
    ],
    scale: S_UNSET
  },
  {
    "caption": "Emotion Play Specifics",
    "kinks": [
      "Beautiful and Sexy",
      "Empowered and focused",
      "Safe and protected",
      "Horny and Aroused",
      "Slutty and Naughty",
      "Floaty and Drifting",
      "Ditzy and Dumb",
      "Captive and Enslaved",
      "Objectified and Degraded",
      "Vulnerable and Exposed",
      "Emotionless and Empty",
      "Helpless but Aware",
      "Fearful and Scared"
    ],
    "sides": [
      "I enjoy Feeling…"
    ],
    scale: S_UNSET
  },
  {
    "caption": "Coming Out Of Trance",
    "kinks": [
      "Slow counts back up to 10",
      "Wake up trigger",
      "Only counting to three",
      "Just being told to come back or wake up"
    ],
    "sides": [
      "Giving",
      "Receiving"
    ],
    scale: S_UNSET
  }
];