import type { NewsArticle } from "./types";
import { G } from "./players";

/**
 * Real volleyball news, current as of July 24, 2026.
 * Sources: volleyballworld.com, FIVB, NCAA.org, AP News.
 */
export const news: NewsArticle[] = [
  {
    id: "n1",
    headline: "VNL 2026 Finals: Semifinal Clashes Set in Macao — Italy vs Brazil, China vs Türkiye",
    category: "Pro",
    summary:
      "Saturday decides Sunday's gold medal match: defending champions Italy meet Brazil at 16:00, then hosts China battle Türkiye at 19:30 at the Macau East Asian Games Dome.",
    body: "The women's Volleyball Nations League Finals in Macao reach the semifinal stage on Saturday, July 25. Defending champions Italy face Brazil — the two met in last year's title match — at 16:00 local time, followed by hosts China against 2023 champions Türkiye at 19:30. Türkiye's quarterfinal win moved them up to #3 in the FIVB World Ranking, overtaking the United States. The bronze medal match is Sunday at 15:30, with the gold medal showdown at 19:30. Every match streams live on VBTV.",
    date: "Jul 24, 2026",
    emoji: "🏟️",
    gradient: G.fire,
  },
  {
    id: "n2",
    headline: "China Stuns USA 3-2 in Front of 4,400 Home Fans to Reach VNL Semifinals",
    category: "Pro",
    summary:
      "The hosts upset the Preliminary Phase winners in a five-set thriller (15-25, 25-23, 25-20, 17-25, 15-13) — their first semifinal since 2023.",
    body: "World #7 China knocked out world #3 USA in a rollercoaster quarterfinal in Macao, winning the tiebreaker 15-13. Zhuang Yushan, 22, led China with 17 points, while China out-blocked the Americans 9-7 and made six fewer unforced errors. Jordan Thompson was the match's top scorer with 24 points and Dana Rettke added 18 with four kill blocks, but the three-time VNL champions will now miss the semifinals for the third consecutive year. China meets Türkiye on Saturday for a place in the final.",
    date: "Jul 23, 2026",
    emoji: "🇨🇳",
    gradient: G.ocean,
  },
  {
    id: "n3",
    headline: "Ana Cristina Powers Brazil Past Japan 3-1 and Into a Semifinal Against Italy",
    category: "Pro",
    summary:
      "The 22-year-old outside hitter was in 'high-voltage mode' as Brazil reached their seventh VNL semifinal.",
    body: "World #2 Brazil defeated Japan 3-1 (24-26, 25-22, 25-16, 25-20) in the Macao quarterfinals. After dropping a tight first set, Brazil took control behind Ana Cristina — including a blistering back-row pipe to close set three — while Julia Bergmann sealed the match with an ace from the end line. Japan, silver medalists in 2024, exit at the quarterfinal stage. Brazil now face defending champions Italy on Saturday for a spot in Sunday's gold medal match.",
    date: "Jul 22, 2026",
    emoji: "⚡",
    gradient: G.lime,
  },
  {
    id: "n4",
    headline: "NCAA Approves Five-Year Eligibility: College Athletes Can Now Play Five Seasons",
    category: "College",
    summary:
      "The Division I Cabinet unanimously approved an age-based model on June 23 — five seasons in five years, with redshirts and eligibility waivers eliminated.",
    body: "In the biggest structural change to NCAA eligibility in decades, Division I athletes will get five seasons of competition in a five-year window that starts at full-time enrollment or the academic year after their 19th birthday, whichever comes first. The old four-seasons-in-five-years framework — and the entire redshirt and waiver system — is being retired, with limited exceptions for pregnancy, military service and religious missions. For volleyball players enrolling in fall 2026, schools apply whichever rules are more beneficial; from fall 2027 the age-based model applies to everyone. For club players charting a college path: that's potentially a fifth year of development, playing time and NIL earnings.",
    date: "Jun 24, 2026",
    emoji: "🎓",
    gradient: G.night,
  },
  {
    id: "n5",
    headline: "VNL's New Carry Crackdown: 'Push-Carry-Catch-Throw' Attacks Are Out",
    category: "Rules",
    summary:
      "FIVB is strictly enforcing Rule 9.2.2 on attack contacts at VNL 2026: no catches, throws, pushes or two-hand directional changes. Only quick, clean tips survive.",
    body: "Among the rule tests approved by the FIVB Board of Administration for the 2026 season, attack contacts face the strictest scrutiny in years. The ball must not be caught or thrown at any point of an attack: carries, pushes, open-hand block-outs, two-hand attacks and any contact with a clear change of direction are all faults. The only soft attack still permitted is a genuine tip with very short contact. The crackdown — being trialed at VNL 2026, the U17 World Championships and continental championships — targets the 'steered' second-ball attacks and two-hand tricks that had crept into the elite game. If the test succeeds, expect the strict standard in the next official rulebook.",
    date: "Jul 8, 2026",
    emoji: "🚫",
    gradient: G.sunset,
  },
  {
    id: "n6",
    headline: "The Double-Contact Revolution: First Contact Freedom, and Now Sets Too",
    category: "Rules",
    summary:
      "Double contacts on the first ball have long been legal — now FIVB is extending the freedom to setters, as long as the ball stays on your side of the net.",
    body: "Volleyball's rulebook has always allowed a double contact on the team's first hit — a serve that ricochets off your arms and face is playable. The revolution is on the second contact: under the interpretation tested at VNL 2025 and continued for VNL 2026, a setter's double touch is no longer a fault provided the ball remains on the same side of the court. Faults are still called for two clearly separate touches, for doubled balls that cross the net, and for catches and lifts — those remain illegal everywhere. The FIVB says the change reduces subjective whistles and keeps rallies alive; traditionalists argue it rewards sloppy hands. Either way, it's already reshaping how setters are coached.",
    date: "Jul 8, 2026",
    emoji: "🤲",
    gradient: G.aqua,
  },
  {
    id: "n7",
    headline: "Also in the 2026 FIVB Rule Tests: Ceiling Balls Stay Live",
    category: "Rules",
    summary:
      "Hit the roof on your first or second contact? Play on — as long as the ball stays on your side and remains playable.",
    body: "Another notable 2026 trial: if the first or second team contact touches venue infrastructure above the field of play and the ball comes down playable on the same side, the rally continues. A ball that hits the ceiling and rebounds into the opponent's court is a fault, and contact with a spider cam or crane cam inside the field of play still triggers a replay. Receiving teams also get more pre-serve freedom — they must be in rotational order at the whistle but may start moving as soon as the server begins the serving motion. The tests run through VNL 2026 and this year's continental championships before FIVB decides on permanent adoption.",
    date: "Jul 8, 2026",
    emoji: "🏗️",
    gradient: G.berry,
  },
  {
    id: "n8",
    headline: "Coastal Crush 17U Has 2 Outside Hitter Spots Left for Nationals Season",
    category: "Club",
    summary:
      "The West Coast powerhouse opened late tryouts after two roster departures — advanced OHs, this is your shot.",
    body: "Coastal Crush VBC announced two open outside hitter spots and one libero spot on their 17U national team. Tryouts are Aug 9 at Wave Arena, San Diego, with a $45 tryout fee. The club earned a bid to Junior Nationals in each of the last three seasons. Coaches say they're looking for six-rotation outsides with a strong serve-receive platform. See the full tryout board for details and fees.",
    date: "Jul 23, 2026",
    emoji: "🌊",
    gradient: G.ocean,
    minLevel: "Advanced",
  },
  {
    id: "n9",
    headline: "Lone Star Legacy Announces Open Setter Tryout After Starter Commits Early",
    category: "Club",
    summary:
      "Texas' powerhouse club needs a floor general for its 17U national roster.",
    body: "With their starting setter graduating into an early college commitment — helped by the NCAA's new five-year eligibility window — Lone Star Legacy opened one setter spot for the upcoming season. Tryouts are Aug 8 at the Legacy Center in Austin ($40 fee). The club wants a setter comfortable running a fast 5-1 offense with strong out-of-system decision making.",
    date: "Jul 10, 2026",
    emoji: "⭐",
    gradient: G.gold,
    minLevel: "Advanced",
  },
];
