export type WorldState = Record<string, unknown>;

export interface WorldModel {
  current: WorldState;
  possible: WorldState[];
  intended: WorldState;
  transitions: TransitionPath[];
}

export interface TransitionPath {
  id: string;
  from: string;
  to: string;
  assumptions: string[];
  effects: string[];
}

export class WorldModelEngine {
  create(current: WorldState, intended: WorldState): WorldModel {
    return { current, possible: [], intended, transitions: [] };
  }

  addPossibility(model: WorldModel, state: WorldState): void {
    model.possible.push(state);
  }

  addTransition(model: WorldModel, transition: TransitionPath): void {
    model.transitions.push(transition);
  }

  snapshot(model: WorldModel): WorldModel {
    return structuredClone(model);
  }
}
