/* ============================================================================
 * eras.js — how humanity has forecast the future, era by era.
 * Feeds "The Evolving Crystal Ball" timeline (answers Q1 + Q3).
 * Each era: how it worked, a signature example, and what it got right/wrong.
 * ==========================================================================*/

const ERAS = [
  {
    id: 'oracles',
    period: 'Antiquity – 1600s',
    title: 'Oracles & Omens',
    method: 'The future was read, not calculated — from entrails, stars, dreams and divine intermediaries. Authority came from the prophet, not the evidence.',
    example: 'The Oracle of Delphi advised kings and generals for centuries, often in lines vague enough to be “right” whatever happened.',
    verdict: 'Unfalsifiable by design. Prophecy comforts more than it forecasts.',
    source: { title: 'Pythia / Oracle of Delphi (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Pythia' },
  },
  {
    id: 'extrapolation',
    period: '1700s – early 1900s',
    title: 'Extrapolation & Almanacs',
    method: 'The first “data-driven” forecasting: take today’s trend and extend the line. Powerful for steady processes, disastrous when the curve bends.',
    example: 'The “Great Horse-Manure Crisis” of 1894 — extrapolating city traffic, writers predicted London would be buried under nine feet of manure. The car erased the problem entirely.',
    verdict: 'Straight lines through a world that turns corners. The classic failure mode still with us.',
    source: { title: 'Great horse-manure crisis of 1894 (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Great_horse_manure_crisis_of_1894' },
  },
  {
    id: 'models',
    period: '1950s – 1970s',
    title: 'System Models',
    method: 'Computers let forecasters build models of whole systems — economies, populations, ecosystems — and run them forward under different assumptions.',
    example: 'The Club of Rome’s World3 model (The Limits to Growth, 1972) simulated global resource use and warned of overshoot.',
    verdict: 'Rigorous and transparent — but only as good as the assumptions fed in. Garbage in, prophecy out.',
    source: { title: 'The Limits to Growth (Wikipedia)', url: 'https://en.wikipedia.org/wiki/The_Limits_to_Growth' },
  },
  {
    id: 'scenarios',
    period: '1960s – 1990s',
    title: 'Scenarios & Delphi',
    method: 'Instead of one prediction, map several plausible futures. The RAND Corporation’s Delphi method pooled expert opinion in structured rounds; Shell pioneered corporate scenario planning.',
    example: 'Shell’s scenario teams famously prepared the company for the 1973 oil shock that blindsided competitors.',
    verdict: 'Gave up the false comfort of a single answer — a real advance in honesty about uncertainty.',
    source: { title: 'Delphi method (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Delphi_method' },
  },
  {
    id: 'markets',
    period: '1990s – 2010s',
    title: 'Markets & Crowds',
    method: 'Aggregate many independent guesses and score them relentlessly. Prediction markets, the Good Judgment Project and Brier scoring turned forecasting into a measurable skill.',
    example: 'Tetlock’s “superforecasters” — ordinary people reasoning in probabilities — beat intelligence analysts with classified data by ~30%.',
    verdict: 'The breakthrough: keep score. Calibration, not confidence, is what separates good forecasters from loud ones.',
    source: { title: 'Superforecasting / Good Judgment Project', url: 'https://aiimpacts.org/evidence-on-good-forecasting-practices-from-the-good-judgment-project/' },
  },
  {
    id: 'ai',
    period: '2010s – now',
    title: 'Machine Forecasting',
    method: 'Machine learning digests more data than any human, and large language models now reason over the same messy news humans do — updating at machine scale.',
    example: 'On Metaculus, aggregated forecasts reach a ~0.111 Brier score — the best of any public platform — and AI forecasters are beginning to rival skilled humans.',
    verdict: 'The frontier. Machines sharpen the predictable — but Extremistan (the next section) still humbles every model.',
    source: { title: 'AI is learning to predict the future (TIME)', url: 'https://time.com/7318577/ai-model-forecasting-predict-future-metaculus/' },
  },
];
