import random
import pandas as pd
# Expanded templates per category with more social media-like language
categories = {
    "Hate Speech": [
        "I can’t stand [group]. They’re pure trash and ruin everything.",
        "[group] are filthy [slur]. Get them outta here!",
        "Why does everyone hate [group]? Oh wait, they’re [derogatory].",
        "[group] are terrorists who destroy our way of life.",
        "Hate how [group] act like they own the place. [slur]!",
        "[group] are just [derogatory]. Ban them already.",
        "No wonder [group] get no respect. Bunch of [slur].",
        "[group] think they’re better than us? [derogatory] losers.",
        "Kick all [group] back to where they came from! [slur]",
        "Sick of [group] causing chaos. They’re [derogatory]."
    ],
    "Sexual Content": [
        "Yo, check this spicy [link] 😍 Too hot for you!",
        "Leaked nudes at [link]! Don’t miss it, fam! 🔥",
        "18+ vibes only, slide into [link] for the real stuff 😈",
        "She’s dropping NSFW content at [link]. Wild! 💦",
        "Hottest OnlyFans leaks here: [link] 😏",
        "DM me for exclusive adult vids, no cap 😜",
        "Live cam show at [link]. She’s unreal! 💋",
        "Naughty stuff waiting at [link]. You in? 😘",
        "Pics too steamy for public! [link] 😳",
        "Join the adult party at [link], it’s lit! 🔥"
    ],
    "Violent/Threatening": [
        "Say that again and I’ll [violent_act] you, [slur]!",
        "Someone needs to [violent_act] that [derogatory] clown.",
        "Watch your back, [slur], or you’re done.",
        "I’m gonna [violent_act] you next time I see you.",
        "Hope you get [violent_act] for talking like that, [slur].",
        "[group] like you deserve a [violent_act].",
        "You’re begging for a [violent_act], [derogatory].",
        "I’ll [violent_act] your whole squad, [slur]!",
        "Better hide, or I’m coming to [violent_act] you.",
        "One more word and I’ll [violent_act] you into next week!"
    ],
    "Self-harm/Suicidal": [
        "I’m so done with everything. Just wanna [self_harm_act].",
        "Nobody gives a [curse] about me. Why even try?",
        "Thinking about [self_harm_act]. Life’s pointless.",
        "I just wanna [self_harm_act] and disappear forever.",
        "Every day hurts. [self_harm_act] feels like the only way.",
        "Can’t keep going. [self_harm_act] is all I think about.",
        "I’m faking being okay. Really just want to [self_harm_act].",
        "Would anyone care if I [self_harm_act]? Doubt it.",
        "All I see is pain. [self_harm_act] might fix it.",
        "Don’t wanna see tomorrow. [self_harm_act] calling me."
    ],
    "Bullying": [
        "Lmao, you’re such a [derogatory]. Everyone hates you.",
        "@[user], you’re a [slur]. Quit embarrassing yourself.",
        "Bro, you’re so [derogatory], no wonder you got no friends.",
        "Why you even here? You’re a [slur] and a joke.",
        "Go [self_harm_act], [derogatory]. Nobody wants you around.",
        "Your whole vibe screams [derogatory]. Fix yourself.",
        "@[user], you’re a walking [slur]. Log off already.",
        "Bet your DMs are empty, you [derogatory] loser.",
        "You’re the definition of [slur]. Cringe af.",
        "Keep crying, [derogatory]. Nobody cares about you."
    ],
    "Misinformation": [
        "[curse] vaccines! They’re [misinfo_term] and dangerous!",
        "Wake up! The Earth is [misinfo_term], NASA’s a scam.",
        "5G is [misinfo_term] tech to fry your brain.",
        "COVID’s a [misinfo_term] plot by [group] to control us.",
        "[group] are behind the [misinfo_term] agenda. Trust me!",
        "Climate change? Total [misinfo_term] by globalists.",
        "Masks are [misinfo_term] to weaken you. Ditch them!",
        "Moon landing was [misinfo_term]. All staged, bro.",
        "Mainstream media pushes [misinfo_term] lies 24/7.",
        "Don’t fall for the [misinfo_term] science scam!"
    ],
    "Spam": [
        "Yo, win $10K now! Click [spamlink] 💰",
        "You’re the 1Mth visitor! Free iPhone at [spamlink] 🎉",
        "Make bank from your couch! [spamlink] 💸",
        "Limited deal! Get rich quick: [spamlink] 🚀",
        "Claim your prize now at [spamlink]! Don’t wait! 🎁",
        "Passive income hack at [spamlink]. Join now! 💪",
        "Free crypto giveaway! Click [spamlink] 🤑",
        "Only 24hrs left! [spamlink] for the best deal! ⏰",
        "Unlock $1K/day with [spamlink]. No scam! 💼",
        "Your VIP pass awaits at [spamlink]! 😎"
    ],
    "Neutral": [
        "Just vibing with some pizza tonight 🍕",
        "Weather’s dope today, might hit the park.",
        "Binge-watched a new show, pretty chill.",
        "Yo, anyone got recs for a good playlist?",
        "Reading this book and it’s kinda fire.",
        "Trying to cook something new, wish me luck lol.",
        "Lowkey cleaning my setup this weekend.",
        "Joined a Zoom call, same old vibes.",
        "Nothing crazy today, just chilling.",
        "Feeling meh but we keep it moving."
    ],
    "Positive": [
        "You’re killing it! Keep shining, fam! ✨",
        "This squad is straight-up [positive_term]. Love y’all! 💖",
        "Proud af of what I pulled off today! 💪",
        "Big love to everyone grinding out there! 🫶",
        "You’re [positive_term] and unstoppable! Keep it up!",
        "Good vibes only, better days ahead! 🌈",
        "Your energy is [positive_term]! Stay awesome! 😎",
        "@[user], you’re a [positive_term] legend! 🙌",
        "That smile of yours? [positive_term] vibes! 😊",
        "Let’s spread some [positive_term] love today! 💕"
    ]
}

