/* ============================================================================
 * forecasts2050.js — current, live predictions of the future.
 * Feeds "The Forecast Horizon" (answers Q6). Each carries a CONFIDENCE level,
 * because a forecast without a confidence is just an opinion.
 *   confidence: 'high' | 'medium' | 'low'  (how much the evidence supports it)
 * ==========================================================================*/

const FORECASTS = [
  {
    id: 'population-2050',
    sector: 'demographics',
    horizon: '2050',
    headline: '~9.7 billion people',
    detail: 'World population is projected near 9.7 billion by 2050, with about 70% living in cities. Growth is concentrating in Africa while much of Asia and Europe age and shrink.',
    confidence: 'high',
    note: 'Demographics is among the most predictable domains — most people alive in 2050 are already born.',
    source: { title: 'Development in 2050 (Center for Global Development)', url: 'https://www.cgdev.org/project/development-2050' },
  },
  {
    id: 'aging-2050',
    sector: 'demographics',
    horizon: '2050',
    headline: 'Elders outnumber toddlers',
    detail: 'For the first time, people aged 65+ are projected to outnumber children under 5 — reshaping healthcare, pensions and the demand for care robots.',
    confidence: 'high',
    note: 'A near-lock: the arithmetic of aging is already baked into today’s population pyramid.',
    source: { title: 'Development in 2050 (Center for Global Development)', url: 'https://www.cgdev.org/project/development-2050' },
  },
  {
    id: 'climate-2100',
    sector: 'environment',
    horizon: '2100',
    headline: '~2.5°C warmer',
    detail: 'On current policies, global temperatures are on track for roughly 2.5°C above pre-industrial levels by 2100 — overshooting the 1.5–2°C targets.',
    confidence: 'medium',
    note: 'The physics is well understood; the wide range comes from an unknown — how fast humans cut emissions.',
    source: { title: 'Predictions of Future Global Climate (UCAR)', url: 'https://scied.ucar.edu/learning-zone/climate-change-impacts/predictions-future-global-climate' },
  },
  {
    id: 'energy-2050',
    sector: 'environment',
    horizon: '2050',
    headline: 'Renewables ~60% of energy',
    detail: 'Renewable sources are projected to supply around 60% of global energy by 2050, with fossil generation heading toward zero in the following decades.',
    confidence: 'medium',
    note: 'Cost curves favor it strongly — but grid, policy and geopolitics could speed it up or stall it.',
    source: { title: '2050 World Forecast (Medium / policy analysis)', url: 'https://medium.com/@sl_mar/2050-world-forecast-insights-from-ai-futurist-policy-advisor-da1f6286e8ca' },
  },
  {
    id: 'economy-2050',
    sector: 'markets',
    horizon: '2050',
    headline: 'The economic center moves East',
    detail: 'Most long-range projections put China and India among the largest economies by 2050, shifting the global balance of economic power toward Asia.',
    confidence: 'medium',
    note: 'Trend is robust; the exact ranking is sensitive to growth rates and shocks decades out.',
    source: { title: '2050 World Forecast (Medium / policy analysis)', url: 'https://medium.com/@sl_mar/2050-world-forecast-insights-from-ai-futurist-policy-advisor-da1f6286e8ca' },
  },
  {
    id: 'ai-jobs-2050',
    sector: 'tech',
    horizon: '2050',
    headline: 'AI reshuffles the workforce',
    detail: 'Common estimates suggest AI could displace a large share of routine jobs while creating new roles in tech and creative work — but the numbers vary wildly between forecasters.',
    confidence: 'low',
    note: 'Peak Amara’s Law: near-certain to matter enormously long-term, near-impossible to size precisely short-term.',
    source: { title: '4 ways AI will revolutionise the world (Univ. of Queensland)', url: 'https://business.uq.edu.au/momentum/4-ways-ai-will-revolutionise-the-world' },
  },
];

const CONFIDENCE_META = {
  high:   { label: 'High confidence',   color: '#0ca30c', width: 0.9 },
  medium: { label: 'Medium confidence', color: '#fab219', width: 0.6 },
  low:    { label: 'Low confidence',    color: '#d03b3b', width: 0.3 },
};
