# Solstice

A small, playable voxel sandbox for desktop browsers. It has a deterministic landscape, editable blocks, first-person movement, water, forests, and local save data.

## Run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. `npm run build` creates a static site in `dist/`; `npm test` checks world and movement behavior.

## Controls

| Input | Action |
| --- | --- |
| Click **Enter the world** | Capture the mouse and start playing |
| Mouse | Look around |
| W A S D | Move |
| Space | Jump or swim upward |
| Shift | Sprint |
| Left click | Break a targeted block |
| Right click | Place the selected block |
| 1–8 or mouse wheel | Choose a block |
| Escape | Pause and release the mouse |

The pause menu lets you move the sun, switch soft shadows, and clear saved edits. Block edits are stored in this browser's local storage.

## Rendering

The world uses face-culled chunk meshes, procedural material tiles, vertex ambient occlusion, directional sun shadows, atmospheric fog, an animated sky and clouds, wind-swayed instanced grass, and a custom water shader with Fresnel reflection, ripples, and shoreline foam. The lighting switch disables sun shadows on slower devices.

This is a focused sandbox, not a recreation of Minecraft's crafting, inventory, survival, or multiplayer systems.
