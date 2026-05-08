     1|---
     2|title: "My Experience With AI Agents and Why I Canceled My Claude Subscription"
     3|description: "From paying subscriptions to running 3 Telegram bots on a $5 API credit. My journey with local models, Hermes, pi.dev, and Deepseek."
     4|published_date: 2026-05-07
     5|category: "technology"
     6|draft: false
     7|---
     8|
     9|It all started like most of these stories do. With a subscription.
    10|
    11|I was paying $20 a month for Claude Pro. At first it felt reasonable, you know? But I kept hitting message limits and usage restrictions. The only way to get more was paying $200 for their next tier and honestly, I was not about to do that just to get bigger limits. It felt like paying for a car and being told how many miles you can drive each month.
    12|
    13|That frustration sent me down a rabbit hole.
    14|
    15|## The Local Models Rabbit Hole
    16|
    17|I started reading about local models. The idea of running artificial intelligence on my own computer, without depending on the internet, without limits, without monthly payments. It sounded too good to be true.
    18|
    19|And at first, honestly, I didn't understand anything. There were tools like <a href="https://ollama.com/" target="_blank" rel="noopener noreferrer">**Ollama**</a>, basically the simplest way to download and run local models. You type a command in the terminal and seconds later you have a model running. Also <a href="https://lmstudio.ai/" target="_blank" rel="noopener noreferrer">**LM Studio**</a> and <a href="https://www.cherry-ai.com/" target="_blank" rel="noopener noreferrer">**Cherry Studio**</a>, which are graphical interfaces to do the same thing if you don't want to touch the terminal. A ton of tools, each one promising to make it easier.
    20|
    21|I dove into that world, and right when I started, Alibaba had just released <a href="https://github.com/QwenLM/Qwen" target="_blank" rel="noopener noreferrer">**Qwen 3.6**</a>, a model that fit perfectly on my MacBook Pro M4 Pro with 48GB of RAM. I installed it, tested it, and watching a model answer questions on my own machine, with no internet, felt like magic. I added <a href="https://modelcontextprotocol.io/" target="_blank" rel="noopener noreferrer">**MCP**</a> (Model Context Protocol), a standard that lets models connect with external tools like files, databases, or whatever you need. The possibilities opened up significantly.
    22|
    23|I spent a while like that, experimenting, seeing what I could do. And like everything in this world, I wanted more.
    24|
    25|## OpenCLAW and the First Letdown
    26|
    27|I discovered <a href="https://openclaw.ai/" target="_blank" rel="noopener noreferrer">**OpenCLAW**</a>, a more advanced framework for building agentic systems. I set it up, ran it, and it worked. Painfully slow. It was overkill for my laptop.
    28|
    29|That's when I learned something important. The problem wasn't the model. It was everything I was putting around it. These frameworks inject a massive system prompt to give you context, and processing that from scratch every single time takes forever. It doesn't matter how fast your model is if it has to chew through pages of instructions before it can even respond. That discovery, frustrating as it was, led me to the next tool.
    30|
    31|## pi.dev, the Game Changer
    32|
    33|That's when I found <a href="https://pi.dev/" target="_blank" rel="noopener noreferrer">**pi.dev**</a>. And this actually changed things.
    34|
    35|pi.dev optimizes the prompt you send to the model so it's efficient. Its system prompt is short, well structured, no bloat. Suddenly my local model was flying. It could solve complex problems, write code, reason through multiple steps. Everything worked the way it should. It was the best experience I had in that whole phase. For the first time I felt like running a local model wasn't an experiment. It was actually useful.
    36|
    37|## Enter Hermes and the Need for Something Bigger
    38|
    39|But I still felt like something was missing. I wanted something I could control from my phone, something available anywhere, something I could chat with that could also control my PC from wherever I was.
    40|
    41|That's when <a href="https://nousresearch.com/hermes-agent/" target="_blank" rel="noopener noreferrer">**Hermes Agent**</a> came in. It's a framework that lets you have assistants with personality, connected to Telegram, capable of executing code, researching the web, controlling files. All from a chat. I had it configured in no time. The system itself guided me through it. Within a while I had **3 Telegram bots** running, each with its own purpose and distinct personality. One for research, one to help with technical tasks, one just to experiment.
    42|
    43|But when I ran Hermes with my local model, the same old problem came back. Speed. Running parallel tasks with a local model simply isn't viable, even with pi.dev optimizing everything. And the magic of having agents fades when you're waiting 30 seconds for every response.
    44|
    45|## The Five Dollar Lesson
    46|
    47|That's when I remembered that two years ago I had bought **five dollars worth of Deepseek API credit**. I had never used it. It was just sitting there, untouched.
    48|
    49|I connected it. And suddenly everything worked amazingly. Fast, fluid, no artificial limits. My three bots started running on <a href="https://www.deepseek.com/" target="_blank" rel="noopener noreferrer">**Deepseek V4 Flash**</a> and the difference was night and day. They do research, help me with day to day tasks, and even role-play with the personalities I gave them, because honestly I find it fun to see how they respond. Five dollars. Two years later, I still have credit left.
    50|
    51|It was ironic to realize that what solved all my problems wasn't better hardware, more configuration, or more tools. It was connecting an API I had bought two years ago and forgotten about.
    52|
    53|## My Setup Today
    54|
    55|In the end, I learned that no single tool does everything perfectly. Each one has its place, and the trick is knowing when to use each.
    56|
    57|<a href="https://nousresearch.com/hermes-agent/" target="_blank" rel="noopener noreferrer">**Hermes**</a> manages projects, writes plans, and keeps long-term context. For that it uses <a href="https://www.deepseek.com/" target="_blank" rel="noopener noreferrer">Deepseek</a>. It's ideal for tasks that require memory, understanding the full context of a project, and coordinating multiple steps.
    58|
    59|<a href="https://pi.dev/" target="_blank" rel="noopener noreferrer">**pi.dev**</a> I use for programming and running code quickly. Its short system prompt and ability to parallelize tasks make it much more efficient for that. For pure development, it's still my main tool.
    60|
    61|Deepseek V4 Flash runs on both. So far I've found it excellent.
    62|
    63|## What I'm Taking Away From All This
    64|
    65|Local models are incredible for learning and experimenting. They give you an understanding of how this technology really works that you'd never get from just using APIs. They force you to understand prompts, context, limits. Everything that's normally abstracted away when you're just clicking in a chat.
    66|
    67|But when you want speed, reliability, and parallel tasks, a cheap API is unbeatable. You don't need to spend a hundred dollars a month. With five dollars of credit I bought two years ago and still haven't finished, I have more capability from my phone than I had sitting at my computer paying subscriptions.
    68|
    69|Goodbye Claude with its restrictive limits. Goodbye to paying monthly for something you only halfway use. Today I have three bots running from Telegram, I control my computer from anywhere, and I wrote this post from my phone while I was out of the house, dictating to one of my agents who helped me structure it and correct it without losing my voice.
    70|
    71|And the best part? This is just the beginning. Every week I discover something new I can do with this setup. And the feeling of building your own system, with your own rules, without a subscription telling you how far you can go. There's nothing like it.
    72|