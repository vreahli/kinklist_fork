const MD = `
## Gender Preferences

My preferences - strongly agree / strongly disagree. TODO - note that you bring your own consent discussion.

Sides: Me

- I enjoy working with males
- I enjoy working with females
- I enjoy working with trans people WOW THIS NEEDS A REWORD
- I enjoy working with gender-fluid people
- Gender doesn't matter to me
- I like long trance sessions (maybe split tist/subject)

## Session Preferences

Desc todo.

Sides: As Hypnotist, As Subject

- I like working slowly
- I like working quickly
- I like working with an unknown partner
- I like surprises (need to disambiguate, as subject)

## Role Preferences

Desc todo.

Sides: Me
- I like being submissive
- I like being dominant
- I like being a Switch

## About Me - Responses

Desc todo.

Sides: Me
- I experience phenomena easily
- I drop very easily
- I move or twitch a lot while under
- I come out of trance easily
- I am disoriented after coming back
- I experience amnesia after coming back
- I can talk/type while under

## About Me - Care and Aftercare

Desc todo.

Sides: Me
- Patient awakeners
- Quick awakeners
- I need time to reorient after a zonk
- I want removing triggers after the session
- Knowing what will happen ahead of time

## Setting

Where you want to do hypnosis.

Sides: As Hypnotist, As Subject

- Text
- Audio
- Video
- VR
- In person

## Group, Audience and Exhibition

Desc todo.

Sides: As Hypnotist, As Subject

- Multiple hypnotists at once
- Multiple subjects at once (Group Trance)
- Triggers being used in public
- Passive Audience
- Exhibitionism / being shown off
- Discrete public play
- Discrete play in kink groups
- Open play in kink groups
- I like watching other go under
- I like watching others do hypnosis
## Stimuli

Todo - mention flashing lights carry an epilepsy risk. 

Sides: As Hypnotist, As Subject

- Binaurals
- Snapping fingers
- Spirals
- Pendulums (Shiny items, crystals, pocket watches)
- Flashing light
- Metronome
- Hand movements/signs

## Styles

Desc todo.

Sides: As Hypnotist, As Subject

- Recreational (Non-Erotic)
- Erotic
- Covert
- Stage
- Street
- Conversational
- Storytelling in trance

## Inductions

Desc todo.

Sides: As Hypnotist, As Subject

- Relaxation / PMR
- Confusion / Overload
- Countdown
- Eye fixation
- Recalling Last trance
- Instant inductions
- Fractionation

## Mind and Memory

Desc todo.

Sides: As Hypnotist, As Subject
- IQ Play
- Memory play beyond amnesia
- Amnesia
- Blank and empty

## Tropes

Desc todo.

Sides: As Hypnotist, As Subject

- Repeating Mantras
- Mind control
- Brainwashing
## Role Enactment

Desc todo.

Sides: As Hypnotist, As Subject

- Puppy play
- Bratting
- Resistance Play
- Seduction (disambiguate - I like being seduced / I like seducing)

## Phenomena / Sensations

Desc todo.

Sides: As Hypnotist, As Subject

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

Sides: As Hypnotist, As Subject

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

Sides: As Hypnotist, As Subject

- Submission
- Obedience
- Captivity / helplessness
- Ordering to undress
- Ordering to masturbate
- Ordering to do something
- Ordering to do something
- Degradation
- Humiliation
- Hypnotic bondage
## Sexual

Desc todo.

Sides: As Hypnotist, As Subject

- Edging
- Denial
- Ruined Orgasms
- Touch-free pleasure
- Touch-free orgasm
- Orgasm trigger

## Vibes

I want to feel...

Sides: As Hypnotist, As Subject

- Beautiful and Sexy
- Empowered and focused
- Safe and protected
- Horny and Aroused
- Slutty and Naughty
- Vulnerable and Exposed
- Fearful and Scared

## Edge / CNC / S&M

Desc todo.

Sides: As Hypnotist, As Subject

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
      g = { caption: line.slice(3).trim(), kinks: [], sides: [], description: ""};
      groups.push(g);
    } else if (!line || !g) {
      // No group or no line? Skip...
    } else if (/^sides:/i.test(line)) {
      console.log('sides', line)
      g.sides = line.slice(6).split(",").map(s => s.trim());
    } else if (line.startsWith("- ")) {
      g.kinks.push(line.slice(2).trim())
    } else {
      g.description = g.description ? `${g.description} ${line}` : line;
    }
  })

  return groups;
}

export const GROUPS = parse(MD);

