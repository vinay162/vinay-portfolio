---
title: Lore
order: 4
summary: Desktop app that answers questions about PDF and Word documents and shows the source of each answer. Fully offline, so documents never leave the computer.
stack: Python (FastAPI), Tauri and React, Ollama, ChromaDB.
facts:
  - label: Type
    value: Personal project, built solo
  - label: Built with
    value: Python (FastAPI), Tauri and React, Ollama, ChromaDB
  - label: Platform
    value: Windows desktop, fully offline
links:
  - label: GitHub
    cta: View code on GitHub
    url: https://github.com/vinay162/lore
    primary: true
figures:
  - value: 100%
    label: of test questions matched to the right passage
  - value: 93 to 99%
    label: answer recall across three models, on an 8 GB laptop
screenshot:
  src: /images/lore-chat.jpg
  alt: Lore's chat screen. A question about a document is answered in one sentence with a numbered citation, and the cited page is open on the right with the source text highlighted.
  caption: Lore answering a question, with the source page open on the right.
  width: 1366
  height: 728
flow:
  caption: Steps in blue are the search pipeline. The model only sees the 5 passages they select.
  steps:
    - label: Question
    - pair:
        - label: Keyword search
          sub: best 20 matches
          mine: true
        - label: Meaning search
          sub: best 20 matches
          mine: true
    - label: Merge the two lists
      mine: true
    - label: Re-check the best 15
      sub: keep 5
      mine: true
    - label: Local AI model
      sub: runs on the laptop
    - label: Answer with sources
---

## Problem

Most AI tools that answer questions about a document need it uploaded to someone else's server. That rules them out for private files such as contracts or medical records.

Lore does the same job on an ordinary laptop, using open-source models and no internet connection.

## How it works

The model is small, so answer quality depends on giving it the right passages. Most of the work is in the steps before the model.

## Key decisions

### Two kinds of search instead of one

Keyword search (BM25) finds exact terms such as names and version numbers. Meaning search (vector search) finds text that says the same thing in different words. Each catches what the other misses.

### Results merged by position, not by score

The two searches score results on different scales, so the scores cannot be compared directly. Reciprocal Rank Fusion only uses each result's position in its own list, so nothing has to be converted.

### A slower, more careful check on a short list

A cross-encoder reads the question and a passage together, which is more accurate but too slow to run on every passage. It re-checks only the 15 best candidates and keeps 5.

## Results

25 test questions with known answers, run against several small models on a laptop with an i5-7200U processor, 8 GB of memory and no graphics card.

| Model | Right passage found | Answer recall | Average time |
| :-- | --: | --: | --: |
| qwen2.5:1.5b <small>with the re-check step</small> | 100% | 97% | 34.4 s |
| qwen2.5:1.5b <small>before the re-check step was added</small> | 100% | 99% | 31.9 s |
| gemma2:2b | 100% | 97% | 50.9 s |
| llama3.2:1b | 100% | 93% | 34.6 s |
| deepseek-r1:1.5b <small>writes out its reasoning, which the scoring method does not handle well</small> | 100% | 50% | 73.7 s |

<small>Answer recall is the share of expected key facts that appear in the answer.</small>

The right passage was found for every question with every model. The models differ in how well they write the answer, and how fast.
