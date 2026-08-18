export interface Experience { id: string; subject: string; outcome: unknown; evidence: string[]; }
export interface KnowledgeItem { id: string; statement: string; evidence: string[]; confidence: number; }
export interface LearningResult { knowledge: KnowledgeItem[]; adaptation: string[]; }

export class UniversalLearningLoop {
  learn(experiences: Experience[]): LearningResult {
    return {
      knowledge: experiences.map((e) => ({ id: `knowledge:${e.id}`, statement: `${e.subject} produced ${String(e.outcome)}`, evidence: e.evidence, confidence: e.evidence.length ? 1 : 0 })),
      adaptation: experiences.map((e) => `evaluate-and-adapt:${e.id}`),
    };
  }
}
