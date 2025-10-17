import claudeReview from '!!raw-loader!./tool-reviews/claude.md';
import codexReview from '!!raw-loader!./tool-reviews/codex.md';
import geminiReview from '!!raw-loader!./tool-reviews/gemini.md';
import slateReview from '!!raw-loader!./tool-reviews/slate.md';
import vscodeReview from '!!raw-loader!./tool-reviews/code.md';

export type Tool = {
  name: string;
  website: string;
  summary: string;
  review: string;
  rating: number;
  tags: string[];
};

const normalizeReview = (content: string): string => content.trim();

export const tools: Tool[] = [
  {
    name: 'Gemini',
    website: 'https://deepmind.google/technologies/gemini/',
    summary:
      "Gemini is Google DeepMind's multimodal AI platform that combines text, image, audio, and video understanding within a unified suite of models. It powers Bard and Vertex AI services, offering scalable options from on-device Nano to Ultra for advanced reasoning tasks. Developers can access Gemini through APIs, SDKs, and Google Cloud integrations that emphasize secure data handling and compliance features. The platform excels at synthesizing information from varied inputs, generating content, and supporting coding assistance workflows. Gemini's knowledge of current events leverages Google's search infrastructure while responsible AI tools help evaluate bias, toxicity, and safety across deployments for enterprise readiness worldwide.",
    review: normalizeReview(geminiReview),
    rating: 4.5,
    tags: ['AI', 'Multimodal', 'Enterprise'],
  },
  {
    name: 'Claude',
    website: 'https://www.anthropic.com/claude',
    summary:
      "Claude is Anthropic's conversational AI assistant built with a Constitutional AI framework that aligns model behavior with transparent principles. Accessible through web chat, Slack, API, and partner products, Claude handles long-form writing, structured analysis, customer support, and code generation while emphasizing steerability and low hallucination rates. The latest Claude 3 family spans Haiku, Sonnet, and Opus tiers, balancing speed against reasoning depth for enterprise and creative workflows. Robust safety tooling, audit logs, and data retention controls target regulated industries. Claude's extended context windows digest lengthy documents, enabling summarization, contract review, and knowledge base synthesis for trustworthy automation in production environments.",
    review: normalizeReview(claudeReview),
    rating: 4.7,
    tags: ['AI', 'Assistant', 'Enterprise'],
  },
  {
    name: 'Code (Visual Studio Code)',
    website: 'https://code.visualstudio.com/',
    summary:
      "Visual Studio Code is Microsoft's extensible source-code editor built on Electron, offering fast startup times, a responsive interface, and a broad plugin ecosystem covering languages, frameworks, and cloud providers. IntelliSense, Git integration, and debugging adapters streamline editing, testing, and deployment from a single workspace. Developers customize VS Code through settings sync, workspace configurations, snippets, and JSON-defined tasks that automate builds or scripts. Remote development extensions connect securely to containers, WSL, or SSH hosts, enabling consistent tooling across platforms. Integrated terminals, notebook support, and Live Share collaboration make VS Code a versatile hub for polyglot teams shipping software efficiently worldwide today.",
    review: normalizeReview(vscodeReview),
    rating: 4.8,
    tags: ['Editor', 'Open Source', 'Developer Experience'],
  },
  {
    name: 'Slate',
    website: 'https://github.com/slatedocs/slate',
    summary:
      'Slate is an open-source static site generator for designing beautiful, customizable API documentation powered by Ruby, Middleman, and Markdown. Teams define endpoints, parameters, and code samples in simple Markdown files, while Slate produces responsive, three-column layouts that highlight navigation, narrative explanations, and language-specific examples side by side. Built-in syntax highlighting, search, and scroll-synced navigation help developers scan reference material quickly. Slate\'s theming system lets organizations extend styles with Sass, JavaScript, and custom fonts to match brand guidelines. Because output is static HTML, documentation can be deployed anywhere and versioned alongside API source code for transparent change management without infrastructure overhead.',
    review: normalizeReview(slateReview),
    rating: 4.2,
    tags: ['Documentation', 'Open Source'],
  },
  {
    name: 'Codex (OpenAI Codex)',
    website: 'https://openai.com/blog/openai-codex',
    summary:
      'OpenAI Codex is a transformer-based model fine-tuned on natural language and public source code to translate instructions into working software snippets across dozens of programming languages. Integrated into GitHub Copilot, Azure OpenAI Service, and bespoke workflows, Codex assists with code completion, refactoring, test generation, and documentation drafting. It understands docstrings, comments, and surrounding context to predict relevant functions or commands. Developers can prototype faster by conversing with Codex through natural language prompts while maintaining oversight via human-in-the-loop review. Built-in safety systems filter sensitive requests and encourage secure coding patterns to reduce vulnerabilities in production applications used across cloud tooling pipelines.',
    review: normalizeReview(codexReview),
    rating: 4.6,
    tags: ['AI', 'Developer Experience', 'Code Generation'],
  },
];
