---
title: Buddy Up Network
order: 1
summary: Social app for people with disabilities and their caregivers, on iOS and Android. Sole developer since launch, with releases ongoing. Works with screen readers and includes chat, voice calls and video calls.
stack: Flutter, Firebase, Cloud Functions (Google Cloud).
note: Developed at Spoton Fintech for a client.
ongoing: true
facts:
  - label: Type
    value: Client product, built at Spoton Fintech
  - label: Role
    value: Sole developer since launch
  - label: Built with
    value: Flutter, Firebase, Cloud Functions (Google Cloud), Agora, OpenAI API
links:
  - label: Google Play
    cta: View on Google Play
    url: https://play.google.com/store/apps/details?id=com.network.buddyup
    primary: true
  - label: App Store
    url: https://apps.apple.com/in/app/buddy-up-network/id6569240717
figures:
  - value: 10,000+
    label: users
  - value: 1 to 2.5 s
    label: search time, down from 8 to 15 s
flow:
  caption: The search path today. The step in blue replaced about 14 separate requests from the phone.
  steps:
    - label: Phone
      sub: sends one request
    - label: Cloud Function
      sub: runs the whole search
      mine: true
    - label: Database
      sub: Firestore
    - label: Results
      sub: back in 1 to 2.5 s
---

## About the app

Buddy Up Network helps people with disabilities and their caregivers find friends by interest, location and disability. Members can chat, and call each other by voice or video.

The app is live on Google Play and the App Store, and has more than 10,000 users. Design, backend, both mobile apps, releases and ongoing maintenance are handled by one engineer.

## How it works

Search is one of the busiest parts of the app. It runs on the server, so the phone sends one request and gets one answer back.

## Key decisions

### Search moved from the phone to the server

Search first ran on the phone as about 14 database queries, one after another. As the app grew, it was moved into a single Cloud Function on the server. Search time went from 8 to 15 seconds down to 1 to 2.5 seconds. Profile suggestions were moved the same way.

### A smaller app that downloads faster

Unused parts of the calling library (Agora) were removed, keeping only the essential ones, along with pages, code and packages the app no longer used. App size fell by 43%, and download time went from 26 seconds to 13 seconds, both as reported by Google Play.

### AI features that stay out of the user's way

Photos and videos get a written description, so members who use a screen reader know what is in them. This runs in the background after an upload, so posting is never slowed down. Text and images are also screened automatically for harmful content, and a person makes the final decision on every ban.

### Built for screen readers

Screens are labelled and grouped so a screen reader announces them in a sensible order.

## Results

| Measure | Before | After |
| :-- | --: | --: |
| Search time | 8 to 15 s | 1 to 2.5 s |
| App size | | 43% smaller |
| Download time | 26 s | 13 s |
| Users | | 10,000+ |

<small>App size and download time are the figures Google Play reported for the optimised release.</small>
