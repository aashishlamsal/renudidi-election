# Content Update Guide

This guide explains how to update text content on the renudidi.com website without touching code.

## 📝 Quick Reference

**All website text is stored in one file:** `content.json`

Both Nepali (ne) and English (en) versions must be updated together.

---

## 🎯 Updating Different Sections

### 1. Hero Section (Top Banner)

**Location:** `content.json` → `"hero"`

**What you can change:**
- Main headline
- Subheadline
- Button text

```json
"hero": {
  "headline": {
    "ne": "नेपालकी दिदी",
    "en": "DIDI of Nepal's New Generation Leadership"
  },
  "subheadline": {
    "ne": "जनताको, जनताबाट, जनताको लागि",
    "en": "Of the people, by the people, for the people"
  }
}
```

---

### 2. Why DIDI Section

**Location:** `content.json` → `"whyDidi"`

**What you can change:**
- Section title
- Description text
- Four value chips (Trust, Guidance, etc.)

```json
"whyDidi": {
  "title": {
    "ne": "किन DIDI?",
    "en": "Why DIDI?"
  },
  "description": {
    "ne": "DIDI भन्नाले विश्वास, साथ, र नेतृत्व हो...",
    "en": "DIDI means trust, companionship, and leadership..."
  }
}
```

---

### 3. DIDI Acronym (D-I-D-I Cards)

**Location:** `content.json` → `"acronym"`

**What you can change:**
- Each letter's meaning
- Bullet points under each letter

```json
"cards": [
  {
    "letter": "D",
    "title": { "ne": "समर्पित", "en": "Dedicated" },
    "points": [
      { "ne": "जनताको सेवामा समर्पित", "en": "Dedicated to serving the people" },
      { "ne": "परिवर्तनको प्रतिबद्धता", "en": "Committed to transformation" }
    ]
  }
]
```

**Note:** Keep exactly 4 cards (D-I-D-I). Each card should have 2 bullet points.

---

### 4. Impact Gallery

**Location:** `content.json` → `"impact"`

**What you can change:**
- Section title
- Photo captions (6 items)

```json
"gallery": [
  { "caption": { "ne": "सामुदायिक सभा ★", "en": "Community Assembly ★" } },
  { "caption": { "ne": "युवा सशक्तीकरण ★", "en": "Youth Empowerment ★" } }
]
```

**Note:** Keep the ★ symbol at the end of captions.

---

### 5. Manifesto Section

**Location:** `content.json` → `"manifesto"`

**What you can change:**
- Section title
- Teaser text
- Five pillar names

```json
"pillars": [
  { "ne": "महिला सशक्तीकरण", "en": "Women Empowerment", "icon": "👩" },
  { "ne": "युवा रोजगारी", "en": "Youth Employment", "icon": "💼" }
]
```

**Note:** Keep exactly 5 pillars. Icons can be changed to any emoji.

---

### 6. Join Movement Form

**Location:** `content.json` → `"join"`

**What you can change:**
- Form titles
- Field labels
- Button text
- Privacy notice

```json
"form": {
  "name": { "ne": "नाम", "en": "Name" },
  "contact": { "ne": "फोन/इमेल", "en": "Phone/Email" }
}
```

---

### 7. Footer

**Location:** `content.json` → `"footer"`

**What you can change:**
- Navigation links
- Contact information
- Copyright text

```json
"footer": {
  "contact": {
    "ne": "सम्पर्क: info@renudidi.com",
    "en": "Contact: info@renudidi.com"
  }
}
```

---

## ⚡ Making Updates

### Step-by-Step Process:

1. **Open** `content.json` in any text editor
2. **Find** the section you want to change
3. **Edit** both `"ne"` (Nepali) and `"en"` (English) text
4. **Save** the file
5. **Deploy** (if using Vercel, just commit and push)

### Important Rules:

✅ **DO:**
- Always update both Nepali and English
- Keep the JSON structure intact
- Preserve special characters like ★
- Use proper Nepali Unicode text
- Test locally before deploying

❌ **DON'T:**
- Remove quotation marks or commas
- Change property names (like "ne" or "en")
- Add extra brackets { } or [ ]
- Delete the ★ symbols
- Change the file structure

---

## 🛠️ Testing Your Changes

### Before Deploying:

1. **Validate JSON syntax**
   - Use https://jsonlint.com
   - Paste your `content.json`
   - Fix any errors shown

2. **Test locally**
   ```bash
   npm run dev
   ```
   - Visit http://localhost:3000
   - Check all sections
   - Verify both languages appear correctly

3. **Check for typos**
   - Review Nepali text
   - Review English text
   - Verify names and numbers

---

## 📋 Common Updates Checklist

### Before Campaign Launch:
- [ ] Update candidate name in hero headline
- [ ] Customize DIDI acronym meanings
- [ ] Write manifesto pillar descriptions
- [ ] Update contact email address
- [ ] Change social media links
- [ ] Update copyright year

### Regular Updates:
- [ ] Add new impact gallery captions
- [ ] Update form help options
- [ ] Modify call-to-action text
- [ ] Adjust manifesto teaser

---

## 🚨 Troubleshooting

### "Site looks broken after update"
→ Check JSON syntax at jsonlint.com
→ Verify all quotes and commas are in place

### "Text not showing"
→ Make sure you saved the file
→ Rebuild: `npm run build`

### "Special characters look weird"
→ Ensure file is saved as UTF-8
→ Use proper Nepali Unicode font

---

## 💡 Pro Tips

1. **Keep a backup** before making changes
2. **Update in small batches** - easier to find errors
3. **Use consistent terminology** across sections
4. **Keep ★ symbols** - they're part of the brand
5. **Test on mobile** after updates

---

## 📞 Need Help?

If you're unsure about making changes:
1. Make a copy of `content.json` first
2. Try your changes in the copy
3. Test thoroughly
4. Only then replace the original

**For technical support:** tech@renudidi.com

---

## 🎨 Design Guidelines

When writing new content:

- **Nepali headlines**: Bold, direct, emotional
- **English text**: Clear, concise, professional
- **Keep it short**: Long text doesn't fit the design
- **Use action verbs**: Join, Support, Share, etc.
- **Stay on brand**: Trust, strength, movement

---

**Remember:** Content is king! Good copy can make or break a campaign website. Take time to craft compelling messages.
