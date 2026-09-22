# AH Growth Website Design Skill

## Project Name

AH Growth Premium Software Agency Website


# Role

You are a senior creative frontend engineer and digital experience designer.

Your responsibility is to build a world-class agency website that combines:

- Premium design
- Smooth interactions
- Storytelling
- Modern frontend architecture
- High performance


Do not create a generic template website.

The final experience should feel like:

- Creative technology agency
- Premium software studio
- Modern digital product company


---

# Core Goal

Create a website that communicates:

- Trust
- Innovation
- Technical expertise
- Creativity
- Human team behind the company


The website should balance:

70% premium design + storytelling

30% technology demonstration


---

# Design Philosophy


## Main Principle

Consistency + Creativity


Maintain consistency through:

- Same typography system
- Same colors
- Same spacing
- Same button language
- Same transition quality
- Same animation style


Create creativity through:

- Different section interactions
- Different page experiences
- Different storytelling methods


Every page should feel unique but belong to the same brand.


---

# Technology Stack


Framework:
Next.js App Router


Language:
TypeScript


Styling:
Tailwind CSS


Animation:

- GSAP
- GSAP ScrollTrigger
- Framer Motion


Smooth Scrolling:

- Lenis


3D:

- Three.js
- React Three Fiber
- Drei


UI:

shadcn/ui

Use only for:
- Forms
- Inputs
- Dialogs
- Accessibility components


---

# Design System


## Colors


Background:

#0A0A0A


Primary:

#F5F5F0


Accent:

#08072b


Secondary:

#8A8A8A



## Typography


Headings:

- Neue Montreal
- Satoshi
- Space Grotesk


Body:

- Inter
- Geist



## Visual Style


Use:

- Large typography
- Editorial layouts
- Premium spacing
- Cinematic visuals
- Minimal UI


Avoid:

- Generic cards
- Excessive gradients
- AI-looking random effects
- Too many glowing elements


---

# Website Architecture


## Global Components


Create:


components/

layout/

- Header
- Footer


hero/

- PageHero


animations/

- PageTransition
- TextReveal
- ImageReveal
- ScrollReveal
- MagneticButton
- Parallax
- CustomCursor


common/

- Button
- Container
- SectionTitle


---

# Header


Navbar:


Logo

Home

Services

Work

About Us

Goals

Testimonials

Contact


CTA button


Behavior:

Before scroll:

Transparent


After scroll:

Blur background + sticky


Interactions:

- Smooth hover
- Active page indicator
- Magnetic button effect


---

# Global Hero System


Every page must have a full viewport hero.


Height:

100vh


Structure:


Small label


Large heading


Description


CTA


Visual element


---

# Hero Animation


Sequence:


1. Background appears

2. Heading reveals line by line

3. Description fades

4. Button enters

5. Visual animation starts


Use:

- GSAP timeline
- Split text animation
- Smooth easing


---

# Home Page


Route:

/


## Hero


Purpose:

Introduce AH Growth


Visual:

- Abstract 3D technology
- Interactive background
- Premium motion


---


## Trust Counter Section


Below hero.


Metrics:


Projects Delivered

Happy Clients

Retention Rate

Years Experience


Animation:

Numbers count automatically when visible.


---


## Technology Strip


Purpose:

Show technical expertise.


Technologies:


React

Next.js

TypeScript

Node.js

Python

AI

AWS

Docker



Animation:

Infinite marquee.


Hover:

Pause + scale.


---


# Services Section


Do NOT use simple cards.


Use:

Editorial split-screen layout.


Structure:


Service content left

Visual right


On scroll:


Text enters from left.

Image enters from right.


Alternate direction:


Service 1:

Text Left
Image Right


Service 2:

Image Left
Text Right



Animation:


- GSAP ScrollTrigger
- Text reveal
- Image parallax
- Scale animation


Services:


Web Development

App Development

UI/UX Design

AI Automation

Digital Marketing

SEO

Branding


---

# Services Page


Route:

/services


Layout:

Interactive service list.


Example:


01 Web Development

02 AI Automation

03 Digital Marketing


Hover:


- Expand row
- Show description
- Reveal image
- Show technologies



---

# Service Detail Pages


Route:


/services/[slug]


Template:


Hero

Overview

Problems

Solution

Features

Technology

Process

Case Studies

CTA



Each service should have different visual identity.



Example:


AI Automation:

Neural network visuals


Digital Marketing:

Analytics/data visuals


Development:

Code/product visuals


---

# Work Page


Route:

/work


Goal:

Showcase agency capability.


Do not use basic project cards.


Use:

Sticky Scroll Case Study Experience.


Structure:


Project information changes while image remains fixed.



Example:


MODISCH


Challenge

Solution

Technology

Result



Then:


FITLAT


SOLARLINK


CAKESPOT



Animation:


- Sticky sections
- Image morph
- Smooth transitions
- Parallax


---

# Project Detail Pages


Route:


/work/[slug]


Structure:


Project Hero


Client


Challenge


Solution


Design Process


Technology


Results


Next Project


---

# About Us Page


Route:

/about


Purpose:

Tell complete company story.



Sections:


## Hero

Meet the people behind AH Growth.



## Company Story


Timeline:


Founded

Growth

Expansion

Future



## Leadership


CEO:


Photo

Name

Founder & CEO

Vision message



Manager:


Photo

Name

Role

Message



## Team


Grid:


Photo

Name

Role

Skills



Animation:

Stagger reveal.


## Culture


Values:

Innovation

Quality

Transparency

Growth



---

# Goals Page


Route:

/goals


Structure:


Vision

Business Goals

Client Goals

Technology Goals

Future Roadmap



Animation:

Timeline storytelling.



---

# Testimonials Page


Route:

/testimonials


Structure:


Hero

Reviews

Client logos

Video testimonials



Animation:

Floating cards

Smooth slider



---

# Contact Page


Route:

/contact


Structure:


Hero

Contact Form

Email

Social links

CTA



Animation:

Large typography reveal.



---

# Page Transition System


Implement:


## Curtain Reveal

For normal page navigation.


## Morph Transition

For:

Project card → Case study


## Fade Slide

For simple transitions.



---

# Interaction Library


Create reusable effects:


## Text

- Split reveal
- Fade up
- Character animation


## Images

- Parallax
- Scale reveal
- Clip reveal


## Cards

- Hover expansion
- 3D tilt
- Cursor interaction


## Buttons

- Magnetic effect


## Cursor

States:

Default

Hover

View project

Click


---

# Asset Management


Use:


public/assets/


Structure:


images/

hero/

services/

projects/

team/


videos/

icons/


Optimize:

- WebP
- AVIF
- SVG


Use Next Image.


Heavy videos:

Use CDN.


---

# Development Order


Follow:


Phase 1:

Architecture

Routing

Components


Phase 2:

Build all pages without animations.


Phase 3:

Responsive design.


Phase 4:

Design polish.


Phase 5:

Add animations.


Phase 6:

Add advanced 3D.


Phase 7:

Performance optimization.



---

# Performance Rules


Maintain:


- Fast loading
- Mobile optimization
- Safari compatibility
- 60 FPS animations


Avoid:

- Heavy unnecessary effects
- Large unoptimized images
- Blocking videos


---

# Claude Code Rules


Before coding:


Analyze existing structure.


Create reusable components.


Do not duplicate code.


Do not create random animations.


Follow this skill file as the main design reference.


When implementing:

Build one section at a time.

After each section:

Check:

- Design quality
- Responsiveness
- Performance
- Animation smoothness


Final goal:

Create an award-level premium agency website experience for AH Growth.