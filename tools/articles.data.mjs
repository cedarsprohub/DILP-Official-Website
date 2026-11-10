/* =========================================================================
   DILP Wednesdays: leadership articles.

   Content provenance
   ------------------
   Every article here is a write-up of a session that actually took place.
   Photography comes from the session itself. Nothing is illustrative.

   House style: no em-dashes in article copy.

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
    summary: 'Innovation starts with who has the problem, not with the technology.',
    image: 'article-ambrose-card.webp',
    imageAlt: 'Emmanuel Ambrose Bida presenting during the DILP Wednesday session.',
    published: true,
    featured: true,
    featuredSummary: 'Innovation starts with who has the problem, not with the technology.',
    featuredMeta: 'Innovation · 7 min read',
  },
  {
    slug: 'turning-ideas-into-testable-products',
    topic: 'Product',
    readTime: '8 min read',
    title: 'Turning ideas into testable products',
    summary: 'Ideas are easy. Building something people come back to is the hard part.',
    image: 'article-oluchukwu-card.webp',
    imageAlt: 'Oluchukwu Okafor addressing the room during the DILP Wednesday session.',
    published: true,
  },
  {
    slug: 'beyond-the-classroom',
    topic: 'Programme',
    readTime: '4 min read',
    title: 'Beyond the classroom',
    summary:
      'A visit to NLNG’s innovation centre, and what it says about the kind of builders DILP is for.',
    image: 'article-cove-card.webp',
    imageAlt: 'Ambrose writing on a screen at Catalyst Cove as DILP participants watch.',
    published: true,
  },
];

export const TOPICS = ['All topics', 'Innovation', 'Product', 'Programme'];

/* ------------------------------------------------- the written-out articles */

