const fs = require('fs');
const path = require('path');

// Read the source file
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Define screens in order with nice names
const screens = [
  { id: 'token-screen', name: 'token' },
  { id: 'signup-screen', name: 'signup' },
  { id: 'business-profile-screen', name: 'business-profile' },
  { id: 'personal-profile-screen', name: 'personal-profile' },
  { id: 'profile-complete-screen', name: 'profile-complete' },
  { id: 'case-home-screen', name: 'case-home' },
  { id: 'chat-screen', name: 'chat' },
  { id: 'strategy-detail-screen', name: 'strategy-detail' },
  { id: 'scanning-screen', name: 'scanning' },
  { id: 'analyzing-screen', name: 'analyzing' },
  { id: 'strategies-found-screen', name: 'strategies-found' },
  { id: 'messages-screen', name: 'messages' },
  { id: 'settings-screen', name: 'settings' },
  { id: 'upload-screen', name: 'upload' },
  { id: 'status-screen', name: 'status' },
  { id: 'message-thread-1', name: 'message-thread-1' },
  { id: 'message-thread-2', name: 'message-thread-2' },
  { id: 'message-thread-3', name: 'message-thread-3' },
];

// Extract all CSS between <style> and </style>
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) {
  console.error('Could not extract CSS from index.html');
  process.exit(1);
}
const css = styleMatch[1];

// Extract Google Fonts links
const fontLinks = [];
const fontLinkRegex = /<link[^>]*fonts[^>]*>/g;
let fontMatch;
while ((fontMatch = fontLinkRegex.exec(html)) !== null) {
  fontLinks.push(fontMatch[0]);
}
// Also get preconnect links
const preconnectRegex = /<link[^>]*preconnect[^>]*>/g;
let preconnectMatch;
while ((preconnectMatch = preconnectRegex.exec(html)) !== null) {
  fontLinks.push(preconnectMatch[0]);
}

// Build the list of all screen IDs so we can find boundaries
const allScreenIds = screens.map(s => s.id);

// Find phone-notch HTML
const notchMatch = html.match(/<div class="phone-notch"><\/div>/);
const phoneNotch = notchMatch ? notchMatch[0] : '<div class="phone-notch"></div>';

// Extract individual screen HTML blocks
function extractScreenHTML(screenId) {
  // Find the opening tag for this screen
  const openPattern = new RegExp(`<div id="${screenId}" class="page[^"]*">`);
  const openMatch = openPattern.exec(html);
  if (!openMatch) {
    console.warn(`Could not find screen: ${screenId}`);
    return null;
  }

  const startIdx = openMatch.index;

  // We need to find the matching closing </div> for this screen div.
  // Track nesting depth of divs
  let depth = 0;
  let i = startIdx;
  let endIdx = -1;

  while (i < html.length) {
    // Look for next div open or close
    const nextOpen = html.indexOf('<div', i);
    const nextClose = html.indexOf('</div>', i);

    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      // Check if it's a self-closing or actual div tag
      const tagEnd = html.indexOf('>', nextOpen);
      if (tagEnd !== -1) {
        depth++;
        i = tagEnd + 1;
      } else {
        break;
      }
    } else {
      depth--;
      if (depth === 0) {
        endIdx = nextClose + '</div>'.length;
        break;
      }
      i = nextClose + '</div>'.length;
    }
  }

  if (endIdx === -1) {
    console.warn(`Could not find closing tag for screen: ${screenId}`);
    return null;
  }

  let screenHTML = html.substring(startIdx, endIdx);

  // Replace class="page" or class="page active" with class="page active"
  screenHTML = screenHTML.replace(
    /(<div id="[^"]*" class="page)(?:\s+active)?(">)/,
    '$1 active$2'
  );

  return screenHTML;
}

// For the chat screen, we need to include the initial chat messages that are
// rendered by JS. Let's extract the static HTML as-is (the chat-messages container
// has some static content already in the HTML).

// Create output directory
const viewsDir = path.join(__dirname, 'views');
if (!fs.existsSync(viewsDir)) {
  fs.mkdirSync(viewsDir, { recursive: true });
}

// Generate each view file
screens.forEach((screen, index) => {
  const num = String(index + 1).padStart(2, '0');
  const filename = `${num}-${screen.name}.html`;

  const screenHTML = extractScreenHTML(screen.id);
  if (!screenHTML) {
    console.warn(`Skipping ${filename} - could not extract HTML`);
    return;
  }

  // Build the standalone HTML file
  const output = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>HeyDrew - ${screen.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
${css}
  </style>
</head>
<body>
  <div class="phone-frame">
    ${phoneNotch}
    <div class="screen">
      ${screenHTML}
    </div>
  </div>
</body>
</html>
`;

  const filepath = path.join(viewsDir, filename);
  fs.writeFileSync(filepath, output, 'utf8');
  console.log(`Created: ${filename}`);
});

console.log(`\nDone! ${screens.length} view files written to ${viewsDir}`);
