import { describe, expect, it } from 'vitest';
import { VoxelWorld, terrainHeight, WATER_LEVEL } from '../src/world';

describe('voxel world', () => {
  it('generates the same terrain for the same coordinates', () => {
    expect(terrainHeight(14, -9)).toBe(terrainHeight(14, -9));
    expect(terrainHeight(14, -9)).toBeGreaterThanOrEqual(3);
  });

  it('puts a solid surface beneath spawn and prevents out-of-bounds edits', () => {
    const world = new VoxelWorld(42, 64);
    const spawn = world.findSpawn();
    expect(world.isSolid(spawn.x, Math.floor(spawn.y - .5), spawn.z)).toBe(true);
    expect(spawn.y).toBeGreaterThan(WATER_LEVEL);
    expect(world.setBlock(999, 5, 999, 'stone')).toBe(false);
  });

  it('stores a block edit and exposes neighboring air', () => {
    const world = new VoxelWorld(42, 64);
    const y = world.getSurfaceY(0, 0) + 1;
    expect(world.getBlock(0, y, 0)).toBe(null);
    expect(world.setBlock(0, y, 0, 'planks')).toBe(true);
    expect(world.getBlock(0, y, 0)).toBe('planks');
    expect(world.getBlock(0, y + 1, 0)).toBe(null);
  });

  it('removes a surface block and persists only edits', () => {
    const world = new VoxelWorld(42, 64);
    const y = world.getSurfaceY(1, 1);
    expect(world.getBlock(1, y, 1)).not.toBe(null);
    expect(world.setBlock(1, y, 1, null)).toBe(true);
    expect(world.getBlock(1, y, 1)).toBe(null);
    const restored = new VoxelWorld(42, 64);
    restored.loadEdits(world.serializeEdits());
    expect(restored.getBlock(1, y, 1)).toBe(null);
  });
});
