---
title: Support assistant for Buddy Up Network
order: 2
summary: "Help assistant inside the app. The answer bot already existed. Built everything around it: a three-layer safety check, a set of test cases, monitoring and rate limiting."
stack: TypeScript, Cloud Functions, OpenAI API, Firestore.
facts:
  - label: Type
    value: Feature of a client product, built at Spoton Fintech
  - label: Role
    value: Built solo, app screens and backend
  - label: Built with
    value: TypeScript, Cloud Functions, OpenAI API, Firestore, Flutter
links:
  - label: Google Play
    cta: View the app on Google Play
    url: https://play.google.com/store/apps/details?id=com.network.buddyup
    primary: true
figures:
  - value: 68 of 68
    label: safety test cases passed in the final run
  - value: "223"
    label: automated tests
flow:
  caption: The step in blue is the safety check. It runs at the same time as the answer, so it never makes the reply slower.
  steps:
    - label: Question
      sub: from a member
    - pair:
        - label: Answer bot
          sub: already existed
        - label: Safety check
          sub: three layers, 6 second limit
          mine: true
    - label: Reply
      sub: or help details and an alert to the team
---

## About the feature

Members ask the assistant a help question inside the app and get an answer straight away. Before this, support went through a form that the founders read by hand. The option to message the team now appears after the assistant has replied.

The bot that writes the answers was already running on the website, built by a teammate. This project brought it into the app and built the system around it: the app screens, the backend, the safety check, the tests, and the monitoring.

## How it works

Every question goes to the answer bot and the safety check at the same time. The safety check has its own time limit of 6 seconds. If it runs over, the reply still goes out and the check finishes in the background, so a slow check means a late alert, never a missed one.

## Key decisions

### Three separate safety layers

The members of this app include vulnerable people, so a message that suggests someone may be at risk must not slip through. The first layer is an AI classifier that returns a fixed set of labels. The second is a set of moderation scores with cut-off values, which can overrule the classifier and cannot be argued with by the person typing. The third is a keyword list, used only if both of the others fail.

### Hindi and Hinglish are treated as first-class

Testing showed that the moderation scores were weak on Hindi written in English letters. The keyword layer was extended to cover English, Hindi and Hinglish, so the check does not depend on one layer for those languages.

### A test set that every change is judged against

The classifier is tested with labelled example messages in English, Hindi and Hinglish, including messages written to trick it. Every test run is saved, so each change is compared with a real earlier result. When a failing example is added to the instructions, a new unseen example is added beside it, so the test keeps measuring new cases and not memorised ones.

### Changes ship without an app release

The classifier lives on the server and every message records which version checked it. Eight versions were shipped while it was being improved, with no app update needed for any of them.

### Monitoring, logging and rate limiting

Response times, failures and usage are recorded and summarised, with alerts for the team and limits on how often one member can ask.

## Results

| Measure | Result |
| :-- | --: |
| Safety test cases, first run | 45 of 51 |
| Safety test cases, final run | 68 of 68 |
| Automated tests | 223 |
| Classifier versions shipped without an app release | 8 |
| Cost of one safety check | $0.000259 |

<small>The test set grew from 51 to 68 cases as gaps were found, so the first and final runs are not a like-for-like comparison.</small>

The feature is live. Usage figures are not published here because they are still being collected.
