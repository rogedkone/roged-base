import { MajorOrder } from '../types';

// @ts-ignore
export const getMajorPlanetsId = (order: MajorOrder) => order?.setting.tasks
  .map(({ values }) => values[2]);

export const factionParse = (faction: 'Terminids' | 'Automatons') => ({
  Terminids: '<b>Терминиды</b>',
  Automatons: '<b>Автоматоны</b>',
}[faction]);
