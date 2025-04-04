import { Texture } from 'three';
import { State, TextureCollection } from '../TexturesContext';
import React, { createContext, useContext, ReactNode } from 'react';

const mockTextures: TextureCollection = {
  Asphalt029A: {
    color: new Texture(),
    ao: new Texture(),
    roughness: new Texture(),
    normal: new Texture(),
  },
  Asphalt029B: {
    color: new Texture(),
    ao: new Texture(),
    roughness: new Texture(),
    normal: new Texture(),
  },
  Asphalt006: {
    color: new Texture(),
    ao: new Texture(),
    roughness: new Texture(),
    normal: new Texture(),
  },
  Asphalt030: {
    color: new Texture(),
    ao: new Texture(),
    roughness: new Texture(),
    normal: new Texture(),
  },
  Bricks075A: {
    color: new Texture(),
    ao: new Texture(),
    roughness: new Texture(),
    normal: new Texture(),
  },
  Bricks092: {
    color: new Texture(),
    roughness: new Texture(),
    ao: new Texture(),
    normal: new Texture(),
  },
  Concrete024: {
    color: new Texture(),
    roughness: new Texture(),
    normal: new Texture(),
  },
  Plaster003: {
    color: new Texture(),
    roughness: new Texture(),
    normal: new Texture(),
  },
  RoofingTiles003: {
    color: new Texture(),
    roughness: new Texture(),
    normal: new Texture(),
  },
  RoofingTiles004: {
    color: new Texture(),
    roughness: new Texture(),
    normal: new Texture(),
  },
  RoofingTiles011A: {
    color: new Texture(),
    roughness: new Texture(),
    ao: new Texture(),
    normal: new Texture(),
  },
  RoofingTiles012A: {
    color: new Texture(),
    roughness: new Texture(),
    ao: new Texture(),
    normal: new Texture(),
  },
  RoofingTiles013A: {
    color: new Texture(),
    roughness: new Texture(),
    ao: new Texture(),
    normal: new Texture(),
  },
  RoofingTiles014A: {
    color: new Texture(),
    roughness: new Texture(),
    ao: new Texture(),
    normal: new Texture(),
  },
  RoofingTiles015A: {
    color: new Texture(),
    roughness: new Texture(),
    ao: new Texture(),
    normal: new Texture(),
  },
  PavingStones108: {
    color: new Texture(),
    roughness: new Texture(),
    ao: new Texture(),
    normal: new Texture(),
  },
  Metal046B: {
    color: new Texture(),
    roughness: new Texture(),
    metalness: new Texture(),
    normal: new Texture(),
  },
  Asphalt031: {
    color: new Texture(),
    roughness: new Texture(),
    ao: new Texture(),
    normal: new Texture(),
  }
};

const TextureContext = createContext<State | null>(null);

export function TexturesProvider({ children }: { children: ReactNode }) {
  const mockState: State = {
    textures: mockTextures,
    status: 'success',
  };

  return (
    <TextureContext.Provider value={mockState}>
      {children}
    </TextureContext.Provider>
  );
};

export const useTextures = () => {
  const context = useContext(TextureContext);
  if (!context) {
    throw new Error("useTexture must be used within a TextureProvider");
  }
  return context;
};