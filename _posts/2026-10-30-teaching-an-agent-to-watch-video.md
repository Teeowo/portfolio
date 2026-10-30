---
layout: post
title: "Teaching an agent to watch video, and keeping humans on the judgement calls"
week: 1
summary: "I made my AI video-watching toolchain portable across repos, and ran a 46-commit game milestone with AI reviewers and my own sign-off as the gates."
tags: [Agents, Gemini, Claude Code, Verification]
---

This is the first entry in a weekly log of what I'm building and learning with AI. Two threads this week: a toolchain that lets an AI agent "watch" a video and prove what it saw, and a game build run almost entirely through AI agents, with review gates in the right places.

## Teaching an agent to watch video

Agents are good at text and bad at video. I want mine to be able to watch a tutorial or one of my own explainers and come back with notes I can trust, so I built a small toolchain for it.

A run goes like this:

1. **An advisor picks the mode.** Before spending anything, it recommends how to watch the video (transcript only, frames only, or a full video model) and estimates the cost.
2. **Gemini watches the full video**, while the toolchain pulls the transcript and extracts frames at 1024px.
3. **Everything lands in an evidence pack**: the model's claims, the transcript and the frames, plus a checklist of claims that need checking.
4. **Every claim gets a verdict** against the frames and transcript: confirmed, corrected, dropped or unresolved. A `check` step has to pass, with at least 90% of the checklist resolved, before any notes get written.

This week I made the skill portable and added the toolchain as a git submodule to the two repos that produce my TechWithTosin videos, so the same "watch, then verify" loop runs wherever I need it.

### What I learned

The video model is very good at the gist and unreliable on exact strings. In testing, the details it got wrong were the ones that matter most in technical content: passwords, channel names, domain names and IP addresses. The fix wasn't a better prompt. It was treating the model's output as **claims to verify** against primary evidence (the actual frame, the actual transcript line), and refusing to write notes until enough of them were checked.

## Running a game milestone with AI reviewers

I'm also building a browser-based life simulation game, and this week it moved through milestones M2.3 to M3.2 in 46 commits: a rent goal and per-profile economy, shift events that fire by seeded chance instead of on a fixed calendar, clearer feedback on every action, and a first "make it feel like a game" pass.

The interesting part is the process rather than the features. Each milestone follows the same loop:

- **Plan first.** An agent drafts the milestone plan before any code is written.
- **Separate reviewers.** An architecture reviewer checks anything that touches the data model or save format, and an ethics reviewer pre-checks content about hardship (missed rent, losing a shift) so it's handled with care, not played for drama.
- **I sign off on judgement calls.** Sensitive content doesn't ship until I've approved it, and the approved version is pinned in a test so it can't drift later.
- **Playtest, then fix.** A playtest pass on desktop and phone feeds the next round of fixes.

### What I learned

Speed wasn't the bottleneck. Judgement was. Agents will happily produce a week of features in a day, so the useful work moved to deciding where a human has to be in the loop and making that gate hard to skip. Pinning approved content in tests turned "I reviewed it once" into "it can't silently change".

## Next week

- Point the video toolchain at my own TechWithTosin episodes and use it as a QA pass before publishing.
- Keep pushing the AI Kubernetes troubleshooter towards something I can demo outside my laptop.
