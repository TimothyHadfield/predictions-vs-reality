# Predictions vs Reality: progress

## START HERE
Read order: this file, then `CLAUDE.md` (file map, how to run and verify), then `RESEARCH.md` only
if the task touches the analysis text. Last updated 2026-10-16.

## Goal right now
None active. The page is published and finished as a showcase; the 2026-10-16 sweep fixed small
defects only.

## Status
| Area | State |
|---|---|
| Live site | Up at https://timothyhadfield.github.io/predictions-vs-reality/ |
| All 8 sections | Work at 393px (WebKit) and 1440px, both themes, no console errors (2026-10-16) |
| Tests | None (static page); verified with phone-view, see CLAUDE.md |
| 2026-10-16 sweep | Fixed: spectrum labels near-invisible on the dark theme, dead Keynes source link (404), unreadable bias-chart numbers on short bars, favicon 404 console error, `aria-selected` on era tabs. Handoff files added. Lighthouse (mobile, loaded laptop): perf 77, a11y 96, best practices 96 → 100. |

## Authorized next steps
None.

## Standing instructions
- No quoted instructions from Tim recorded for this project yet. Global rules apply.

## Traps
- See CLAUDE.md "Traps". Three source sites (medium.com, cgdev.org, metaculus.com) answer 403 to
  scripts, so a scripted link check reports them as broken when they may be fine.

## Decisions
- 2026-10-16: Keynes 15-hour-week source now points to the John Maynard Keynes Wikipedia article
  (the essay's own article no longer exists); link label changed to match the other entries.
- 2026-10-16: bias-chart numbers that don't fit inside their bar sit just past the bar's end in
  the body-text colour, instead of white text spilling onto the pale track.

## NOT verified
- The three 403 source links above, in a real browser.
- Real iPhone Safari (only WebKit at iPhone size was used).

## Rejected / parked
- (none)
