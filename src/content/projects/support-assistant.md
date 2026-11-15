---
title: AI support assistant for Buddy Up Network
order: 2
summary: "Help assistant inside the app: answer generation, a three-layer safety check, a set of test cases, monitoring and rate limiting."
stack: TypeScript, Cloud Functions, OpenAI API, Firestore.
facts:
  - label: Type
    value: Feature of a client product, built at Spoton Fintech
  - label: Role
    value: Sole owner, from app screens and backend to the help content
  - label: Built with
    value: TypeScript, Cloud Functions, OpenAI API, Firestore, Flutter
links:
  - label: Google Play
    cta: View the app on Google Play
    url: https://play.google.com/store/apps/details?id=com.network.buddyup
    primary: true
figures:
  - value: 93%+
    label: fewer support messages needing a person, over about a month
  - value: 2.9 s
    label: median response time, down from 11 to 14 s
flow:
  caption: Both steps in blue run inside the app's own backend, at the same time, so the safety check never makes the reply slower.
  steps:
    - label: Question
      sub: from a member
    - pair:
        - label: Answer
          sub: one model call, help content in the prompt
          mine: true
        - label: Safety check
          sub: three layers, 6 second limit
          mine: true
    - label: Reply
      sub: or help details and an alert to the team
---

## About the feature

Members ask the assistant a help question inside the app and get an answer straight away. Before this, support requests went through a form that the team reviewed by hand. The option to message the team now appears after the assistant has replied, and support messages that need a person fell by more than 93% over about a month.

The whole feature runs in the app's own backend: the app screens, answer generation, the safety check, the tests and the monitoring. The help content the answers are based on was rewritten and updated as part of this work.

## How it works

Every question goes to the answer step and the safety check at the same time. The answer comes from a single model call that carries the help content and the member's question. The safety check has its own time limit of 6 seconds. If it runs over, the reply still goes out and the check finishes in the background, so a slow check means a late alert, never a missed one.

## Key decisions

### No retrieval system where one was not needed

For a while, questions went to a separate answer bot that was already running on the website. It added a lot of waiting time and gave little control over the answers. The help content turned out to be small enough to send in full with every question, so the bot was replaced with one direct model call inside the backend, with no search or retrieval step. The simpler version was tried first, and it has answered well since. Response time went from 11 to 14 seconds to a median of 2.9 seconds.

### Three separate safety layers

The members of this app include vulnerable people, so a message that suggests someone may be at risk must not slip through. The first layer is an AI classifier that returns a fixed set of labels. The second is a set of moderation scores with cut-off values, which can overrule the classifier and cannot be argued with by the person typing. The third is a keyword list, a backstop if the model layers are unavailable.

### Hindi and Hinglish are treated as first-class

Many members write in Hindi or in Hindi typed in English letters. Every layer was tested in English, Hindi and Hinglish, and the keyword layer covers all three.

### A test set that every change is judged against

The classifier is tested with labelled example messages in English, Hindi and Hinglish, including messages written to trick it. Every test run is saved, so each change is compared with a real earlier result. When a failing example is added to the instructions, a new unseen example is added beside it, so the test keeps measuring new cases and not memorised ones.

### Changes ship without an app release

The classifier lives on the server and every message records which version checked it. Eight versions were shipped while it was being improved, with no app update needed for any of them.

### Monitoring, logging and rate limiting

The response time of every question and reply is measured inside the pipeline and stored with the message. A second, automated check scores whether each reply actually answered the question. Failures raise alerts, and rate limits stop any one member from flooding the system.

## Results

| Measure | Result |
| :-- | --: |
| Support messages needing a person | down by more than 93% over about a month |
| Chats resolved without a person | 95% |
| Replies that answered the question, by the automated check | 91% |
| Replies delivered | 100% |
| Response time, median / 95th percentile | 2.9 s / 8.2 s |
| Response time with the earlier separate bot | 11 to 14 s |
| Safety test cases, first run | 45 of 51 |
| Safety test cases, final run | 68 of 68 |
| Automated tests | 223 |
| Classifier versions shipped without an app release | 8 |

<small>The test set grew from 51 to 68 cases as gaps were found, so the first and final runs are not a like-for-like comparison.</small>
