const MD = `
## Gender Preferences

What do you like? Rate what you're drawn to.

Sides: Me
Scale: interest

- Male partners
- Female partners
- Nonbinary / gender-fluid partners
- Cis partners
- Trans partners

## Spectating

Do you like to watch?

Sides: Me
Scale: love

- Watching others go under
- Watching others do hypnosis
## Session Preferences

How do you like your sessions/partners?

Sides: As Subject, As Hypnotist
Scale: love

- Working slowly
- Working quickly
- Long trance sessions
- Working with an unknown partner
- Working without a plan

## Role Preferences

[1] = hate it. [5] = love it. [+] = want to try. [-] = not applicable / don't care (hidden).

Sides: Me
Scale: love

- Subbing
- Domming
- Switching
- No power dynamics

## Responses

Sides: Me
Scale: agree

- I experience phenomena easily
- I drop very easily
- I move or twitch a lot while under
- I come out of trance easily
- I am disoriented after coming back
- I experience amnesia after coming back
- I can talk/type while under

## Care and Aftercare

Care preferences? If you don't mind either way, just mark it as N/A / No Preference.

Sides: Me
Scale: needs

- A slow, gradual wake up
- A quick wake up
- Time to reorient after a zonk
- Removing triggers after the session
- Knowing what will happen ahead of time
- I need aftercare as the subject
- I need aftercare as the 'tist

## Setting

Where you want to do hypnosis?

Sides: As Subject, As Hypnotist
Scale: love

- Text
- Audio
- Video
- VR
- In person

## Group, Audience and Exhibition

What if other people are involved?

Sides: As Subject, As Hypnotist
Scale: love

- Multiple hypnotists at once
- Multiple subjects at once (Group Trance)
- Triggers being used in public
- Passive Audience
- Showing off / being shown off
- Discreet public play
- Discreet play in kink groups
- Open play in kink groups

## Stimuli

[1] = hate it. [5] = love it. [+] = want to try. [-] = not applicable / don't care (hidden).

Sides: As Subject, As Hypnotist
Scale: love

- Binaurals
- Snapping fingers
- Spirals
- Pendulums (Shiny items, crystals, pocket watches)
- Flashing light
- Metronome
- Hand movements/signs

## Styles

What ritual flavors do you like?

Sides: As Subject, As Hypnotist
Scale: love

- Recreational (Non-Erotic)
- Erotic
- Covert
- Stage
- Street
- Conversational
- Storytelling in trance

## Inductions

What types of inductions do you like? (Y'know they're optional, right?)

Sides: As Subject, As Hypnotist
Scale: love

- Relaxation / PMR
- Confusion / Overload
- Countdown
- Eye fixation
- Recalling Last trance
- Instant inductions
- Fractionation
- No Induction / Waking

## Mind and Memory

Mental stuff. What do you like?

Sides: As Subject, As Hypnotist
Scale: love

- IQ Play
- Memory play beyond amnesia
- Amnesia
- Blank and empty

## Tropes

What tropes do you like?

Sides: As Subject, As Hypnotist
Scale: love

- Repeating Mantras
- Mind control
- Brainwashing
## Role Enactment

Roles that often go hand in hand with hypnosis. What's your jam?

Sides: As Subject, As Hypnotist
Scale: love

- Puppy play
- Bratting
- Resistance Play
- Being Seduced / Seducing

## Phenomena / Sensations

Do you like any specific phenomena?

Sides: As Subject, As Hypnotist
Scale: love

- Feeling of floating / sinking
- Emotional suggestions
- Positive Hallucinations
- Negative Hallucinations
- Freeze / ‘Stop’ Triggers
- Out of body experiences (OOBE)
- Catalepsy / immobilization
- Involuntary movement
- Post-hypnotic suggestions
- Unaware of following commands
- Unaware of movement/action

## Transformation

Transformation scenes? What flavors?

Sides: As Subject, As Hypnotist
Scale: love

- Furry
- Feral
- Feminization
- Masculinization
- Dollification
- Robotization
- Objectification
- Bimbofication
- Sissification

## Power and D/s

If you do like power dynamics - what types?

Sides: As Subject, As Hypnotist
Scale: love

- Submission
- Obedience
- Captivity / helplessness
- Undressing on command
- Masturbating on command
- Following/giving orders
- Degradation
- Humiliation
- Hypnotic bondage
## Sexual

Do you do horny stuff during hypnosis? Gross. Better say what you're in to.

Sides: As Subject, As Hypnotist
Scale: love

- Edging
- Denial
- Ruined Orgasms
- Touch-free pleasure
- Touch-free orgasm
- Orgasm trigger

## Vibes

How do you want to feel during a session as a subject? Or - how do you like to make your subject feel during a session.

Sides: As Subject, As Hypnotist
Scale: love_feeling

- Beautiful and Sexy
- Empowered and focused
- Safe and protected
- Horny and Aroused
- Slutty and Naughty
- Vulnerable and Exposed
- Fearful and Scared

## Edge / CNC / S&M

More into ghost peppers than paprika? What sorta spice levels do you like?

Sides: As Subject, As Hypnotist
Scale: love

- Consensual non consent
- Simulated Blackmail
- Simulated Drugging
- Pain triggers
- Using triggers without warning
- Dropping without warning

`;

export const SCALES = {
  "interest": {
    prefText: ["Unspecified", "Not interested", "Slightly disinterested", "Neutral", "Interested", "Very interested", "Want to try", "Don't care / NA"]
  },
  "love": {
    prefText: ["Unspecified", "Hate it", "Dislike", "Neutral", "Like it", "Love it", "Want to try", "Don't care / NA"]
  },
  "needs": {
    prefText: ["Unnecessary", "Don't want it", "Can do without", "It's OK", "Pretty important", "Must have", "UNUSED", "UNUSED"]
  },
  "love_feeling": {
    prefText: ["Unspecified", "Hate feeling", "Dislike", "Neutral", "Like feeling", "Love feeling", "Want to try", "Don't care / NA"]
  },
  "agree": {
    prefText: ["Unspecified", "Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree", "UNUSED", "Don't care / NA"]
  },
}

const parse = (md) => {
  const groups = [];
  let g = {};

  md.split(/\r?\n/).forEach((raw, i) => {
    const line = raw.trim();
    if (line.startsWith("## ")) {
      g = { caption: line.slice(3).trim(), kinks: [], sides: [], descriptions: []};
      groups.push(g);
    } else if (!line || !g) {
      // No group or no line? Skip...
    } else if (line.startsWith("//")) {
      // it's a comment
    } else if (/^sides:/i.test(line)) {
      g.sides = line.slice(6).split(",").map(s => s.trim());
    } else if (/^scale:/i.test(line)) {
      if(g.scale) {
        console.warn(`Warning - scale already set, overwriting: ${line}`)
      }
      g.scale = line.slice(6).trim();
    } else if (line.startsWith("- ")) {
      g.kinks.push(line.slice(2).trim())
    } else {
      g.descriptions.push(line);
    }
  })

  return groups;
}

export const GROUPS = parse(MD);

export const getPrefText = (scale, iStr) => {
  const i = parseInt(iStr, 10);
  return SCALES[scale]["prefText"][i];
}