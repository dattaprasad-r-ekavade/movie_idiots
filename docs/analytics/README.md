# Channel analytics

Studio exports go here (Analytics → Advanced mode → Export → CSV), named `studio-<tab>-<from>_<to>.csv`. Per-video numbers are merged into [../uploads.csv](../uploads.csv).

## 2026-10-15: content export, 17 Sep – 15 Oct

[studio-content-2026-09-17_2026-10-15.csv](studio-content-2026-09-17_2026-10-15.csv). 9,039 views, 23.4 watch hours, +4 subscribers, average view 18 s.

- **A ceiling at ~1.2k views.** The six best Shorts all stopped at 1,167–1,315 views (Nana Patekar, Sholay, Secret remakes, Wasseypur, Interval, Mr. India). That looks like the first distribution wave ending; none broke out of it.
- **Retention decides the next wave, and it is the gap.** Average percentage viewed peaked at 59% (Sholay, Mr. India). The rest are 38–53%. Shorts usually need much higher retention (and loops) to be pushed past the first wave.
- **Shorter keeps more.** 28–32 s Shorts held 45–59%; 42–47 s held 34–53%. Secret remakes (42 s) held 38%.
- **Famous beats obscure, again.** All six at the ceiling open on a famous film or star. Obscure subjects got 2–245 views (Lunchbox 2, Alam Ara 187, Fearless Nadia 203, Cult flops 245).
- **v2 design holds up.** Mr. India, the first v2 Short, reached 1,167 views in about two days with 59% viewed, tied for the best retention.
- **Mughal-e-Azam: watched but not shown.** 62% viewed (the best) but only 39 views in a day. People who saw it stayed; the feed did not show it widely. That points at the first second (title/hook/topic), not the body.
- **Subscribers barely move.** About 6 from 9k views. Nothing in the Shorts asks viewers to follow or signals a series.
- **Average view duration is rising:** 14–15 s on 10–11 Oct, 19–21 s on 12–14 Oct.
- Thumbnail impressions and CTR in this export come from browse and search, not the Shorts feed, so they say little about Shorts.

Not in this export (export these tabs next): "Viewed vs swiped away" (Shorts), traffic source, daily views per video, audience retention curves, geography, age and gender.

## 2026-10-15: audience export (unique viewers, stayed to watch)

[studio-audience-2026-09-17_2026-10-15.csv](studio-audience-2026-09-17_2026-10-15.csv), daily: [studio-audience-daily-2026-09-17_2026-10-15.csv](studio-audience-daily-2026-09-17_2026-10-15.csv). 3,718 unique viewers (3,215 new), 47.8% stayed to watch, 9,036 views.

- **The ~1.2k "views" ceiling is ~500–650 people watching about twice each.** Views per unique viewer: Sholay 1.9, Nana 2.1, Secret remakes 2.2, Mr. India 2.4, Wasseypur 2.6, Coolie 3.2. Loops and replays already work.
- **Each Short lives for about one day.** Interval: 524 viewers on day 1, 82 on day 2, then ~0. Sholay: 640, then 2. Mr. India: 494 on its first day. A daily upload keeps the channel in the feed; a gap day is a near-zero day (11–12 Oct: 178 and 71 viewers).
- **About half swipe away in the first second.** Stayed to watch: Fearless Nadia 56.9%, Sholay 56.7%, Interval 54.9%, Nana 53.0%, Secret remakes 48.9%, Mr. India 47.6%, Wasseypur 38.5%, Mughal-e-Azam 37.8%, Coolie 32.1%. The first frame and first words are the lever.
- **Topic sets reach; the hook sets the swipe.** Fearless Nadia kept 57% but reached only 109 people (obscure topic); Coolie reached 240 but kept 32%; Mughal-e-Azam kept 38% (its hook does not name the film).
- **Almost everyone is new** (3,215 of 3,718). There is no returning audience yet.
- **Studio data for the last ~2 days is incomplete** (14 Oct shows 0 viewers channel-wide; Mughal-e-Azam 0 unique viewers despite 39 views; Mr. India only its first day). Re-export after 48 hours before judging Mughal-e-Azam and DDLJ.
- The voice started 0.4 s into every Short: silent lead-in during the swipe decision. From 17 Oct it starts at 0.1 s (`LEAD_IN` in `src/collage/timeline.ts`); Shorts rendered before that keep the old lead-in.

## 2026-10-19: content export, 21 Sep – 19 Oct (morning of 19 Oct)

[studio-content-2026-09-21_2026-10-19.csv](studio-content-2026-09-21_2026-10-19.csv), daily per video (top 5 only): [studio-content-daily-…](studio-content-daily-2026-09-21_2026-10-19.csv), channel daily: [studio-totals-daily-…](studio-totals-daily-2026-09-21_2026-10-19.csv). 15,601 views, 45.6 watch hours, +9 subscribers.

- **Two a day works.** 18 Oct (The Lady Killer + 12th Fail) was the best day yet: 3,140 views. Both Shorts got a full first wave (1,526 and 1,162); neither took the other's audience.
- **The Lady Killer is the top Short so far (1,526),** the first above the ~1,200–1,300 ceiling. It is the first one rebuilt in hook → setup → tension → payoff, 29 s, voice from 0.1 s, tight end. One data point, not proof.
- **The ceiling otherwise holds.** Every famous-topic Short sits at 1,160–1,320 (Guide 1,239, DDLJ 1,201, Om Shanti Om 1,200, Mr. India 1,212). Obscure topics stay at 100–250.
- **Still one-day lives.** Guide: 1,227 on day 1, then 6 and 6.
- **This export has no retention data** (no average % viewed or stayed-to-watch), so it cannot say whether the new structure holds viewers longer. `watch_s_per_view` in uploads.csv is watch hours ÷ views; it reads lower than Studio's own average view duration (Sholay 11.5 s vs 19 s in the 15 Oct export), so compare it only with itself.
- Kantara (song) had 46 views at export time: published that morning, so incomplete. Adipurush budget (19 Oct) and Saiyaara / Kantara ROI (20 Oct) are not in this export.

## 2026-10-26: content export, 28 Sep – 26 Oct (morning of 26 Oct)

Files: [2026-10-26/](2026-10-26/) (`Table data.csv`, `Chart data.csv` top 5 daily, `Totals.csv`). 31,038 views, 78.4 watch hours, +19 subscribers. Batch 4 video IDs and stats are now in uploads.csv.

- **The ~1,200 ceiling holds for batch 4.** Kannada/KGF 1,337, Hera Pheri 1,212, Drishyam 1,202, Dangal 1,201, Kaho Naa 1,187, Baahubali 1,133, Naatu Naatu 1,037. The Lady Killer (2,320) is still the only Short past it.
- **Stalls:** Lagaan 24 views after two days, Pushpa 96 after one, 3 Idiots 54 on its first morning. flop-fee also sat at 60 for a day before its 1,183 wave, so these may still get one.
- **Daily views dropped with two a day in the last three days** (24 Oct 1,381; 25 Oct 1,147): only one of the two Shorts got its wave each day. On 18–23 Oct both usually did.
- **Retention proxy (watch hours ÷ views):** 6–10 s per view for 25–30 s Shorts, 20–34 % of the length. Best: Dangal 34 %, Kannada 32 %, Lady Killer 31 %. Worst: Lagaan 17 %, Baahubali 20 %, Kaho Naa 22 %. This proxy reads lower than Studio's own average view duration, so compare it only with itself.
- **Action for batch 5:** shorter scripts (hook, one setup, one tension, payoff, loop; about 20–24 s after the 15 % speed-up) so the payoff comes before most viewers leave.
