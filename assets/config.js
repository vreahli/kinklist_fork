const MD = `
## Gender Preferences

What do you like? Rate what you're drawn to.

[1] = not interested. [5] = very interested. [+] = want to try. [-] = don't care.

Sides: Me

- Male partners
- Female partners
- Nonbinary / gender-fluid partners
- Cis partners
- Trans partners

## About Me - Spectating

Desc todo.

[1] = hate it. [5] = love it. [+] = want to try. [-] = not applicable / don't care.

Sides: Me

- Watching others go under
- Watching others do hypnosis
## Session Preferences

Desc todo.

[1] = hate it. [5] = love it. [+] = want to try. [-] = not applicable / don't care.

Sides: As Subject, As Hypnotist

- Working slowly
- Working quickly
- Working with an unknown partner
- Working without a plan
- Knowing what will happen ahead of time
- Long trance sessions (maybe split tist/subject)

## Role Preferences

Desc todo.

[1] = hate it. [5] = love it. [+] = want to try. [-] = not applicable / don't care.

Sides: Me
- Subbing
- Domming
- Switching

## About Me - Responses

[1] = strongly disagree. [5] = strongly agree. [+] = want to try. [-] = not applicable / don't care.

Sides: Me
- I experience phenomena easily
- I drop very easily
- I move or twitch a lot while under
- I come out of trance easily
- I am disoriented after coming back
- I experience amnesia after coming back
- I can talk/type while under

## About Me - Care and Aftercare

Desc todo. PROBLEM - mixture of like/dislike and needs.

[1] = don't want. [3] = nice to have. [5] = must have. [+] = want to try. [-] = not applicable / don't care. TODO DROP + NO TRY

Sides: Me
- A slow, gradual wake up
- A quick wake up
- Time to reorient after a zonk
- Removing triggers after the session

## Setting

Where you want to do hypnosis.

[1] = hate it. [5] = love it. [+] = want to try. [-] = not applicable / don't care.

Sides: As Subject, As Hypnotist

- Text
- Audio
- Video
- VR
- In person

## Group, Audience and Exhibition

Desc todo.

[1] = hate it. [5] = love it. [+] = want to try. [-] = not applicable / don't care.

Sides: As Subject, As Hypnotist

- Multiple hypnotists at once
- Multiple subjects at once (Group Trance)
- Triggers being used in public
- Passive Audience
- Showing off / being shown off
- Discreet public play
- Discreet play in kink groups
- Open play in kink groups

## Stimuli

Todo - mention flashing lights carry an epilepsy risk. 

[1] = hate it. [5] = love it. [+] = want to try. [-] = not applicable / don't care.

Sides: As Subject, As Hypnotist

- Binaurals
- Snapping fingers
- Spirals
- Pendulums (Shiny items, crystals, pocket watches)
- Flashing light
- Metronome
- Hand movements/signs

## Styles

Desc todo.

[1] = hate it. [5] = love it. [+] = want to try. [-] = not applicable / don't care.

Sides: As Subject, As Hypnotist

- Recreational (Non-Erotic)
- Erotic
- Covert
- Stage
- Street
- Conversational
- Storytelling in trance

## Inductions

Desc todo.

[1] = hate it. [5] = love it. [+] = want to try. [-] = not applicable / don't care.

Sides: As Subject, As Hypnotist

- Relaxation / PMR
- Confusion / Overload
- Countdown
- Eye fixation
- Recalling Last trance
- Instant inductions
- Fractionation

## Mind and Memory

Desc todo.

[1] = hate it. [5] = love it. [+] = want to try. [-] = not applicable / don't care.

Sides: As Subject, As Hypnotist
- IQ Play
- Memory play beyond amnesia
- Amnesia
- Blank and empty

## Tropes

Desc todo.

[1] = hate it. [5] = love it. [+] = want to try. [-] = not applicable / don't care.

Sides: As Subject, As Hypnotist

- Repeating Mantras
- Mind control
- Brainwashing
## Role Enactment

Desc todo.

[1] = hate it. [5] = love it. [+] = want to try. [-] = not applicable / don't care.

Sides: As Subject, As Hypnotist

- Puppy play
- Bratting
- Resistance Play
- Being Seduced / Seducing

## Phenomena / Sensations

Desc todo.

[1] = hate it. [5] = love it. [+] = want to try. [-] = not applicable / don't care.

Sides: As Subject, As Hypnotist

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

Desc todo.

[1] = hate it. [5] = love it. [+] = want to try. [-] = not applicable / don't care.

Sides: As Subject, As Hypnotist

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

Desc todo.

[1] = hate it. [5] = love it. [+] = want to try. [-] = not applicable / don't care.

Sides: As Subject, As Hypnotist

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

Desc todo.

[1] = hate it. [5] = love it. [+] = want to try. [-] = not applicable / don't care.

Sides: As Subject, As Hypnotist

- Edging
- Denial
- Ruined Orgasms
- Touch-free pleasure
- Touch-free orgasm
- Orgasm trigger

## Vibes

How do you want to feel during a session as a subject? Or - how do you like to make your subject feel during a session.

[1] = I hate feeling... [5] = I love feeling... [+] = want to try. [-] = not applicable / don't care.

Sides: As Subject, As Hypnotist

- Beautiful and Sexy
- Empowered and focused
- Safe and protected
- Horny and Aroused
- Slutty and Naughty
- Vulnerable and Exposed
- Fearful and Scared

## Edge / CNC / S&M

Desc todo.

[1] = hate it. [5] = love it. [+] = want to try. [-] = not applicable / don't care.

Sides: As Subject, As Hypnotist

- Consensual non consent
- Simulated Blackmail
- Simulated Drugging
- Pain triggers
- Using triggers without warning
- Dropping without warning
`;

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
    } else if (/^sides:/i.test(line)) {
      g.sides = line.slice(6).split(",").map(s => s.trim());
    } else if (line.startsWith("- ")) {
      g.kinks.push(line.slice(2).trim())
    } else {
      g.descriptions.push(line);
    }
  })

  return groups;
}

export const GROUPS = parse(MD);

