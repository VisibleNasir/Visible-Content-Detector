import random
import pandas as pd

# Templates per category
categories = {
    "Hate Speech": [
        "I can't stand people from [group]. They're ruining everything.",
        "[group] are the worst. Keep them out of here.",
        "This is why nobody likes [group]."
    ],
    "Sexual Content": [
        "Check out this hot pic at [link]. 🔥",
        "You won't believe what she did next... [link]",
        "Explicit scenes and videos available now!"
    ],
    "Violent/Threatening": [
        "I swear I'm gonna hurt you if you say that again.",
        "Someone should teach you a lesson, with fists.",
        "You better watch your back."
    ],
    "Self-harm/Suicidal": [
        "I can't take it anymore. I just want it to end.",
        "Nobody cares about me. What's the point of living?",
        "Sometimes I think disappearing is the only option."
    ],
    "Bullying": [
        "You're such a loser. No one likes you.",
        "You’re pathetic and ugly, just quit already.",
        "Everyone laughs at you behind your back."
    ],
    "Misinformation": [
        "Vaccines cause more harm than good. Don’t take them!",
        "The Earth is flat and NASA is lying to us.",
        "5G towers are mind-control devices."
    ],
    "Spam": [
        "Win $1000 now! Click here: [spamlink]",
        "Congratulations! You've been selected for a free iPhone.",
        "Limited-time offer! Earn money from home in 5 minutes."
    ],
    "Neutral": [
        "I had pasta for dinner today.",
        "The weather is quite pleasant this evening.",
        "Just finished watching a documentary."
    ],
    "Positive": [
        "You did a great job! Keep it up!",
        "This community is so helpful and kind.",
        "I’m proud of what I achieved today!"
    ]
}

# Generate samples
data = []
samples_per_category = 500

for label, templates in categories.items():
    for _ in range(samples_per_category):
        sentence = random.choice(templates)
        sentence = sentence.replace("[group]", random.choice(["immigrants", "women", "men", "foreigners", "people like you"]))
        sentence = sentence.replace("[link]", "http://example.com/hot")
        sentence = sentence.replace("[spamlink]", "http://scamurl.fake")
        data.append({"text": sentence, "label": label})

# Save to CSV
df = pd.DataFrame(data)
df.to_csv("harmful_text_realistic_9_categories.csv", index=False)
print("✅ Dataset saved as harmful_text_realistic_9_categories.csv")
