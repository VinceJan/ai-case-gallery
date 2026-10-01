import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { Player } from '../src/player';
import { VoxelWorld } from '../src/world';

function flatWorld() {
  const world = new VoxelWorld(42, 16);
  world.blocks.clear();
  for (let z = -7; z <= 7; z++) for (let x = -7; x <= 7; x++) world.blocks.set(`${x},0,${z}`, 'stone');
  const player = new Player(world, new THREE.PerspectiveCamera());
  player.position.set(0, .51, 0);
  player.yaw = 0;
  for (let i = 0; i < 10; i++) player.update(1 / 60);
  return { world, player };
}

describe('first-person movement', () => {
  it('walks forward over a floor and stops at a block wall', () => {
    const { world, player } = flatWorld();
    world.setBlock(0, 1, -3, 'stone');
    world.setBlock(0, 2, -3, 'stone');
    player.setKey('KeyW', true);
    for (let i = 0; i < 90; i++) player.update(1 / 60);
    expect(player.position.z).toBeLessThan(-1);
    expect(player.position.z).toBeGreaterThan(-2.3);
    expect(player.grounded).toBe(true);
  });

  it('jumps when grounded and cannot place a block inside the player', () => {
    const { player } = flatWorld();
    expect(player.grounded).toBe(true);
    expect(player.overlapsBlock(0, 1, 0)).toBe(true);
    player.setKey('Space', true);
    player.update(1 / 60);
    expect(player.velocity.y).toBeGreaterThan(0);
    expect(player.position.y).toBeGreaterThan(.51);
  });
});
