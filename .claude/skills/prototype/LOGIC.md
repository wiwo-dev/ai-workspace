# Logic prototype

One self-contained HTML file that lets anyone **press buttons and watch what happens**. Use it when the question is about rules, steps or how things change: the kind of idea that sounds fine on paper and only feels wrong when you push real cases through it.

If the question is "what should this look like", use [UI.md](UI.md).

## When this is the right shape

- "Do these pricing tiers and discounts actually add up?"
- "Does the booking flow handle someone cancelling and rebooking?"
- "What happens in our onboarding if someone skips a step?"
- "Does this points / referral / waitlist system work the way I think?"

## Process

### 1. State the question

Before building, write down the rules being tested and the question, in one short paragraph, **visible at the top of the page**. A prototype that answers the wrong question is wasted, so make the question checkable.

### 2. Keep the rules in one place

Put the rules in a single `<script>` block as a small, pure piece of logic: given the current state and an action, it returns the new state. No buttons or page code inside it. The page calls into it; nothing flows the other way. If the idea later becomes a real product, this block is the part worth keeping.

### 3. Build the page

Plain HTML, CSS and JS, everything inline, so it opens with a double-click and can be sent to someone.

Write it for a non-developer. Every label uses the business's words, not code: "Customer cancels", not `dispatch('CANCEL')`.

Top to bottom:

1. **Title and one line** on what this lets you explore (the question from step 1).
2. **What's true right now:** the current state as a readable panel with labelled fields, not raw data. Re-render after every click and highlight what just changed.
3. **Free play:** one button per action, always available, so anyone can try things in any order.
4. **Guided walkthroughs:** one tab per scenario. Each tab has a short description (the situation and what to watch for) and the steps as buttons in order; clicking a step performs it and moves to the next. Starting a walkthrough resets to the same starting state. Pick the awkward cases: the normal path, a tricky edge case, and an attempt at something that should not be allowed.

Clean and calm: good type, generous spacing, one accent colour, no animation.

### 4. Hand it over

Open it for them. The useful moments are "wait, that shouldn't be possible" or "huh, I assumed that would work differently". Those are problems in the idea, which is exactly what the prototype is for. Add actions or scenarios when they ask.

### 5. Capture the answer

Write `VERDICT.md` and the README line as described in [SKILL.md](SKILL.md): which rules held up, which didn't, and what changed.

## Anti-patterns

- **Tests, real databases, real payments.** Everything stays inside the page.
- **Generalising.** No "what if we also wanted X later". One question.
- **Mixing the rules into the buttons.** Keep the logic block separate from the page so it stays readable and reusable.
