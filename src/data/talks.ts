export type TalkResourcePreview = {
  kind: 'pdf' | 'excalidraw';
  src?: string;
  title: string;
};

export type TalkResource = {
  label: string;
  url: string;
  type: 'slides' | 'excalidraw' | 'code' | 'article';
  preview?: TalkResourcePreview;
};

export type Talk = {
  slug: string;
  title: string;
  event?: string;
  date?: string;
  location?: string;
  youtubeId?: string;
  videoUrl?: string;
  description: string[];
  resources?: TalkResource[];
};

export const talks: Talk[] = [
  {
    slug: 'engineering-reliable-agents-2025',
    title: 'Engineering Reliable Agents',
    date: 'May 2025',
    description: [
      'Lessons learned from building autonomous agent teams with an emphasis on why reliability is the lens for evaluating quality over time.',
      'Kam walks through production scenarios, the unpredictability inherent in agent systems, and the frameworks he uses to align teams on measurable quality targets.',
    ],
    resources: [
      {
        label: 'Slides (PDF)',
        url: '/Engineering-Reliable-Agents-Talk-2025.pdf',
        type: 'slides',
        preview: {
          kind: 'pdf',
          title: 'Engineering Reliable Agents slides preview',
        },
      },
      {
        label: 'Working diagram (Excalidraw)',
        url: '/Engineering-Reliable-Agents-Talk-2025.excalidraw',
        type: 'excalidraw',
        preview: {
          kind: 'excalidraw',
          title: 'Engineering Reliable Agents system map',
        },
      },
    ],
  },
  {
    slug: 'lets-build-an-agent-2025',
    title: "Let's Build an AI Agent",
    date: 'February 2025',
    youtubeId: 'xzXdLRUyjUg',
    videoUrl: 'https://www.youtube.com/watch?v=xzXdLRUyjUg',
    description: [
      'A step-by-step build of the smallest useful agent, showing how planning, memory, tool use, and control flow combine to create an end-to-end system.',
      'The talk demystifies modern hype by incrementally layering capabilities so engineers can see exactly how each choice affects the whole agent.',
    ],
    resources: [
      {
        label: 'Source code',
        url: 'https://github.com/mfdtrade/agent-talk-2025',
        type: 'code',
      },
    ],
  },
  {
    slug: 'devopsdays-boston-2022',
    title: 'How to Fail at Serverless (DevOpsDays Boston)',
    event: 'DevOpsDays Boston',
    date: 'September 2022',
    youtubeId: 'kRVUEYPua4A',
    videoUrl: 'https://www.youtube.com/watch?v=kRVUEYPua4A',
    description: [
      'A candid look at the culture shift required to share and learn from production outages instead of hiding them behind “if you just” explanations.',
      'The session encourages engineering teams to normalize post-incident storytelling so everyone can build safer systems together.',
    ],
    resources: [
      {
        label: 'Talking About Failure (blog post)',
        url: 'https://kamlasater.com/blog/talking-about-failure',
        type: 'article',
      },
    ],
  },
  {
    slug: 'serverlessdays-nyc-2022',
    title: 'How to Fail at Serverless (ServerlessDays NYC)',
    event: 'ServerlessDays NYC',
    date: 'June 2022',
    youtubeId: 'MFDy6AkMHEo',
    videoUrl: 'https://www.youtube.com/watch?v=MFDy6AkMHEo',
    description: [
      'An extended failure report that shares real serverless missteps so the broader community can level up without repeating the same mistakes.',
      'By unpacking the root causes, Kam shows how embracing honest retrospectives leads to better engineering instincts and more resilient platforms.',
    ],
    resources: [
      {
        label: 'How to Fail at Serverless: Serverless is Stateless',
        url: 'https://kamlasater.com/blog/how-to-fail-at-serverless-stateless',
        type: 'article',
      },
    ],
  },
];

export default talks;