# Configuration
samples_per_category = 3000
groups = ["immigrants", "women", "men", "foreigners", "gamers", "students", "locals", "boomers", "zoomers", "liberals", "conservatives"]
slurs = ["idiots", "losers", "freaks", "scum", "trash", "clowns", "thugs", "snowflakes", "degenerates", "weirdos"]
derogatory_terms = ["pathetic", "useless", "disgusting", "gross", "stupid", "dumb", "lame", "cringe", "toxic", "braindead"]
violent_acts = ["terrorist","smack", "punch", "beat", "wreck", "destroy", "slam", "choke", "knock out", "mess up", "end"]
self_harm_acts = ["cut", "end it", "fade away", "check out", "give up", "bail", "quit", "disappear", "hurt myself", "go away"]
misinfo_terms = ["fake", "bogus", "rigged", "scam", "hoax", "fraud", "BS", "lies", "propaganda", "nonsense"]
curse_words = ["damn", "hell", "crap", "suck", "piss", "frick", "screw", "bitch", "ass", "shit"]
positive_terms = ["amazing", "fire", "epic", "goated", "lit", "vibes", "iconic", "stellar", "dope", "legendary"]
emojis = ["😂", "😡", "🤬", "🤣", "😢", "😈", "🔥", "💯", "😏", "💥", "💦", "😜", "😳", "🚨", "🫶"]
usernames = ["xViper99", "TruthBombz", "NoCapKing", "HaterSlayer", "WokeKiller", "MemeLord420", "AnonVibes"]

# Generate data
data = []

for label, templates in categories.items():
    for _ in range(samples_per_category):
        sentence = random.choice(templates)
        # Replace placeholders
        sentence = sentence.replace("[group]", random.choice(groups))
        sentence = sentence.replace("[slur]", random.choice(slurs))
        sentence = sentence.replace("[derogatory]", random.choice(derogatory_terms))
        sentence = sentence.replace("[violent_act]", random.choice(violent_acts))
        sentence = sentence.replace("[self_harm_act]", random.choice(self_harm_acts))
        sentence = sentence.replace("[misinfo_term]", random.choice(misinfo_terms))
        sentence = sentence.replace("[curse]", random.choice(curse_words))
        sentence = sentence.replace("[positive_term]", random.choice(positive_terms))
        sentence = sentence.replace("[link]", "http://shady.link/content")
        sentence = sentence.replace("[spamlink]", "http://scamz.co")
        sentence = sentence.replace("[user]", random.choice(usernames))

        # Add social media noise
        if random.random() < 0.4:
            sentence += " " + random.choice(emojis)
        if random.random() < 0.2:
            sentence = f"@{random.choice(usernames)} {sentence}"
        if random.random() < 0.15:
            sentence = sentence.upper()
        if random.random() < 0.2:
            sentence = sentence.replace(".", "!!")  # Exaggerated punctuation

        data.append({"text": sentence, "label": label})

# Create DataFrame and save
df = pd.DataFrame(data)
df.to_csv("harmful_text_dataset1.csv", index=False)
print("✅ Dataset saved as harmful_text_dataset.csv")
print(f"Total samples: {len(df)}")
print(f"Categories: {', '.join(categories.keys())}")