export const fullArticles = {
  'from-problems-to-possibilities': {
    slug: 'from-problems-to-possibilities',
    topic: 'Innovation',
    series: 'DILP WEDNESDAYS',
    title: ['From problems to possibilities', 'with Emmanuel Ambrose Bida'],
    standfirst: 'Innovation starts with who has the problem, not with the technology.',
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
          ['p', 'Emmanuel Ambrose Bida opened with a quiz. Which question best starts innovation? Is it which technology is trending, how to make something look impressive, or who experiences the problem and why? Most hands went up for the last option. That was the right answer.'],
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
        'Act: write the problem statement, naming who is affected, what they struggle to do, the root cause and the impact.',
      ],
      followUp: 'At your next check-in, ask: did I change the question, or only the system?',
    },
    closing:
      'So don’t wait for the perfect answer. Ask what the smallest way to test your idea is. “Done is better than perfect,” he said, and that doesn’t mean settling for mediocrity.',
    about: {
      name: 'Emmanuel Ambrose Bida',
      text: 'A Digital Transformation Analyst and Project Manager in the Digital & Innovations Department at Nigeria LNG (NLNG), Bonny. He started his career as a data analyst. His work now includes digital twin projects that use predictive analytics to monitor assets. He has led Power BI and Power Apps bootcamps that graduated over 150 employees, managed a company-wide hackathon and helped set up an innovation hub.',
      linkLabel: 'Connect on LinkedIn',
      linkHref: 'https://www.linkedin.com/in/emmanuel-ambrose-bida%C2%AE-713b3b1b3/',
    },
    credit: 'Leadership & Character · DILP by Cedars',
  },

  'turning-ideas-into-testable-products': {
    slug: 'turning-ideas-into-testable-products',
    topic: 'Product',
    series: 'DILP WEDNESDAYS',
    title: ['Building MVP: turning ideas into testable products', 'with Oluchukwu Okafor'],
    standfirst: 'Ideas are easy. Building something people come back to is the hard part.',
    byline: 'By Desmond Jumbo',
    meta: '3 November 2026 · 8 min read',
    image: 'article-oluchukwu-hero.webp',
    imageAlt:
      'Oluchukwu Okafor addressing DILP participants during the Building MVP session.',
    captionLeft: 'DILP Wednesdays',
    captionRight: 'Cedars Productivity Centre, Bonny Island.',
    contents: [
      ['The AI paradox', 'ai-paradox'],
      ['Three ideas to take with you', 'key-takeaways'],
      ['Define the problem precisely', 'define-the-problem'],
      ['Build with other people', 'build-with-others'],
      ['Generate ideas, rank them, set a deadline', 'generate-and-rank'],
      ['Prototype, then test with real people', 'prototype-and-test'],
      ['Three mindsets for builders', 'three-mindsets'],
    ],
    lens: {
      label: 'THE WEDNESDAY LENS',
      format: 'Mentor-led session · Product & MVPs',
      note: 'Oluchukwu Okafor · Cedars Productivity Centre, Bonny Island.',
    },
    sections: [
      {
        id: 'ai-paradox',
        heading: 'The AI paradox',
        blocks: [
          ['p', 'Oluchukwu Okafor opened with a show of hands. Who had ever had an idea for an app, a website or a product? Hands went up. Then he asked people to keep their hands up only if they had built it in front of real users. Some came down.'],
          ['quote', 'It’s very easy to have an idea, but it’s hard to actually build out the idea in a way that users actually want to use it.'],
          ['p', 'Building an app used to mean months learning React Native or Kotlin, or paying a developer, then weeks waiting for a first version. Now you describe what you want in plain language, and AI builds something that works, right?'],
          ['p', 'Yet most people still use the same products. “There’s no new chat app that most people use other than WhatsApp,” he said. If building is this easy, where are the new products people use every day?'],
          ['p', 'He pointed to three marks of a good product:'],
          ['list', [
            'It solves a real problem.',
            'People come back without reminders.',
            'It works reliably.',
          ]],
          ['p', 'AI has mostly handled the last one. Craigslist looks plain, but lots of people use it, and it makes millions of dollars a year because it solves a problem people have.'],
          ['p', 'AI can’t understand your specific users. This is especially true in Africa, because most of the data used to train it didn’t come from our countries. It can’t decide what matters in your context, and it can’t tell whether the product works for the people you’re building for.'],
          ['quote', 'Think of AI as an amplifier. It’s amplifying what is already there, but it’s not replacing it.'],
        ],
      },
      {
        id: 'define-the-problem',
        heading: 'Define the problem precisely',
        blocks: [
          ['p', 'Most people start building before they know what they’re solving or what success looks like. He compared two problem statements.'],
          ['p', 'Vague: people need a better way to save money.'],
          ['p', 'Precise: young workers paid monthly run out of money by week three because they can’t see where it went.'],
          ['p', 'The second one tells you these are salaried workers. It tells you the solution should work in weeks, not years. And it tells you the real problem is that they can’t see their spending.'],
          ['p', 'His template asks five things:'],
          ['list', [
            'Who is struggling (target audience)',
            'What they are struggling to do',
            'In what situation',
            'What causes it',
            'What they currently do about it',
          ]],
          ['figure', 'article-oluchukwu-room.webp', 'DILP participants listening during the Building MVP session.', 'The room working through two versions of the same problem statement.'],
        ],
      },
      {
        id: 'build-with-others',
        heading: 'Build with other people',
        blocks: [
          ['p', 'AI can make you think you can work alone. Oluchukwu disagreed. A partner keeps you to your deadlines because “most people are more willing to disappoint themselves than others.” Other people catch what you missed and cover the skills you lack.'],
          ['p', 'Avoid relationships where only one person benefits. Don’t chase established founders on LinkedIn, who are unlikely to have time for you. Look for people at your level, heading the same way, with skills different from yours. Classmates, meetups, hackathons and online communities are good places to start. Agree up front on the timeline, weekly check-ins, rules and what each person gets.'],
        ],
      },
      {
        id: 'generate-and-rank',
        heading: 'Generate ideas, rank them, and set a deadline',
        blocks: [
          ['quote', 'The first idea you have in mind is not necessarily the best one.'],
          ['p', 'Write down ten or more ideas without judging them, wild and boring alike. Then score them, for example on impact, ease and confidence. Write the scores down so you can compare them with what actually happens.'],
          ['p', 'Then set a deadline, because work fills the time you give it.'],
        ],
      },
      {
        id: 'prototype-and-test',
        heading: 'Prototype, then test with real people',
        blocks: [
          ['p', 'A prototype can be a clickable mockup or a one-page website. It only has to be something people can try. When you test, give people a task and watch without guiding them. If you have to explain everything, it isn’t user-friendly yet. Ask open questions such as “What did you expect to happen?” so people don’t tailor their answers to what they think you want.'],
          ['p', 'Also make sure to set your success criteria before testing. For a class calendar app, you should ask questions such as: can testers add a deadline without help? Do they use it again without being prompted? Do they share it with their class?'],
          ['p', 'If the results meet your criteria, build a fuller product. If not, sharpen the problem and go round again. AI has made starting over much easier.'],
          ['figure', 'article-oluchukwu-question.webp', 'A DILP participant raising a point during the Building MVP session.', 'Questions from the floor as the teams sized up their own ideas.'],
        ],
      },
      {
        id: 'three-mindsets',
        heading: 'Three mindsets for builders',
        blocks: [
          ['p', 'First, building is a loop. Your first loop will be slow, messy and uncertain. By the fifth, you ask better questions. By the tenth, you go through the process faster. Oluchukwu once built a Sudoku solver that wasn’t successful at first, but it taught him search algorithms he later used to build a chess engine. “Failure is like a teacher to you,” he said.'],
          ['p', 'Second, climb Jacob’s Ladder. Builders need to move between big ideas and implementation details. AI keeps you at the level of ideas, but to use it well, you need the details too. He suggested doing some projects manually, some with AI and some with both, the same way you learn mental maths before you use a calculator. If you rely on AI for everything, you never learn the details. Refusing to use it out of pride is also a mistake.'],
          ['p', 'Third, treat life as a search space. If you lose your key, you don’t check under the bed and give up. Each failed attempt rules out a place to look.'],
        ],
      },
    ],
    takeaways: {
      title: 'Three ideas to take with you',
      items: [
        ['Ideas are easy. Built things are not.', 'Building has never been cheaper, and yet few new products are the ones people reach for every day.'],
        ['AI amplifies, it doesn’t replace.', 'It can’t understand your users, and most of its training data didn’t come from our countries.'],
        ['Define the problem before you build.', 'Who is struggling, with what, in what situation, what causes it, and what they currently do about it.'],
      ],
    },
    reflection: {
      label: 'PAUSE. REFLECT. PUT IT TO WORK.',
      heading: 'Your next small step',
      prompts: [
        'Notice: what idea have I had that I’ve never put in front of a real user?',
        'Choose: write the problem precisely, naming who struggles and what causes it.',
        'Act: set a deadline, then put a rough prototype in front of three people this week.',
      ],
      followUp: 'At your next check-in, ask: did I watch someone use it without explaining it to them?',
    },
    closing:
      'The four Cohort 2 teams are already working on a version of this. Each team picks a sector, community or organisation, finds a problem and builds a solution. His advice to them was to talk to the people you’re solving for before you decide what the problem is, then check your definition with them. “Most people are nice, so they don’t bite.”',
    about: {
      name: 'Oluchukwu Okafor',
      text: 'Ex-Microsoft, a researcher and a tech founder. He studied mechanical engineering and started coding at university, where he built games, a chess engine and other projects. He has since worked with top tech companies and on award-winning projects.',
      linkLabel: 'Connect on LinkedIn',
      linkHref: 'https://www.linkedin.com/in/oluchukwu-okafor/',
    },
    credit: 'Leadership & Character · DILP by Cedars',
  },
  'beyond-the-classroom': {
    slug: 'beyond-the-classroom',
    topic: 'Programme',
    series: 'PROGRAMME VISIT',
    title: ['Beyond the classroom:', 'inspiring the next generation of innovators'],
    standfirst:
      'Innovation doesn’t have to begin with a groundbreaking idea. It can begin with a problem in front of you.',
    byline: 'By Desmond Jumbo',
    meta: '9 November 2026 · 4 min read',
    image: 'article-cove-hero.webp',
    imageAlt:
      'Ambrose writing “How to identify a problem worth solving?” on a screen as DILP participants watch.',
    captionLeft: 'Catalyst Cove, Nigeria LNG · 6 November 2026',
    captionRight: 'Bonny Island.',
    contents: [
      ['The visit', 'the-visit'],
      ['Three ideas to take with you', 'key-takeaways'],
      ['How innovation happens in practice', 'in-practice'],
      ['What this means for DILP', 'what-it-means'],
    ],
    lens: {
      label: 'AT A GLANCE',
      format: 'Programme visit · Innovation in practice',
      note: 'Catalyst Cove, the innovation centre of Nigeria LNG Limited · 6 November 2026.',
    },
    sections: [
      {
        id: 'the-visit',
        heading: 'The visit',
        blocks: [
          ['p', 'On Friday, 6 November 2026, participants in the Digital Innovation and Leadership Programme visited Catalyst Cove, the innovation centre of Nigeria LNG Limited. The visit gave them a close look at the mindset and practice of innovation.'],
          ['figure', 'article-cove-space.webp', 'DILP participants seated in the Catalyst Cove innovation space as Ambrose addresses them.', 'Inside Catalyst Cove, the innovation centre of Nigeria LNG.'],
        ],
      },
      {
        id: 'in-practice',
        heading: 'How innovation happens in practice',
        blocks: [
          ['p', 'In a session facilitated by Ambrose, participants explored how innovation works in practice. It starts with identifying real-world problems and questioning assumptions. Then it moves on to developing ideas, experimenting, testing solutions and learning through feedback.'],
          ['figure', 'article-cove-listening.webp', 'Three DILP participants following the session, one holding a notebook.', 'Working through how a problem gets identified before anything is built.'],
          ['quote', 'Innovation doesn’t have to begin with a groundbreaking idea. It can begin with a simple problem in your immediate environment and a commitment to solving it.'],
          ['figure', 'article-cove-usecase.webp', 'Ambrose presenting use cases for VR technology to DILP participants.', 'From the problem to the use case for a technology.'],
        ],
      },
      {
        id: 'what-it-means',
        heading: 'What this means for DILP',
        blocks: [
          ['p', 'The same thinking shapes what we are building at Cedars Productivity Centre. We believe digital skills and emerging technologies should do more than add to what people know. They should help people understand challenges, create practical solutions, unlock opportunities and improve lives.'],
          ['p', 'DILP turns this belief into action. The programme brings together applied learning, human-centred innovation, AI-enabled problem-solving and practical solutions for community impact.'],
          ['figure', 'article-cove-vr.webp', 'A DILP participant wearing a VR headset while others look on.', 'Hands on the technology rather than a description of it.'],
          ['p', 'Our goal is to nurture critical thinkers, problem-solvers, innovators and builders who can use technology to create economic and social value.'],
          ['figure', 'article-cove-host.webp', 'A member of the Catalyst Cove team presenting beside a VR headset.', 'The Catalyst Cove team on how ideas become working solutions.'],
        ],
      },
    ],
    takeaways: {
      title: 'Three ideas to take with you',
      items: [
        ['Start where you are.', 'A simple problem in your immediate environment is a legitimate place to begin.'],
        ['Question the assumptions.', 'Innovation begins with identifying the real problem, not with the first idea.'],
        ['Learn through feedback.', 'Develop, experiment, test, then let what you learn change the next attempt.'],
      ],
    },
    reflection: {
      label: 'PAUSE. REFLECT. PUT IT TO WORK.',
      heading: 'Your next small step',
      prompts: [
        'Notice: what problem in my immediate environment have I stopped seeing?',
        'Choose: which assumption behind it have I never actually checked?',
        'Act: test one small change this week and write down what happened.',
      ],
      followUp: 'At your next check-in, ask: did the feedback change what I build next?',
    },
    closing:
      'We thank NLNG and the Catalyst Cove team for this experience and for the opportunity to inspire our community.',
    credit: 'DILP by Cedars',
  },
};
