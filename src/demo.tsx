import { createRoot } from "react-dom/client";
import type { CommandEntry } from "./index";
import { Terminal, themes } from "./index";

const ARCH_COMMANDS: CommandEntry[] = [
  {
    input: "neofetch",
    output: [
      "                user@arch-btw",
      "                ------------",
      "OS: Arch Linux x86_64",
      "Kernel: 6.9.3-arch1-1",
      "Shell: zsh 5.9",
      "DE: Hyprland",
      "WM: Hyprland",
      "CPU: AMD Ryzen 9 7950X",
      "Memory: 4096MiB / 32768MiB",
    ],
  },
  {
    input: "pacman -Syu",
    output: [
      ":: Synchronising package databases...",
      " core   158.1 KiB   1.24 MiB/s  00:00",
      " extra    9.27 MiB  9.81 MiB/s  00:01",
      ":: Starting full system upgrade...",
      " there is nothing to do",
    ],
  },
];

const UBUNTU_COMMANDS: CommandEntry[] = [
  {
    input: "ls -la ~/projects",
    output: [
      "total 48",
      "drwxr-xr-x  6 user user 4096 .",
      "drwxr-xr-x 32 user user 4096 ..",
      "drwxr-xr-x  8 user user 4096 react-linux-terminals",
      "drwxr-xr-x  5 user user 4096 my-app",
    ],
  },
  {
    input: "cat /etc/os-release",
    output: [
      'PRETTY_NAME="Ubuntu 24.04.1 LTS"',
      'NAME="Ubuntu"',
      'VERSION_ID="24.04.1"',
    ],
  },
  {
    input: "npm run build",
    output: [
      "> react-linux-terminals@0.1.0 build",
      "> vite build",
      "",
      "vite v7.3.1 building for production...",
      "✓ 9 modules transformed.",
      "dist/index.js   9.2 kB │ gzip: 2.3 kB",
      "dist/index.cjs  9.8 kB │ gzip: 2.4 kB",
      "✓ built in 1.0s",
    ],
  },
];

function Demo() {
  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: "32px 16px 40px",
        boxSizing: "border-box",
        background:
          "radial-gradient(circle at top, #20252f 0, #050608 45%, #000 100%)",
        color: "#f5f5f5",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <header style={{ marginBottom: 20 }}>
          <h1
            style={{
              fontSize: 26,
              margin: 0,
              marginBottom: 6,
              fontWeight: 650,
              letterSpacing: 0.04,
            }}
          >
            react-linux-terminals — Demo
          </h1>
          <p style={{ margin: 0, opacity: 0.8, fontSize: 14 }}>
            Open <code>http://localhost:4173/demo.html</code> after running <code>npm run demo:serve</code>.
          </p>
        </header>

        <section style={{ marginBottom: 28 }}>
          <h2
            style={{
              margin: "0 0 10px",
              fontSize: 15,
              fontWeight: 600,
              opacity: 0.9,
            }}
          >
            Arch terminal
          </h2>
          <Terminal
            theme={themes.arch}
            username="user"
            hostname="arch-btw"
            workingDirectory="~"
            commands={ARCH_COMMANDS}
            cursorBlink
            typewriterEffect
            typewriterSpeed={30}
            showHeader
            style={{ width: "100%" }}
          />
        </section>

        <section>
          <h2
            style={{
              margin: "0 0 10px",
              fontSize: 15,
              fontWeight: 600,
              opacity: 0.9,
            }}
          >
            Ubuntu terminal
          </h2>
          <Terminal
            theme={themes.ubuntu}
            username="user"
            hostname="ubuntu-box"
            workingDirectory="~/projects"
            commands={UBUNTU_COMMANDS}
            cursorBlink
            typewriterEffect
            typewriterSpeed={32}
            showHeader
            style={{ width: "100%" }}
          />
        </section>
      </div>
    </div>
  );
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<Demo />);
}
