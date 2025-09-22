# Building an App Without Writing a Single Line of Code

**tl;dr** Built an entire stable dollar bridging dApp app only by Claude Code coding agent, experiences and thoughts.

**Disclaimer:** This article is written by human, NOT by any LLM, except grammar checks. 

Like every engineering professional, the past two hundred years (in current AI gold-rush time) have been spent stalking AI products and tooling, trying to figure out 'what can I do', or at least trying not to get left behind. The debate about which professions AI would kill first has raged for eons (again, in AI years), with plenty of consensus on the hit list. Programming has been a hot topic but generally considered safe. Or is it? A sudden surge of agentic CLI tools emerged: Claude Code, then Qwen Code, Opencode, OpenAI Codex. By the time you're reading this, even if it's just a week later, dozens more toys have certainly appeared.

Software development has been my companion for more than a decade: large and small projects, from systems managing multi-billion dollar assets for financial institutions to a few hundred lines of consulting algorithms, to tiny iOS apps that my parents pretend to use. The constants throughout? A developer, a code editor. For the first time, there's a new component: a coding agent.

My sceptical side has always won when it comes to LLMs doing actual coding. They barely get used outside of lazy lookups for Rust syntax or writing tedious SQL CTE clauses. Old habits die hard: LLM inline code completion stays firmly off in my IDE. But Claude Code struck a different nerve. It felt... different, though putting a finger on why proved elusive. So an experiment began: build a project without touching VS Code at all, only using Claude Code. Time to push both the tool and myself to understand that tingling sensation.

## Picking the project

### A not so great business problem

In cryptocurrency, stablecoins, more precisely stable dollars like USDC, have been on the rise for all sorts of right and unfortunate reasons. And blockchains? There are LOTS of them, created before all the hype investment pivoted to AI. So transferring across networks, aka bridging, has become a necessity. For years, the common approach has been using AMM (automated market making) pools: essentially selling on one side and buying on another, to put it simply. And where there's a trader involved, fees and hidden spreads get charged.

However, stablecoins represent the unfortunate defeat of the decentralisation dream, you see. USDC gets issued by Circle, a publicly listed, for-profit company. They have something called CCTP (Cross-Chain Transfer Protocol), a set of on-chain smart contracts allowing token burns on one network and mints on another. No fees. More importantly, no dodgy third party you're trusting not to run away with your money halfway through. With more competing stablecoins emerging, issuer-backed transfers should be increasingly in demand.

Why is there no UI for these protocols? Nobody bothers, no third party means no revenue to extract. On the flip side, people who need a UI aren't going to work out the 20 PDAs and binary shenanigans required to call these on-chain contracts directly. (I did and it was painful)

Perfect candidate for a project with gains measured in other ways: experimenting with new coding agents. Let's call it [stables.mov](https://stables.mov).

### An unnecessary technical challenge

LLMs would churn out a NextJS repo that's 80% functional almost in one go, given how much of it exists on GitHub. So, no. The choice fell on Dioxus, a Rust frontend framework where the app builds into WebAssembly and directly manages the DOM. Documentation? Generally lacking as they're moving through a major refactor. So Claude Code couldn't cheat from its training vectors. It would have to figure things out on the fly. 

The kicker? Neither of us knew anything about Dioxus v0.7.0-alpha.

## The starting point

- An empty folder
- A `Project.md`:
  - the goal, everything from the paragraphs above
  - the user journey flows
  - high-level map of components/folders
- A `CLAUDE.md`:
  - a list of DON'Ts
  - a list of MUSTs
- A `refs` folder:
  - `refs/dioxus`: source code of Dioxus GitHub repo
  - `refs/dioxus-docs`: extracted using a site extraction tool designed for LLMs
  - `refs/appkit`: source code of latest Reown wallet kit
  - `refs/circle-cctp`: Circle CCTP on-chain contract source codes
  - `refs/images`: some art assets for coins/networks, branding, UI sketches

## The Smirkings

### The grand opening Wow Effects

From first time feeding it all the instructions and empty folders, Claude Code worked hard and generated a surprisingly good quality POC app. And it ran, doesn't really work, but it looked alright. Detailed but awkwarads animations and everything.

The same magic happened for any new module or file added to the product. Remarkably well done in those first-time, from-zero situations.

But there's a but... which would send us tumbling into the frustrations chapter below.

### Think like me

It tends to know where a change becoming too much of hack, then taking a step back refactoring related components for a better pattern. Although probably because I left in CLAUDE.md to ask it always self intrspect output and have a second personality critise its work simulating Linus Tovalds.

That moment observing it failed to find a solution from Dioxus repo, then proceed to search through Github Issues and found a hack by someone in discussion, was purely magical and never gets old.


### Better than me

No complaints. Eager to please. Result-driven. No sick days or mood swings. Zero distractions. Available 24/7, ready at the fingertips. Whether during working hours or at 3am after jumping out of bed with a flash of inspiration.

Misunderstandings? Only the organic kind, quite obviously due to lack of expressiveness in my prompts. 

It's scarily good at reading. What would take me hours to trace in dependent code repo, it can figure out and present findings from `refs` folder in seconds. What took me days trying to understand Solana contract calling input assembly, and Claude when I pasted logs, it just read the binary data byte by byte figured out a bad B58 encoding, sent chills through my spine.

All for $100 a month of CPU/GPU/TPU time. Bargain, really.

### Entity schema

Here's a surprise: it's better than average engineers at modelling entity schemas. While this project doesn't involve a complex database behind, it does involve a reference data universe of token definitions, network definitions, route definitions, plus managing localStorage for users' wallet states, balance states, pricing data, transaction history, etc. They're databases in their own right. Most of the entity models it created barely needed changing. Flexible enough for all the iterations throughout the development process and product pivoting.

