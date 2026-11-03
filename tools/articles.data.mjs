/* =========================================================================
   DILP Wednesdays — leadership articles.

   Content provenance
   ------------------
   Every article here is a write-up of a session that actually took place.
   Photography comes from the session itself. Nothing is illustrative.

   Adding an article
   -----------------
   1. Add an entry to `articles` (the card shown on the hub).
   2. Add the full text to `fullArticles`, keyed by the same slug.
   3. Set `published: true` on the card. Exactly one card carries
      `featured: true`; that one fills the "In focus" slot on the hub.
   4. Run `node tools/build-site.mjs`.

   A card without an entry in `fullArticles` renders as "Coming soon"
   rather than a dead link.

   Section blocks
   --------------
   Each section's `blocks` array takes:
     ['p',      'a paragraph']
     ['list',   ['first item', 'second item']]
     ['quote',  'a pulled line']
     ['figure', 'file.webp', 'alt text', 'caption']
   ========================================================================= */

export const articles = [
  {
    slug: 'from-problems-to-possibilities',
    topic: 'Innovation',
    readTime: '7 min read',
    title: 'From problems to possibilities',
    summary:
      'Emmanuel Ambrose Bida on why innovation starts with who has the problem, not with the technology.',
    image: 'article-ambrose-card.webp',
    imageAlt: 'Emmanuel Ambrose Bida presenting during the DILP Wednesday session.',
    published: true,
    featured: true,
    featuredSummary:
      'Which question best starts innovation? Not which technology is trending, but who experiences the problem and why.',
    featuredMeta: 'Innovation · 7 min read',
  },
];

export const TOPICS = ['All topics', 'Innovation'];

/* ------------------------------------------------------- the written-out articles */

