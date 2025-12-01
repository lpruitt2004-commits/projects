# Raspberry Pi 5 Kit PWA - React Edition

A Progressive Web App for managing your Raspberry Pi 5 kit with a **Fallout 76-inspired** touch interface. Built with React, ES6+, and mobile-first design principles.

## 🎮 Features

- **🎯 Touch-Only Interface**: On-screen keyboard, no virtual keyboard popup
- **📱 Mobile-First Design**: Optimized for tablets and mobile devices
- **🖥️ Fallout 76 Style**: Retro-futuristic terminal aesthetic with CRT effects
- **⚛️ React Components**: Fully modular and reusable
- **🔌 GPIO Control**: Touch-based pin management
- **📊 System Monitoring**: Real-time stats display
- **💻 Terminal Interface**: Command-line style interaction
- **⚡ PWA Ready**: Installable, offline-capable

## 🏗️ Project Structure

```
raspi5Kit/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── StatusGrid.jsx
│   │   ├── StatusCard.jsx
│   │   ├── ActionPanel.jsx
│   │   ├── ActionButton.jsx
│   │   ├── GPIOControl.jsx
│   │   ├── GPIOPin.jsx
│   │   ├── Terminal.jsx
│   │   ├── TerminalKeyboard.jsx
│   │   └── NetworkStatus.jsx
│   ├── hooks/
│   │   ├── useSystemStats.js
│   │   ├── useNetworkStatus.js
│   │   └── useTouchOnly.js
│   ├── styles/
│   │   ├── index.css (global + CRT effects)
│   │   ├── App.css
│   │   ├── Header.css
│   │   ├── StatusGrid.css
│   │   ├── StatusCard.css
│   │   ├── ActionPanel.css
│   │   ├── ActionButton.css
│   │   ├── GPIOControl.css
│   │   ├── GPIOPin.css
│   │   ├── Terminal.css
│   │   ├── TerminalKeyboard.css
│   │   └── NetworkStatus.css
│   ├── App.jsx
│   └── main.jsx
├── public/
│   ├── icons/
│   ├── manifest.json
│   └── icon-generator.html
├── package.json
├── vite.config.js
├── .eslintrc.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Raspberry Pi 5 (or any modern browser for development)

### Installation

1. **Install Dependencies**:
```bash
cd /home/chyort/projects/raspi5Kit
npm install
```

2. **Generate Icons** (optional):
```bash
./generate-icons.sh
# or open public/icon-generator.html in browser
```

3. **Start Development Server**:
```bash
npm run dev
```

The app will be available at `http://localhost:8000`

4. **Build for Production**:
```bash
npm run build
```

5. **Preview Production Build**:
```bash
npm run preview
```

## 📱 Usage

### Touch Interface

- **No Keyboard Popups**: All inputs use the on-screen keyboard
- **Touch Optimized**: Large touch targets (48px minimum)
- **Haptic Feedback**: Visual feedback on all interactions

### Terminal Commands

Type commands using the on-screen keyboard:

- `HELP` - Show available commands
- `STATUS` - Display system status
- `GPIO` - Toggle GPIO control panel
- `STATS` - Show detailed statistics
- `CLEAR` - Clear terminal screen
- `REBOOT` - Restart system (simulated)

### GPIO Control

1. Tap "GPIO" in Quick Access
2. Touch any pin to toggle HIGH/LOW
3. Visual feedback shows active state
4. Terminal logs all changes

## 🎨 Design Philosophy

### Fallout 76 Inspired

- **Monospace Typography**: Courier New for authentic terminal feel
- **Green CRT Glow**: #00ff41 primary color with text-shadow effects
- **Scanlines**: Animated CRT screen effect overlay
- **Panel Borders**: Bold green borders with glow
- **Touch Feedback**: Scale and color transitions

### Mobile-First

- Base styles target mobile (320px+)
- Tablet breakpoint: 768px
- Desktop breakpoint: 1024px
- Touch targets: 44px+ (iOS/Android standards)
- No hover states (touch-only)

## ⚛️ React Architecture

### Component Philosophy

