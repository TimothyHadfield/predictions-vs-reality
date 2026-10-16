# Predictions vs Reality — Research Notes

The written analysis behind the interactive explorer (`index.html`). It answers the six driving
questions of the project and lists every source. The app's cards, timeline, and forecasts all draw
from the findings below; this file is where the scholarship lives outside the app.

> **A note on honesty:** the goal here is not to mock forecasters. It's to show that forecasting
> *fails in patterned, learnable ways* — and that a few of those patterns explain most of the misses.

---

## The analytical spine

Four ideas do most of the explanatory work across every sector:

1. **Amara's Law** (Roy Amara, ~1978): *"We tend to overestimate the effect of a technology in the
   short run and underestimate the effect in the long run."* This single asymmetry accounts for a
   huge share of tech-prediction error — flying cars (over-promised, never arrived on time) and the
   smartphone/internet (under-imagined) are the same law seen from both ends.
   — [Roy Amara (Wikipedia)](https://en.wikipedia.org/wiki/Roy_Amara) · [Amara's Law and Tech Future (Computer.org)](https://www.computer.org/publications/tech-news/trends/amaras-law-and-tech-future)

2. **Calibration & the Brier score** (Philip Tetlock, the Good Judgment Project): forecasting can be
   *measured*. A Brier score rewards being both accurate and appropriately confident. Tetlock's
   20-year *Expert Political Judgment* study found celebrity pundits were often no better than
   chance, while "superforecasters" — ordinary people reasoning in probabilities, updating often —
   beat intelligence analysts with classified data by ~30%.
   — [Philip E. Tetlock (Wikipedia)](https://en.wikipedia.org/wiki/Philip_E._Tetlock) · [Good Judgment Project evidence (AI Impacts)](https://aiimpacts.org/evidence-on-good-forecasting-practices-from-the-good-judgment-project/)

3. **Optimism / pessimism bias & the planning fallacy** (Kahneman & Tversky): people systematically
   skew their forecasts — and the *direction* of the skew depends on the subject. One striking data
   point: professional forecasters reported ~53% confidence but were correct only ~23% of the time.
   — [Optimism bias (Wikipedia)](https://en.wikipedia.org/wiki/Optimism_bias) · [Pessimism bias (The Decision Lab)](https://thedecisionlab.com/biases/pessimism-bias)

4. **The Black Swan** (Nassim Taleb): the highest-impact events — wars, crashes, pandemics — are
   precisely the ones models miss, because reality has "fat tails" (Extremistan) while most models
   assume mild, bell-curved randomness (Mediocristan). The lesson isn't "predict better," it's
   "build systems that survive what you can't predict."
   — [Black swan theory (Wikipedia)](https://en.wikipedia.org/wiki/Black_swan_theory)

---

## Q1 · How have predictions changed over time?

Forecasting evolved through roughly six eras (see the app's timeline):

- **Oracles & Omens** (antiquity–1600s) — prophecy from authority; unfalsifiable by design.
- **Extrapolation & Almanacs** (1700s–early 1900s) — extend the trend line. Great for steady
  processes; catastrophic when the curve bends (the [Great horse-manure crisis of 1894](https://en.wikipedia.org/wiki/Great_horse_manure_crisis_of_1894)).
- **System Models** (1950s–70s) — computer simulations of whole systems ([Limits to Growth](https://en.wikipedia.org/wiki/The_Limits_to_Growth)).
- **Scenarios & Delphi** (1960s–90s) — map several plausible futures rather than one; [Delphi method](https://en.wikipedia.org/wiki/Delphi_method).
- **Markets & Crowds** (1990s–2010s) — aggregate and *score* forecasts; the breakthrough was
  keeping score.
- **Machine Forecasting** (2010s–now) — ML and LLMs, updating at machine scale.

**The throughline:** what changed most is not *what* we forecast but *how* — from unfalsifiable
authority to measured, probabilistic, continuously-scored judgment.

---

## Q2 · Are people too hopeful or too negative?

Both — and it's sector-dependent, which is the interesting finding:

- **Optimism-skewed sectors: technology & markets.** Wall Street's consensus year-end S&P 500
  target has predicted a *gain every single year for 25 straight years* — never once calling a down
  year, though the market fell in 7 of them, missing the actual return by ~14 points on average.
  — [Market Forecasters' Report Card (Avantis)](https://www.avantisinvestors.com/avantis-insights/market-forecasters-report-card/) · [The Terrible Track Record of Wall Street Forecasts (Daner Wealth)](https://www.danerwealth.com/blog/the-terrible-track-record-of-wall-street-forecasts)

- **Doom-skewed sectors: environment & population.** The mid-century consensus was catastrophist —
  mass starvation, resource exhaustion, overpopulation — and the biggest misses ran in the
  *pessimistic* direction (Ehrlich, below).

The app's **Hope vs Doom** chart computes each sector's average tone directly from the dataset, so
the reader can see the split rather than take it on faith.

---

## Q3 · How has technology enhanced forecasting?

- **Aggregation beats individuals.** Metaculus reports a ~**0.111 Brier score** across thousands of
  resolved questions — the best of any public platform — by combining many forecasts with a
  machine-learning-weighted algorithm. — [Metaculus FAQ](https://www.metaculus.com/faq/)
- **AI is starting to rival humans.** ML has long dominated data-rich domains (weather, quant
  trading); now LLMs reason over the same messy news humans do, and improve by making and scoring
  many predictions at machine scale. — [AI is learning to predict the future (TIME)](https://time.com/7318577/ai-model-forecasting-predict-future-metaculus/)
- **But** technology sharpens the *predictable* (Mediocristan) far more than the *unpredictable*
  (Extremistan). No amount of compute forecasts a coup or a pandemic's exact timing.

---

## Q4 · Which categories are fundamentally unpredictable?

A rough spectrum from clockwork to chaos (see the app's **Predictability Spectrum**):

| Very predictable | ... | Fundamentally unpredictable |
|---|---|---|
| Eclipses & orbits | Demographics (short-term), weather (≤10 days), elections | Markets, geopolitics, black-swan shocks |

- **Weather** is skilled but chaos-capped: beyond ~2 weeks, tiny measurement errors explode.
- **Elections** are genuinely probabilistic — a well-calibrated "90% favorite" *should* lose 1 time
  in 10, which we then misread as the model being "broken."
- **Markets & geopolitics** live deep in Extremistan; the events that matter most are the least
  forecastable. — [Black swan theory (Wikipedia)](https://en.wikipedia.org/wiki/Black_swan_theory)

---

## Q5 · The most famous predictions ever made

Curated in `data/predictions.js` with full sourcing. Highlights and their **failure modes**:

- **Flying cars "within 20 years"** (Rickenbacker, 1924) — *linear extrapolation*. — [Flying car](https://en.wikipedia.org/wiki/Flying_car)
- **"No reason for any individual to have a computer in his home"** (Ken Olsen, 1977) — *ignored the
  exponential*. — [Ken Olsen](https://en.wikipedia.org/wiki/Ken_Olsen)
- **"No chance the iPhone gets significant market share"** (Ballmer, 2007). — [Steve Ballmer](https://en.wikipedia.org/wiki/Steve_Ballmer)
- **"Internet's impact no greater than the fax machine's"** (Krugman, 1998). — [Paul Krugman (Wikiquote)](https://en.wikiquote.org/wiki/Paul_Krugman)
- **"Permanently high plateau"** (Irving Fisher, days before the 1929 crash). — [Irving Fisher](https://en.wikipedia.org/wiki/Irving_Fisher)
- **Dow 36,000 "in 3–5 years"** (1999; actually took ~22). — [Dow 36,000](https://en.wikipedia.org/wiki/Dow_36,000)
- **"Hundreds of millions will starve in the 1970s–80s"** (Ehrlich, *The Population Bomb*, 1968) —
  *ideological*. — [The Population Bomb](https://en.wikipedia.org/wiki/The_Population_Bomb)
- **The Simon–Ehrlich wager** (1980): Ehrlich bet five metals would rise; all five fell. — [Simon–Ehrlich wager](https://en.wikipedia.org/wiki/Simon%E2%80%93Ehrlich_wager)
- **Keynes's 15-hour work week by 2030** (1930): productivity rose, hours didn't. — [Economic Possibilities for our Grandchildren](https://en.wikipedia.org/wiki/John_Maynard_Keynes)
- **The improbable hit:** Leicester City at **5000-to-1** won the 2015–16 Premier League — a live
  demonstration that "extremely unlikely" is not "impossible." — [2015–16 Leicester City season](https://en.wikipedia.org/wiki/2015%E2%80%9316_Leicester_City_F.C._season)
- **The forecast-plus-action success:** the [Montreal Protocol](https://en.wikipedia.org/wiki/Montreal_Protocol)
  banned CFCs and the ozone layer is measurably healing — a dire prediction made *false by heeding it*.

---

## Q6 · What are the current predictions of the future?

Today's best forecasts for 2050–2100, each carried with a **confidence level** in the app
(`data/forecasts2050.js`):

- **Population** ~9.7B by 2050, ~70% urban; then a gentle peak and decline later this century
  (*high* confidence — most 2050 adults are already born). — [Development in 2050 (CGDev)](https://www.cgdev.org/project/development-2050)
- **Aging:** people 65+ projected to outnumber children under 5 (*high*). — [Development in 2050](https://www.cgdev.org/project/development-2050)
- **Climate** on track for ~2.5°C by 2100 under current policies (*medium* — physics is solid, human
  behavior is the variable). — [Predictions of Future Global Climate (UCAR)](https://scied.ucar.edu/learning-zone/climate-change-impacts/predictions-future-global-climate)
- **Energy:** renewables ~60% of supply by 2050 (*medium*). — [2050 World Forecast](https://medium.com/@sl_mar/2050-world-forecast-insights-from-ai-futurist-policy-advisor-da1f6286e8ca)
- **Economy:** center of gravity shifts toward Asia (*medium*).
- **AI & jobs:** large but wildly uncertain workforce effects (*low* — peak Amara's Law). — [4 ways AI will revolutionise the world (UQ)](https://business.uq.edu.au/momentum/4-ways-ai-will-revolutionise-the-world)

---

## Takeaways

1. **The miss is patterned.** Most failures reduce to a handful of modes: straight-lining a curve,
   dismissing an exponential, reasoning from ideology, ignoring base rates, or being blindsided by a
   black swan.
2. **Direction is easier than timing.** Many "wrong" tech forecasts were right about *what* and
   wrong about *when* (self-driving cars, the paperless office). Amara's Law.
3. **Calibration > confidence.** The measurable skill isn't always being right; it's knowing how
   sure to be. That's the whole point of the app's predict-first game.
4. **Some things are unforecastable — plan for them anyway.** In Extremistan, survivability beats
   prediction.

---

*All sources are also linked inline throughout the app and collected in its Sources section.*
