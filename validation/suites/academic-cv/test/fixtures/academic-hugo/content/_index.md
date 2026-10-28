---
sections:
- block: resume-biography-3
  content:
    button:
      text: Download CV
      url: /cv.pdf
    username: me
  design:
    avatar:
      shape: circle
      size: medium
    background:
      gradient_mesh:
        enable: true
    name:
      size: md
- block: markdown
  content:
    text: Exploring reliable software and sharing reproducible research.
    title: My Research
  design:
    columns: '1'
- block: collection
  content:
    filters:
      featured_only: true
      folders:
      - publications
    title: Featured Publications
  design:
    columns: 2
    view: article-grid
  id: papers
- block: collection
  content:
    filters:
      folders:
      - publications
    title: Recent Publications
  design:
    view: citation
- block: collection
  content:
    filters:
      folders:
      - events
    title: Recent & Upcoming Talks
  design:
    view: card
  id: talks
- block: collection
  content:
    filters:
      folders:
      - blog
    title: Recent News
  design:
    view: card
  id: news
title: ''
type: landing
---
