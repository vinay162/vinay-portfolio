---
title: rentmyclass
order: 3
summary: "Classroom booking app with online payments. Built solo for a freelance client: Android app, backend and admin dashboard. Two people cannot book the same slot, and unpaid bookings are cancelled automatically."
stack: Flutter, Supabase (PostgreSQL), Razorpay, React.
facts:
  - label: Type
    value: Freelance project, live on Google Play
  - label: Role
    value: Built solo in about a month, from first design to store release
  - label: Built with
    value: Flutter, Supabase (PostgreSQL), Razorpay, Firebase, React
links:
  - label: Google Play
    cta: View on Google Play
    url: https://play.google.com/store/apps/details?id=com.rentmyclass.rent_my_class
    primary: true
figures:
  - value: Live
    label: on Google Play
  - value: 10 min
    label: before an unpaid booking is cancelled
flow:
  caption: Steps in blue are the rules that keep bookings and payments correct.
  steps:
    - label: Pick a slot
      sub: in the app
    - label: Slot locked
      sub: one booking at a time
      mine: true
    - label: Held for 10 minutes
      sub: released by the server if unpaid
      mine: true
    - label: Payment
      sub: Razorpay
    - label: Payment verified
      sub: on the server
      mine: true
    - label: Booked
---

## About the app

rentmyclass lets people find a classroom, pick a time slot and pay for it from their phone. The owner manages everything from a web dashboard.

It was built end to end by one person for a freelance client: the Android app, the backend, the payment flow, the admin dashboard and the Google Play release. From the first line of code to live on Google Play took about one month, including the 14-day test with 12 testers that Google Play requires before a new app can go public.

## How it works

A booking is only confirmed after the payment has been verified on the server. Until then the slot is held for the person who picked it, and nobody else can take it.

## Key decisions

### Two people cannot book the same slot

When two people try to book the same slot at the same moment, the database locks the slot's row so only one booking goes through (PostgreSQL row-level locking).

### Unpaid bookings are released automatically

A slot that is picked but not paid for within 10 minutes goes back on sale. The release is done by a scheduled job inside the database (pg_cron), not by the app. It still happens if the user closes the app, loses connection or the phone switches off, so a slot can never stay blocked because of something on the user's side.

### Prices and payments are decided on the server

The price, including peak-time pricing, is calculated on the server and never trusted from the phone. Payments go through Razorpay, and each payment notification is checked with a signature (HMAC) before a booking is marked as paid.

### Sign-in by phone number

Users sign in with a one-time code sent to their phone (Firebase), so there is no password to remember. Database rules (row-level security) make sure each user can only read and change their own data.

### A dashboard for the owner

A React web dashboard lets the owner manage bookings and see how the classrooms are being used.

## Results

| Part | What was delivered |
| :-- | :-- |
| Timeline | About one month from start to live, including Google Play's 14-day, 12-tester test |
| Android app | Live on Google Play |
| Payments | Razorpay, with server-side verification |
| Backend | Supabase: PostgreSQL, security rules, server functions in TypeScript |
| Admin dashboard | React web app for bookings and analytics |
