import { Flashcard } from '../types';

/**
 * SuperMemo SM-2 Spaced Repetition Algorithm
 * Quality rating scale:
 * 0 - Completely forgot
 * 1 - Wrong answer; memory recalled on reveal
 * 2 - Wrong answer; seemed easy once seen
 * 3 - Correct answer; required heavy effort
 * 4 - Correct answer; slight hesitation
 * 5 - Perfect recall; immediate
 */
export function calculateNextSRS(card: Flashcard, quality: number): Partial<Flashcard> {
  let { repetition, interval, easeFactor } = card;

  if (quality >= 3) {
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetition += 1;
  } else {
    repetition = 0;
    interval = 1;
  }

  // Update Ease Factor: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  const now = new Date();
  const nextDueDate = new Date(now.valueOf() + interval * 24 * 60 * 60 * 1000);
  const dueDateStr = nextDueDate.toISOString().split('T')[0];
  const todayStr = now.toISOString().split('T')[0];

  const history = [...(card.history || []), { date: todayStr, quality }];

  return {
    repetition,
    interval,
    easeFactor,
    dueDate: dueDateStr,
    lastReviewed: todayStr,
    history,
  };
}

export function isCardDue(card: Flashcard): boolean {
  const today = new Date().toISOString().split('T')[0];
  return card.dueDate <= today;
}
