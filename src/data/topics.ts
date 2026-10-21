// "What you'll learn": each topic points at the guides that cover it (numbers match guides.json).
export interface Topic {
  id: string;
  number: string;
  title: string;
  text: string;
  guides: number[];
  art: string; // file name in src/assets/art
}

export const topics: Topic[] = [
  { id: 'growth', number: '01', title: 'Muscle growth science', text: 'How growth is triggered, how the stimulus, recovery and adaptation cycle works, and what research can and cannot tell you.', guides: [1], art: 'topic-growth.jpg' },
  { id: 'training', number: '02', title: 'Training principles', text: 'Progressive overload, effort, volume, load and frequency, and the things you can safely stop worrying about.', guides: [3], art: 'topic-training.jpg' },
  { id: 'technique', number: '03', title: 'Exercise technique', text: 'Choosing exercises by movement pattern, using clearer cues, and knowing when discomfort calls for caution.', guides: [4], art: 'topic-technique.jpg' },
  { id: 'nutrition', number: '04', title: 'Nutrition and protein', text: 'Energy balance, calories, macros, protein and meal planning explained in plain language.', guides: [6, 7, 8], art: 'topic-nutrition.jpg' },
  { id: 'supplements', number: '05', title: 'Supplements', text: 'What works, what might help in some situations, and what is mostly marketing, with supplements always optional.', guides: [9], art: 'topic-supplements.jpg' },
  { id: 'recovery', number: '06', title: 'Recovery', text: 'How sleep, stress, soreness, rest days and fatigue connect to training, and what recovery is and is not.', guides: [10], art: 'topic-recovery.jpg' },
  { id: 'tracking', number: '07', title: 'Progress tracking', text: 'Tracking training, bodyweight and measurements, and reading progress as a trend rather than a single number.', guides: [11], art: 'topic-tracking.jpg' },
  { id: 'programming', number: '08', title: 'Training programming', text: 'Choosing a split, building a weekly structure, progressing over time, and bringing it together in a 12-week sequence.', guides: [5, 12, 2], art: 'topic-programming.jpg' },
];
