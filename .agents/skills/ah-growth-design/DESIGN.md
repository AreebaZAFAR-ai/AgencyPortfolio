# AH Growth Website Design System

Version: 1.0

---

# Design Vision

Create a premium interactive software agency website.

The experience should feel like:

- Digital product studio
- Luxury creative agency
- Modern technology company

The website should combine:

- Strong typography
- Cinematic motion
- Interactive storytelling
- Premium layouts


Main principle:

## Consistent Brand + Unique Experiences

Every page should feel connected, but every section should introduce a new interaction pattern.

Avoid repetitive:
- Fade up everywhere
- Same card layout everywhere
- Same hover effect everywhere

---

# Global Design Rules


## Layout System

Use:

- Large whitespace
- Editorial spacing
- Full-width sections
- Asymmetric layouts
- Large typography


Container:

Maximum width:
1280px - 1440px


Section spacing:

Desktop:
120px - 180px


Mobile:
60px - 90px


---

# Global Animation Language


All animations should feel:

- Smooth
- Cinematic
- Premium
- Intentional


Animation timing:

Fast interactions:

0.2s - 0.4s


Section reveals:

0.8s - 1.2s


Page transitions:

1s - 1.5s


Easing:

Use smooth custom easing.

Avoid linear animations.


---

# Page Transition System


## 1. Curtain Reveal


Usage:

Normal page navigation.


Behavior:

Current page:

↓


Dark overlay expands


↓


New page reveals



Feeling:

Luxury agency transition.



---

## 2. Morph Transition


Usage:

Work cards → Case study pages



Example:


Project thumbnail


↓

Expands into full project hero



Technology:

- Shared layout animation
- Framer Motion


---

## 3. Smooth Fade Slide


Usage:

Simple page changes.



Behavior:

Old content fades


New content slides upward



---

# Header Design


## Layout


Transparent floating navbar.



Structure:


Logo

Navigation

CTA



## Scroll Behavior


Initial:

Transparent


After scroll:

Glass blur background

Border appears


## Animation


Menu items:

Stagger reveal


CTA:

Magnetic hover



---

# HERO DESIGN SYSTEM


Every page has:

Full viewport hero.


Height:

100vh



## Layout


Left:

Text


Right:

Visual


or


Centered:

Typography + Visual



## Hero Animation


Sequence:


1. Background visual appears


2. Heading split reveal


3. Description fade


4. CTA movement


5. Floating visual animation



---

# HOME PAGE DESIGN


## Hero


Layout:

Cinematic full-screen hero.



Visual:

- 3D object
- Abstract technology
- AI visuals


Effects:

- Mouse movement
- Parallax
- Floating animation


---

# Trust Counter Section


Layout:

Four large numbers.


Example:


150+

Projects


80+

Clients


95%

Retention



Animation:


When entering viewport:


Number starts from zero


↓

Counts upward



Additional effects:

Cards appear with stagger.



---

# Technology Strip


Layout:

Horizontal infinite marquee.



Example:


React → Next → AI → AWS



Animation:


Continuous movement.



Hover:


- Pause
- Scale item
- Highlight



---

# Services Preview Section


Layout:

Bento Grid.



Cards:


Different sizes.

Example:


Large:

Web Development


Medium:

AI


Small:

SEO



Hover:


Card expands


Image reveals


Description appears



Animation:


Stagger entrance.



---

# SERVICES PAGE DESIGN


## Hero


Visual:

Technology-focused background.



---

# Service Showcase


Main layout:

Split Screen Editorial Layout.



Example:


LEFT:

Service title

Description

Technology


RIGHT:

Visual



Scroll behavior:


Text enters from left


Image enters from right



Alternate every service:


Service 1:

Text Left

Image Right



Service 2:

Image Left

Text Right



Animation:


- GSAP ScrollTrigger
- Parallax
- Scale reveal



---

# Service Detail Page Design


Layout:


## Hero

Large title + visual.


## Problem Section


Layout:

Large typography.


Animation:

Words reveal.



## Solution Section


Layout:

Image + text split.


Animation:

Image clip reveal.



## Process Section


Layout:

Timeline.


Animation:

Line draws while scrolling.



## Technology Section


Layout:

Floating technology icons.


Animation:

Hover movement.



---

# WORK PAGE DESIGN


Goal:

Create strongest portfolio experience.


Avoid:

Simple project cards.



---

# Work Hero


Layout:


Large heading:


"Our work creates impact"



Background:

Project visuals.



Animation:

Project images float behind text.



---

# Portfolio Showcase


Recommended:


## Sticky Scroll Case Study


Layout:


LEFT:

Project information


RIGHT:

Large project image



During scrolling:


Project details change


Image transitions



Effects:


- Sticky positioning
- Image morph
- Smooth scale
- Parallax



---

# Project Card Hover


When hovering project:


Image:

Zoom


Overlay:

Appears


Text:

Slides upward



Cursor:

Changes to:

"View Project"



---

# Project Detail Page


Layout:


## Hero

Full image.


## Challenge


Large typography.


## Solution


Visual storytelling.


## Technology


Interactive stack.


## Results


Animated numbers.



---

# ABOUT PAGE DESIGN


Goal:

Humanize company.


---

# About Hero


Visual:

Team/company image.



Animation:

Slow zoom background.


Text:

Elegant reveal.



---

# Company Story


Layout:

Vertical timeline.



Example:


Founded

↓

Growth

↓

Expansion

↓

Future



Animation:

Timeline line draws.



---

# Leadership Section


Layout:


Large CEO and Manager portraits.



Card style:

Minimal.



Hover:


Image expands


Message appears



Animation:

Image reveal + text slide.



---

# Team Section


Layout:


Editorial team grid.



Cards:


Image

Name

Role



Hover:


Card lifts


Skills appear



Animation:

Stagger reveal.



---

# Culture Section


Layout:


Large words:


Innovation

Quality

Growth



Animation:

Typography movement.



---

# GOALS PAGE DESIGN


Layout:

Future roadmap.



Use:


Horizontal timeline.



Animation:


Scroll controls timeline progress.



Visual:

Abstract future technology.



---

# TESTIMONIAL PAGE DESIGN


Layout:


Floating testimonial cards.



Animation:


Cards move slowly.


Hover:


Card expands.



Additional:

Client logo wall.



---

# CONTACT PAGE DESIGN


Goal:

Strong final impression.



Hero:

Large typography.



Example:


"Let's build something exceptional."



Animation:

Letters reveal individually.



Form:


Minimal floating form.



Input interaction:


Smooth border animation.



---

# MOBILE DESIGN RULES


Mobile is not desktop scaled down.



Adjust:


Hero:

Reduce visual complexity.


Animations:

Keep smooth.


Disable:

Heavy 3D effects if needed.



Use:

Static image fallback for heavy videos.



---

# Performance Rules


Always optimize:

Images

Videos

3D assets


Use:

- Lazy loading
- Next Image
- Compressed assets
- GPU-friendly animations



Avoid:

- Too many simultaneous animations
- Heavy particles everywhere
- Large blocking videos



---

# Final Experience Goal


When a user visits AH Growth:

First impression:

"Professional technology company."


After scrolling:

"These people create high-quality digital products."


After exploring:

"I trust this agency with my project."


The website should feel like a premium interactive digital experience, not a normal business website.