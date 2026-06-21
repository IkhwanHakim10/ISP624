# MyTour Malaysia — High-Fidelity Mobile Prototype

A tourist-focused public-transport navigation platform for first-time visitors to
Malaysia. It reduces confusion across MRT, LRT, KTM, Monorail and Bus by combining
**colour-coded station guidance, AI route recommendations, safe pedestrian
navigation and a unified digital tourist pass** into one clickable mobile experience.

> This is a working, clickable high-fidelity prototype built with plain HTML/CSS/JS
> (no build step). It is also a faithful blueprint for rebuilding the same flows in Figma.

## Run it

Just open `index.html` in any modern browser — no install required.

```bash
# optional local server
python3 -m http.server 8000   # then visit http://localhost:8000
```

The phone frame is fully interactive. Use the **left panel** for the colour legend
and the **right panel** to jump directly to any of the 20 screens.

## The colour system (used consistently everywhere)

| Colour | Meaning | Used in |
|--------|---------|---------|
| 🔵 Blue | Tourist Attractions | maps, routes, station guidance, onboarding |
| 🔴 Red | City Centre | "" |
| 🟣 Purple | Airport Routes | "" |
| 🟢 Green | Parks & Nature | "" |
| 🟡 Yellow | Transit & Interchange Hubs | "" |

The same colours flow from the digital map to the physical station floor markings,
signs and transfers — e.g. *"Follow the Blue Route to Platform B"*,
*"Follow the Yellow Route to the Interchange"*.

## Four primary value propositions

1. **Colour-Coded Guidance** — `Colour-Coded Route Map`, `Live Navigation`
2. **AI Route Recommendation** — `AI Route Planner` (Fastest / Cheapest / Least Walking /
   Safest Walking / Covered Walkway / Tourist-Friendly)
3. **Safe Pedestrian Navigation** — `Pedestrian Safety Navigation` (covered walkways,
   bridges, zebra crossings, lit paths, wheelchair access; avoids unsafe areas)
4. **Unified Tourist Pass** — `Tourist Pass Wallet` + `QR Pass` (1/2/3-day, covers MRT,
   LRT, KTM, Monorail, Rapid Bus, Airport Transit)

## All 20 screens

Splash · Onboarding Tutorial · Language Selection · Guest/Login · Home Dashboard ·
AI Route Planner · Colour-Coded Route Map · Live Navigation · Pedestrian Safety
Navigation · Tourist Pass Wallet · QR Pass · AI Chatbot (MyTour AI) · Tourist
Recommendations · Nearby Attractions · Emergency Assistance · Profile Settings ·
Route History · Notification Center · Transport Coverage Map · Help & Support

## Other features represented

- **MyTour AI chatbot** with realistic intent replies (routes, transfers, ticket use, emergencies)
- **Multi-language** selection (English, Malay, Chinese, Japanese, Korean, Arabic)
- **Voice navigation** cues on the live navigation screen
- **Tourist recommendation system** with distance, travel time, route & popularity score

## Files

| File | Purpose |
|------|---------|
| `index.html` | Phone frame, status bar, tab bar, presentation panels |
| `styles.css` | Design system: colour tokens, components, layout |
| `app.js` | All 20 screen templates, routing, and interactions |

## Realistic sample scenario

Destination **Batu Caves**, preference **Tourist-Friendly** → AI returns:
MRT → KL Sentral, KTM → Batu Caves, follow Blue then Green route ·
~53 min · RM 6.30 (free with pass) · 650 m walking.
