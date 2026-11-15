---
title: Laya moderation engine
order: 5
summary: "Open-source model that flags toxic comments, fine-tuned for free on Kaggle. Scores within 0.001 of Detoxify on the Jigsaw benchmark, and its confidence is calibrated, so about 82% of moderation decisions can be automated."
stack: Python, Hugging Face, Kaggle GPUs, Gradio, React and TypeScript.
facts:
  - label: Type
    value: Personal project, built solo
  - label: Built with
    value: Python, Hugging Face, Kaggle GPUs, Gradio, React and TypeScript
  - label: Available as
    value: Live demo, live API and open model
links:
  - label: Live demo
    cta: Open the live demo
    url: https://laya-moderation.vercel.app
    primary: true
  - label: GitHub
    url: https://github.com/vinay162/laya-moderation
  - label: Model on Hugging Face
    url: https://huggingface.co/Vinay57/laya-jigsaw-moderation
figures:
  - value: "0.9853"
    label: mean ROC-AUC on 63,978 test comments, against 0.9863 for Detoxify
  - value: About 82%
    label: of moderation decisions automated, at no cost per request
screenshot:
  src: /images/laya-site.png
  alt: The Laya demo site replaying 10,000 test comments as a grid of coloured tiles, with charts of the results beside it.
  caption: The live demo, replaying 10,000 test comments through the model.
  width: 1440
  height: 960
flow:
  caption: Steps in blue are the work on top of the base model. Each comment ends in one of three outcomes.
  steps:
    - label: Comment
    - label: Laya model
      sub: fine-tuned, then merged with the original
      mine: true
    - label: Calibration
      sub: scores match real-world odds
      mine: true
    - label: Routing rule
      sub: approve below 0.10, remove at 0.90
      mine: true
    - label: Approve, remove or send to a person
---

## Problem

Moderating comments with a large AI model through an API costs money on every request and takes seconds per comment. A small open model can run for free and much faster, but only if it is accurate, and only if its confidence can be trusted enough to act on without a person checking every comment.

Laya is an open 421-million-parameter model by ConvAI Innovations. This project fine-tuned it to answer six questions about a comment (toxic, severe toxic, obscene, threat, insult, identity hate), measured it against established models, and turned it into a working moderation policy.

## How it works

Each comment gets a score for each question. The scores are calibrated, so a 90% score means the comment really is toxic about 90% of the time. A fixed rule then approves the clearly clean comments, removes the clearly toxic ones and sends the uncertain middle to a person.

## Key decisions

### The baselines were reproduced first

Before training anything, the evaluation was run on Detoxify, a widely used toxicity model. It scored 0.9863 against its published 0.9864, which confirmed the evaluation code was correct before any result was trusted.

### A drop in one label was traced to its real cause

After fine-tuning, five labels improved but threat got worse (0.995 to 0.950 on a 10,000-comment sample). The first guess, rounding of the scores, was tested and ruled out. The real cause was two mislabelled or debatable comments among only 34 threats in the sample.

### The original and fine-tuned models were merged

Averaging the weights of the original and the fine-tuned model (WiSE-FT) keeps most of the gains while recovering what fine-tuning lost, in one model that runs at the same speed. The mix was chosen on validation data only, with the rule fixed in advance, and an even 50/50 split won.

### Hidden overconfidence was found and fixed

When the model said it was 97% sure, it was right only about 60% of the time. The cause: the training data was 48% toxic, while real comments are closer to 10%. Per-label Platt scaling, two numbers per label fitted on validation data, cut the calibration error from 0.045 to 0.013 without changing how any comments are ranked.

### It was tested like a product, not just a benchmark

The work includes a routing policy with measured outcomes, a bias test on HateCheck (3,728 test cases), a speed test, and a latency comparison against an AI model API.

## Results

| Measure | Result |
| :-- | --: |
| Mean ROC-AUC, full Jigsaw test set (63,978 comments) | 0.9853 |
| Same, for Detoxify / a simple TF-IDF baseline | 0.9863 / 0.9786 |
| Mean ROC-AUC on 54,000 comments never looked at during development | 0.9856 |
| Calibration error, before and after | 0.045 to 0.013 |
| Comments approved automatically (0.34% of these were toxic) | 77.8% |
| Comments removed automatically, with 88% precision | 4.1% |
| Comments sent to a person | 18.1% |
| Speed with a two-step check, one T4 GPU | 56.6 comments per second |
| Median time per comment, against Gemini 2.5 Flash over its API | 76 ms vs 1,840 ms |

<small>ROC-AUC is the chance that a random toxic comment scores higher than a random clean one: 0.5 is a coin flip, 1.0 is perfect. The latency comparison covers 22 comments, because the API's free tier ran out of quota.</small>

Fine-tuning ran on Kaggle's free GPUs: 72,000 training examples, 2 passes, 2 hours 12 minutes.

## Limits

English only, and tested only on Wikipedia talk page comments. Fine-tuning on the Jigsaw data brought in some known identity bias, shown by the HateCheck results. Hate written with deliberate misspellings is often missed. The live demo runs on free shared hardware, so it can take a minute or two to wake up.
