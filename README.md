# HeyDrew - Tax Strategy Assistant Mobile Prototype

A complete interactive mobile app prototype for a conversational AI tax strategy assistant.

![HeyDrew Preview](assets/heydrew-logo.png)

## 🚀 Quick Start

### Option 1: View Locally
Simply open `index.html` in any modern web browser.

### Option 2: Deploy to GitHub Pages (Recommended)
1. Push this repo to GitHub
2. Go to Settings → Pages
3. Select "main" branch and root folder
4. Your site will be live at `https://[username].github.io/[repo-name]`

### Option 3: Netlify Drop
1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the `index.html` file
3. Get an instant shareable link

---

## ✨ Features

### Conversational Onboarding
- Token redemption for exclusive access
- Password creation with validation
- Business profile setup
- Personal details collection

### AI Chat Experience
- **Discovery-first approach**: Drew asks about your business before requesting documents
- **Strategy preview**: Shows potential tax strategies (like the Augusta Rule) to build trust
- **Document upload**: Only requested after establishing value
- Smart suggestion chips for guided conversation

### Document Analysis
- Multi-document batch upload
- Camera capture support
- Animated scanning/analysis screens
- Strategy discovery results

### Complete App Screens
- Dashboard with personalized greeting
- Message inbox with async threads
- Strategy detail views
- Account settings

---

## 🎨 Design System

### Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Teal | `#5BBFB3` | Primary actions, success |
| Purple | `#9B7ED9` | Secondary, accents |
| Orange | `#FF9F43` | Case card header |
| Gold | `#D4A84B` | Highlights |

### Typography
- **Headings**: Quicksand (Google Fonts)
- **Body**: Nunito (Google Fonts)

### Device Frame
- iPhone 15 Pro dimensions: 390×844px

---

## 🛠 Developer Tools

### Screen Navigator
Press **S** or click the "Screens" button to quickly jump between all 18 screens.

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `←` `→` | Navigate between screens |
| `S` | Toggle screen navigator |
| `Esc` | Close navigator |

### Reset
Click the "Reset" button to reload the prototype to initial state.

---

## 📁 Project Structure

```
heydrew-prototype/
├── index.html          # Complete single-file prototype
├── README.md           # This file
└── assets/
    ├── drew-avatar.png # Drew character image
    └── heydrew-logo.png # App logo
```

---

## 📱 Chat Flow

The prototype demonstrates a trust-building conversation flow:

1. **Business Discovery**
   - "What type of business do you run?"
   - Options: Retail, Service, Consulting

2. **Work Environment**
   - "Do you work from home?"
   
3. **Strategy Qualification**
   - "Do you host business meetings at home?"

4. **Strategy Reveal** ✨
   - Shows Augusta Rule potential ($5k-$15k savings)
   - Builds excitement before document request

5. **Document Upload**
   - User uploads to "verify eligibility"
   - Feels like unlocking value, not a chore

---

## 🔧 Customization

### Change Provider Name
Search and replace "Aspire4More" throughout the file.

### Modify Colors
Update CSS variables at the top of the `<style>` section:
```css
:root {
  --teal-primary: #5BBFB3;
  --purple-primary: #9B7ED9;
  /* etc */
}
```

### Add New Screens
1. Add HTML in the `#app-container` section
2. Add to `allScreens` array in JavaScript
3. Create navigation with `showScreen('screen-id')`

---

## 📄 License

This prototype is for demonstration purposes.

---

## 🙏 Credits

- Character avatar: Custom Drew mascot
- Icons: Inline SVG
- Fonts: Google Fonts (Quicksand, Nunito)

---

Built with ❤️ for Aspire4More