export const fullArticles = {
  'from-problems-to-possibilities': {
    slug: 'from-problems-to-possibilities',
    topic: 'Innovation',
    series: 'DILP WEDNESDAYS',
    title: ['From problems to possibilities', 'with Emmanuel Ambrose Bida'],
    standfirst:
      'Which question best starts innovation? Most hands went up for the right one — who experiences the problem, and why.',
    byline: 'By Desmond Jumbo',
    meta: '3 November 2026 · 7 min read',
    image: 'article-ambrose-hero.webp',
    imageAlt:
      'Emmanuel Ambrose Bida presenting the From Problems to Possibilities session to DILP participants.',
    captionLeft: 'DILP Wednesdays · 30 September 2026',
    captionRight: 'Cedars Productivity Centre, Bonny Island.',
    contents: [
      ['It starts with the question', 'the-question'],
      ['Three ideas to take with you', 'key-takeaways'],
      ['What innovation is, and what it isn’t', 'what-innovation-is'],
      ['Treat the cause, not the symptom', 'cause-not-symptom'],
      ['Change the question', 'change-the-question'],
      ['Write a strong problem statement', 'problem-statement'],
      ['Five habits of people who innovate', 'five-habits'],
    ],
    lens: {
      label: 'THE WEDNESDAY LENS',
      format: 'Mentor-led session · Innovation & problem-solving',
      note: 'Emmanuel Ambrose Bida · 30 September 2026 · Cedars Productivity Centre, Bonny Island.',
    },
    sections: [
      {
        id: 'the-question',
        heading: 'It starts with the question',
        blocks: [
          ['p', 'Ambrose opened with a quiz. Which question best starts innovation? Is it which technology is trending, how to make something look impressive, or who experiences the problem and why? Most hands went up for the last option. That was the right answer.'],
          ['p', 'He used smoking to explain why. Before you decide smokers need rehab, ask why they started smoking in the first place. Not everybody smokes. So what makes these people different?'],
          ['quote', 'Those are the kind of questions you ask in innovation.'],
        ],
      },
      {
        id: 'what-innovation-is',
        heading: 'What innovation is, and what it isn’t',
        blocks: [
          ['p', 'His second quiz offered three options: building a new app because the technology is cool, buying a robot to demo, or redesigning a frustrating process so people can complete it in half the time. Only the redesign counted.'],
          ['quote', 'Innovation is a useful, new, improved way of creating value.'],
          ['p', 'It doesn’t have to be a cure for cancer. And being first is interesting, but it’s not enough. Sometimes you try it and find out why nobody has.'],
          ['p', 'Innovation also continues after launch, while people are using the product. He pointed to WhatsApp. Shared videos used to lose quality, and that is getting better because the company keeps improving the experience.'],
          ['figure', 'article-ambrose-feature.webp', 'Emmanuel Ambrose Bida presenting a slide on diverging, converging and testing ideas.', 'There are no dumb answers. There are only unstated assumptions.'],
        ],
      },
      {
        id: 'cause-not-symptom',
        heading: 'Treat the cause, not the symptom',
        blocks: [
          ['p', 'Problem discovery is usually the first step, and it rarely goes in a straight line. Ambrose warned against solving the tip of the iceberg. Say you build a tool and nobody uses it. “No usage” is a symptom, and printing flyers for adverts only treats the symptom. Ask why people aren’t using it. Then look for patterns in who uses it most, when they use it and how often.'],
          ['p', 'You also need other people to check what you find. Negative feedback is the most useful kind. If you hate a restaurant’s food and walk away without a word, you haven’t helped the restaurant. Feedback is optional, so when someone gives it, treat it as data to learn from, not an attack.'],
        ],
      },
      {
        id: 'change-the-question',
        heading: 'Change the question before you change the system',
        blocks: [
          ['p', 'Next, he asked which problem statement gave the best starting point:'],
          ['list', [
            'Young people don’t have enough access to jobs',
            'Young people need jobs',
            'Young people struggle to know which opportunities match their skills',
            'We should build a job website for young people',
          ]],
          ['p', 'The third points to a root cause. The last jumps straight to a solution, a temptation he said innovators face all the time.'],
          ['quote', 'Good innovators change the question before changing the system.'],
          ['p', 'For example, instead of “Let’s build an app”, ask what is happening that an app might improve. If people abandon a process halfway, find out what makes them drop off. Is it time, trust, complexity or cost?'],
          ['figure', 'article-ambrose-ideate.webp', 'DILP participants in breakout groups beneath the Incubate, Innovate, Ideate wall.', 'Breakout groups taking the questions back to their own ideas.'],
        ],
      },
      {
        id: 'problem-statement',
        heading: 'Write a strong problem statement',
        blocks: [
          ['p', 'Problem statements are standard practice in industry. Before any initiative goes ahead, someone will ask for one. A strong statement names:'],
          ['list', [
            'who is affected',
            'what they struggle to do',
            'the root cause, and',
            'the impact',
          ]],
          ['p', '“We need an app to improve transport” is weak. Compare it with this: “Commuters trying to reach work on time can’t rely on when the bus will arrive because schedule information is fragmented, leading to lateness and disappointment.”'],
          ['p', 'Even the strong version doesn’t mean you need an app. It’s where root cause analysis begins.'],
          ['figure', 'article-ambrose-breakout.webp', 'A DILP participant explaining an idea to her group during the ideation exercise.', 'Ideation in the room: working a problem before reaching for a solution.'],
        ],
      },
      {
        id: 'five-habits',
        heading: 'Five habits of people who innovate',
        blocks: [
          ['p', 'Ambrose described these as “not personality traits, behaviours you can practise”:'],
          ['list', [
            'Curious people ask why something is the way it is and what would make it better.',
            'Observant people look at what is actually happening.',
            'Empathetic people ask who feels the pain.',
            'Experimental people test their ideas.',
            'Courageous people ask, “What if my idea is wrong?”',
          ]],
          ['p', 'Courage matters because pushback is common. You can test an idea with friends and community, present it to stakeholders and still watch them say no.'],
          ['p', 'Ambrose linked this to leadership. Priorities differ at every level. What matters to a managing director isn’t what matters to a general manager, and their KPIs are different. You may present a project to your manager, and the answer could simply be “we cannot prioritise it at the moment”. Some leaders won’t tell you that the real reason is money.'],
          ['figure', 'article-ambrose-floor.webp', 'Emmanuel Ambrose Bida walking among seated participants during the session.', 'Working the room as the groups reported back.'],
        ],
      },
    ],
    takeaways: {
      title: 'Three ideas to take with you',
      items: [
        ['Start with who has the problem.', 'Not which technology is trending, and not how to make something look impressive.'],
        ['Treat the cause, not the symptom.', '“No usage” is a symptom. Ask why, then look for patterns in who, when and how often.'],
        ['Change the question before the system.', 'Ask what is happening that a solution might improve, rather than what to build.'],
      ],
    },
    reflection: {
      label: 'PAUSE. REFLECT. PUT IT TO WORK.',
      heading: 'Your next small step',
      prompts: [
        'Notice: what problem am I about to solve without asking who actually has it?',
        'Choose: what is the smallest way I could test the idea this week?',
        'Act: write the problem statement — who is affected, what they struggle to do, the root cause and the impact.',
      ],
      followUp: 'At your next check-in, ask: did I change the question, or only the system?',
    },
    closing:
      'So don’t wait for the perfect answer. Ask what the smallest way to test your idea is. “Done is better than perfect,” he said — and that doesn’t mean settling for mediocrity.',
    about: {
      name: 'Emmanuel Ambrose Bida',
      text: 'A Digital Transformation Analyst and Project Manager in the Digital & Innovations Department at Nigeria LNG (NLNG), Bonny. He started his career as a data analyst. His work now includes digital twin projects that use predictive analytics to monitor assets. He has led Power BI and Power Apps bootcamps that graduated over 150 employees, managed a company-wide hackathon and helped set up an innovation hub.',
      linkLabel: 'Connect on LinkedIn',
      linkHref: 'https://www.linkedin.com/in/emmanuel-ambrose-bida%C2%AE-713b3b1b3/',
    },
    credit: 'Leadership & Character · DILP by Cedars',
  },
};