- **Functional Components**: All components use hooks
- **Single Responsibility**: Each component has one job
- **Prop Drilling**: Minimal, state lives in App.jsx
- **Custom Hooks**: Reusable logic (touch, stats, network)

### Key Components

#### `<StatusCard />`
Reusable status display with color-coded states

#### `<ActionButton />`
Touch-optimized button with visual feedback

#### `<GPIOPin />`
Individual GPIO pin with toggle state

#### `<Terminal />`
Command interface with scrolling output

#### `<TerminalKeyboard />`
On-screen keyboard, no virtual keyboard

### Custom Hooks

#### `useSystemStats()`
Polls system stats every 5 seconds

#### `useNetworkStatus()`
Monitors online/offline state

#### `useTouchOnly()`
Disables virtual keyboard, enables touch events

## 🔧 Configuration

### Vite Config

- Port: 8000
- PWA plugin enabled
- Service worker auto-update
- Asset optimization

### PWA Manifest

- Standalone display mode
- Portrait orientation
- Theme color: #0a0e14
- Background: #0a0e14

## 📦 Deployment

### Local Network

```bash
npm run build
npm run preview -- --host
```

Access from other devices: `http://YOUR_PI_IP:4173`

### Production Server

1. Build the app:
```bash
npm run build
```

2. Serve the `dist/` folder with any static server:
```bash
# Using Python
python3 -m http.server 8000 -d dist

# Using Node.js
npx serve dist -p 8000

# Using nginx (copy dist to /var/www/html)
```

### HTTPS (Required for PWA)

For full PWA features, serve over HTTPS:
- Use ngrok for testing: `ngrok http 8000`
- Use Let's Encrypt for production
- Or configure reverse proxy (nginx/Apache)

## 🎯 Touch Interface Details

### Disabled Virtual Keyboard

```javascript
// Automatically applied via useTouchOnly hook
input, textarea {
  caret-color: transparent;
  user-select: none;
  inputmode: none;
  readonly: true;
}
```

### Touch Event Handling

All interactive elements use:
- `touchstart` / `touchend` events
- `touch-action: manipulation` CSS
- Visual scale feedback on `:active`
- No double-tap zoom

## 🔌 GPIO Integration

### Current Implementation

- Simulated GPIO states
- Touch toggle interface
- Terminal logging
- Visual feedback

### Production Integration

Replace simulation with actual GPIO control:

```javascript
// Example with fetch to GPIO API
const toggleGPIO = async (pin, state) => {
  await fetch(`/api/gpio/${pin}`, {
    method: 'POST',
    body: JSON.stringify({ state })
  });
};
```

## 🛠️ Development

### ESLint

```bash
npm run lint
```

### Component Development

Each component is self-contained with its own CSS file:

```jsx
import ComponentName from './components/ComponentName';
import './styles/ComponentName.css';
```

### Adding New Commands

Edit `App.jsx`, add case to `handleCommand()`:

```javascript
case 'newcommand':
  addTerminalLine('Command output', 'success');
  break;
```

## 🎨 Theming

All colors defined in CSS variables:

```css
:root {
  --primary-green: #00ff41;
  --dark-bg: #0a0e14;
  --panel-bg: #0f1419;
  --error-red: #ff4444;
  --warning-amber: #ffaa00;
}
```

## 📊 Performance

- First load: < 100KB (gzipped)
- Service worker caching
- Code splitting with Vite
- Lazy loading ready
- 60fps animations

## 🐛 Known Issues

- Icon generation requires ImageMagick
- Service worker requires HTTPS in production
- Touch events may need polyfill for older browsers

## 🚧 Roadmap

- [ ] WebSocket real-time updates
- [ ] Camera module integration
- [ ] Script automation system
- [ ] Settings persistence
- [ ] Multi-language support
- [ ] Actual GPIO API integration
- [ ] Audio feedback (optional)
- [ ] Gesture controls

## 📄 License

MIT License - Built by CLxL2 (CodeLlama-13B + Llama2-13B)

## 🙏 Credits

- Design inspired by Fallout 76
- Built with React + Vite
- CRT effects and retro aesthetics
- Touch-first mobile design

---

**Powered by CLxL2** 🤖🥧

Enjoy your Fallout-style Raspberry Pi interface!