## The Frustrations

### All knowledge being equal

Humans learn with temporal context. Knowledge in our brains has intrinsic timestamps, rather than being purely a graph with no time weighted edges and nodes. Claude Code has limited to non-existent awareness of this.

The fundamentals: transformer layers process my prompts through attention mechanisms, contextualizing them with CLAUDE.md instructions and any RAG-style file retrieval it performs. More often than not, even with serious DON'Ts in CLAUDE.md, the same mistakes would resurface. Such mistakes were usually patterns too common in GitHub source code (its training data) that proved unfit for the current task. Even when discovering this itself without prompting, it tended to rubber-band back, as if the weights were too strongly biased toward those patterns.

### Bound by sessions

Invisible walls rank among the top frustrations in badly designed adventure games. Same goes for coding agents. While CLAUDE.md serves as rudimentary memory, explicit instructions to write to that file are required. Otherwise nothing gets remembered between sessions. The capability feels tuned far too weakly by its makers to optmise token burning rate.

### Rabbit holes

Both Claude and me were forevering climbing out of rabbit holes, into another one.

During early and mid-product development, vague input (usually due to laziness, let's be honest) would send Claude Code eagerly trying to please and connect dots. Usually, straight into rabbit holes. The struggle was visible, going back and forth trying to work things out, but a maximum attempt threshold seemed to kick in eventually.

After more encounters pulling it out of various rabbit holes, the training went both ways. My input became longer and longer, I feel like going back to univ days being forced to pump out essays. Eventually, voice recognition took over, rambling for minutes, which turned out great. And also a bit sad.

Towards project completion, with mostly final touch-ups and optimisations remaining, the typing required far exceeded what direct coding would have taken. Even for simple tweaks across several components, it would either conjure something completely out of the blue that broke more than it fixed, or produce a single code comment—a placeholder for the request—calling it done after 10 minutes of back and forth before eventually giving up.

This became the most simultaneously great and sadistic experience of the project, having handcuffed the process to natural language only through Claude Code.

### Git, again

Sometimes dangerous git commands cause unrecoverable damage. When panicking, the tendency is `git checkout`, overriding files. Uncommitted work? Gone. That brilliant fix not yet staged? Cheerio. Seach through Google reveals many discussions around this topic. While very cautious about running terminal commands generally, it's completely untuned for dangerous side effects of git commands. A messed-up git tree sometimes proves worse than a mistaken `rm`.

### Creative Design

About that "without a single line of code" claim? Total lie. All the CSS came from my flesh and bone hands. Claude Code did generate some okay CSS with expectations for an internal POC, but far from production ready. No amount of detailed description, sketches, or even exact Figma designs could make it work for visual design.

Process design? Almost useless at designing state machines or understanding expectations for 'filling the gap' between states. The Transfer button kicks off a multi-step process. First attempt: 1000+ lines of ugly hooks in one file, odd given how many React app examples exist in its training. After designing the states and state transition diagram manually, another surprisingly time-consuming regression began. High-level concepts seemed beyond grasp, though it proved surprisingly attentive to the interop interfaces between Rust WASM and the WalletKit TypeScript wrapper.

## The Contemplation

### Visual capabilities

Being able to see the UI result and talk through whiteboard sessions would be transformative. The final stages of wrapping up the product involved taking screenshots or drawing in Eraser.io, storing them in `refs/screenshots`, and collaborating through images rather than words. While Claude Code supports pasting images as input, I found that a folder of images with context works better.

Humans observe the world first by vision, before interpreting into words and language. LLMs start directly with tokens converted to embeddings, processed through layers of learned representations. Over intense interactions, this gap between human perception and tokenized pattern matching becomes increasingly obvious and gets in the way.

### Source control

An opportunity exists here for better AI-fit source control, or iterations on git that understand the conversational nature of AI-assisted development.

### Who's the audience

The fundamentals of a "good engineer" still remain (for now):

**Highly intelligent**: LLMs have no intelligence. There, said it. What seems like intelligence is just OpenAI or Anthropic engineers' clever duck-taping. It's sampling from probability distributions over next tokens, by drawing relavant embeddings towards your input, not truly understanding, no matter how sophisticated the attention heads or how deep the feed-forward networks.

**Business awareness**: The difference between good and great engineers lies in being multi-disciplinary. Deep understanding of business context beyond programming techniques. This isn't something prompt engineering can fix.

Equally though, it's not for product geniuses who can't code but think they can build something without programming knowledge. The last mile delivery of a techinical product falls in the hand of USER, and their ability to code. As shown in this experiment, I practically telling it the lines or writing it out to change through prompt, for small bug fixes. 

**Designer capable**: Models these days can generate high-quality code. They can also generate amazing graphics, like Google's recent Nano Banana examples. But bridging the gap between the two? They can generate pixel-perfect user interfaces as images, but can't code them out in CSS and HTML elements to bring them to life.

## The verdict

Did a working app emerge? Yes. [stables.mov](https://stables.mov) exists and works.

Was it done faster than coding it myself? Debatable. Easier? Definitely not by the end.

But something valuable emerged: we're entering an era where the boundary between idea and implementation becomes conversational rather than syntactical. Coding agents proves simultaneously a brilliant junior developer and a frustrating one. Tireless but occasionally destructive, eager but lacking wisdom, capable but needing constant guidance.

The future isn't AI replacing programmers. It's programmers learning to be technical directors for very eager, occasionally confused, but ultimately powerful assistants. And honestly? We've all worked with worse.

Just maybe keep IDE installed. You know, for the CSS.