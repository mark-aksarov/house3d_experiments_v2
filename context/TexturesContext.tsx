import React, { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';
import { Texture, TextureLoader } from 'three';

export type TextureCollection = { [x in TextureName]: { [x in TextureMapType]?: Texture } };

export type TextureName =
  "Asphalt029B" |
  "Asphalt006" |
  "Asphalt030" |
  "Bricks075A" |
  "Bricks092" |
  "Concrete024" |
  "Plaster003" |
  "RoofingTiles003" |
  "RoofingTiles004" |
  "RoofingTiles011A" |
  "RoofingTiles012A" |
  "RoofingTiles013A" |
  "RoofingTiles014A" |
  "RoofingTiles015A" |
  "PavingStones108" |
  "Metal046B" |
  "Asphalt031";

export type TextureMapType = "color" | "roughness" | "metalness" | "ao" | "normal";

const textureLoadData: Array<{
  textureName: TextureName;
  data: Array<{ mapType: TextureMapType; url: string }>;
}> = [
    {
      textureName: "Asphalt029B",
      data: [
        { mapType: "color", url: "textures/Asphalt029B/Asphalt029B_1K-JPG_Color.jpg" },
        { mapType: "ao", url: "textures/Asphalt029B/Asphalt029B_1K-JPG_AmbientOcclusion.jpg" },
        { mapType: "roughness", url: "textures/Asphalt029B/Asphalt029B_1K-JPG_Roughness.jpg" },
        { mapType: "normal", url: "textures/Asphalt029B/Asphalt029B_1K-JPG_NormalGL.jpg" },
      ]
    },
    {
      textureName: "Asphalt006",
      data: [
        { mapType: "color", url: "textures/Asphalt006/Asphalt006_1K-JPG_Color.jpg" },
        { mapType: "ao", url: "textures/Asphalt006/Asphalt006_1K-JPG_AmbientOcclusion.jpg" },
        { mapType: "roughness", url: "textures/Asphalt006/Asphalt006_1K-JPG_Roughness.jpg" },
        { mapType: "normal", url: "textures/Asphalt006/Asphalt006_1K-JPG_NormalGL.jpg" },
      ]
    },
    {
      textureName: "Asphalt030",
      data: [
        { mapType: "color", url: "textures/Asphalt030/Asphalt030_1K-JPG_Color.jpg" },
        { mapType: "ao", url: "textures/Asphalt030/Asphalt030_1K-JPG_AmbientOcclusion.jpg" },
        { mapType: "roughness", url: "textures/Asphalt030/Asphalt030_1K-JPG_Roughness.jpg" },
        { mapType: "normal", url: "textures/Asphalt030/Asphalt030_1K-JPG_NormalGL.jpg" },
      ]
    },
    {
      textureName: "Bricks075A",
      data: [
        { mapType: "color", url: "textures/Bricks075A/Bricks075A_1K-JPG_Color.jpg" },
        { mapType: "ao", url: "textures/Bricks075A/Bricks075A_1K-JPG_AmbientOcclusion.jpg" },
        { mapType: "roughness", url: "textures/Bricks075A/Bricks075A_1K-JPG_Roughness.jpg" },
        { mapType: "normal", url: "textures/Bricks075A/Bricks075A_1K-JPG_NormalGL.jpg" },
      ]
    },
    {
      textureName: "Concrete024",
      data: [
        { mapType: "color", url: "textures/Concrete024/Concrete024_1K-JPG_Color.jpg" },
        { mapType: "roughness", url: "textures/Concrete024/Concrete024_1K-JPG_Roughness.jpg" },
        { mapType: "normal", url: "textures/Concrete024/Concrete024_1K-JPG_NormalGL.jpg" },
      ]
    },
    {
      textureName: "Plaster003",
      data: [
        { mapType: "color", url: "textures/Plaster003/Plaster003_1K-JPG_Color.jpg" },
        { mapType: "roughness", url: "textures/Plaster003/Plaster003_1K-JPG_Roughness.jpg" },
        { mapType: "normal", url: "textures/Plaster003/Plaster003_1K-JPG_NormalGL.jpg" },
      ]
    },
    {
      textureName: "RoofingTiles003",
      data: [
        { mapType: "color", url: "textures/RoofingTiles003/RoofingTiles003_1K-JPG_Color.jpg" },
        { mapType: "roughness", url: "textures/RoofingTiles003/RoofingTiles003_1K-JPG_Roughness.jpg" },
        { mapType: "normal", url: "textures/RoofingTiles003/RoofingTiles003_1K-JPG_NormalGL.jpg" },
      ]
    },
    {
      textureName: "RoofingTiles004",
      data: [
        { mapType: "color", url: "textures/RoofingTiles004/RoofingTiles004_1K-JPG_Color.jpg" },
        { mapType: "roughness", url: "textures/RoofingTiles004/RoofingTiles004_1K-JPG_Roughness.jpg" },
        { mapType: "normal", url: "textures/RoofingTiles004/RoofingTiles004_1K-JPG_NormalGL.jpg" },
      ]
    },
    {
      textureName: "RoofingTiles011A",
      data: [
        { mapType: "color", url: "textures/RoofingTiles011A/RoofingTiles011A_1K-JPG_Color.jpg" },
        { mapType: "roughness", url: "textures/RoofingTiles011A/RoofingTiles011A_1K-JPG_Roughness.jpg" },
        { mapType: "ao", url: "textures/RoofingTiles011A/RoofingTiles011A_1K-JPG_AmbientOcclusion.jpg" },
        { mapType: "normal", url: "textures/RoofingTiles011A/RoofingTiles011A_1K-JPG_NormalGL.jpg" },
      ]
    },
    {
      textureName: "RoofingTiles012A",
      data: [
        { mapType: "color", url: "textures/RoofingTiles012A/RoofingTiles012A_1K-JPG_Color.jpg" },
        { mapType: "roughness", url: "textures/RoofingTiles012A/RoofingTiles012A_1K-JPG_Roughness.jpg" },
        { mapType: "ao", url: "textures/RoofingTiles012A/RoofingTiles012A_1K-JPG_AmbientOcclusion.jpg" },
        { mapType: "normal", url: "textures/RoofingTiles012A/RoofingTiles012A_1K-JPG_NormalGL.jpg" },
      ]
    },
    {
      textureName: "RoofingTiles013A",
      data: [
        { mapType: "color", url: "textures/RoofingTiles013A/RoofingTiles013A_1K-JPG_Color.jpg" },
        { mapType: "roughness", url: "textures/RoofingTiles013A/RoofingTiles013A_1K-JPG_Roughness.jpg" },
        { mapType: "ao", url: "textures/RoofingTiles013A/RoofingTiles013A_1K-JPG_AmbientOcclusion.jpg" },
        { mapType: "normal", url: "textures/RoofingTiles013A/RoofingTiles013A_1K-JPG_NormalGL.jpg" },
      ]
    },
    {
      textureName: "RoofingTiles014A",
      data: [
        { mapType: "color", url: "textures/RoofingTiles014A/RoofingTiles014A_1K-JPG_Color.jpg" },
        { mapType: "roughness", url: "textures/RoofingTiles014A/RoofingTiles014A_1K-JPG_Roughness.jpg" },
        { mapType: "ao", url: "textures/RoofingTiles014A/RoofingTiles014A_1K-JPG_AmbientOcclusion.jpg" },
        { mapType: "normal", url: "textures/RoofingTiles014A/RoofingTiles014A_1K-JPG_NormalGL.jpg" },
      ]
    },
    {
      textureName: "RoofingTiles015A",
      data: [
        { mapType: "color", url: "textures/RoofingTiles015A/RoofingTiles015A_1K-JPG_Color.jpg" },
        { mapType: "roughness", url: "textures/RoofingTiles015A/RoofingTiles015A_1K-JPG_Roughness.jpg" },
        { mapType: "ao", url: "textures/RoofingTiles015A/RoofingTiles015A_1K-JPG_AmbientOcclusion.jpg" },
        { mapType: "normal", url: "textures/RoofingTiles015A/RoofingTiles015A_1K-JPG_NormalGL.jpg" },
      ]
    },
    {
      textureName: "Bricks092",
      data: [
        { mapType: "color", url: "textures/Bricks092/Bricks092_1K-JPG_Color.jpg" },
        { mapType: "roughness", url: "textures/Bricks092/Bricks092_1K-JPG_Roughness.jpg" },
        { mapType: "ao", url: "textures/Bricks092/Bricks092_1K-JPG_AmbientOcclusion.jpg" },
        { mapType: "normal", url: "textures/Bricks092/Bricks092_1K-JPG_NormalGL.jpg" },
      ]
    },
    {
      textureName: "PavingStones108",
      data: [
        { mapType: "color", url: "textures/PavingStones108/PavingStones108_1K-JPG_Color.jpg" },
        { mapType: "roughness", url: "textures/PavingStones108/PavingStones108_1K-JPG_Roughness.jpg" },
        { mapType: "ao", url: "textures/PavingStones108/PavingStones108_1K-JPG_AmbientOcclusion.jpg" },
        { mapType: "normal", url: "textures/PavingStones108/PavingStones108_1K-JPG_NormalGL.jpg" },
      ]
    },
    {
      textureName: "Metal046B",
      data: [
        { mapType: "color", url: "textures/Metal046B/Metal046B_1K-JPG_Color.jpg" },
        { mapType: "roughness", url: "textures/Metal046B/Metal046B_1K-JPG_Roughness.jpg" },
        { mapType: "metalness", url: "textures/Metal046B/Metal046B_1K-JPG_Metalness.jpg" },
        { mapType: "normal", url: "textures/Metal046B/Metal046B_1K-JPG_NormalGL.jpg" },
      ]
    },
    {
      textureName: "Asphalt031",
      data: [
        { mapType: "color", url: "textures/Asphalt031/Asphalt031_1K-JPG_Color.jpg" },
        { mapType: "roughness", url: "textures/Asphalt031/Asphalt031_1K-JPG_Roughness.jpg" },
        { mapType: "ao", url: "textures/Asphalt031/Asphalt031_1K-JPG_AmbientOcclusion.jpg" },
        { mapType: "normal", url: "textures/Asphalt031/Asphalt031_1K-JPG_NormalGL.jpg" },
      ]
    },
  ];

// Union type for load state
export type Status = 'pending' | 'success' | 'error';

// State and actions
export interface State {
  textures: TextureCollection | null;
  status: Status;
}

type Action =
  | { type: 'load'; textures: TextureCollection }
  | { type: 'error' }
  | { type: 'pending' };

const initialState: State = {
  textures: null,
  status: 'pending'
};

// Reducer to manage the state of textures
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'load':
      return { ...state, textures: action.textures, status: 'success' };
    case 'error':
      return { ...state, status: 'error' };
    case 'pending':
      return { ...state, status: 'pending' };
    default:
      return state;
  }
};

// Create a context for the texture state
const TextureContext = createContext<State | null>(null);

// Provider component for managing texture state globally
export function TexturesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loader = new TextureLoader();

    const loadTexture = (textureName: TextureName, mapType: TextureMapType, url: string) =>
      new Promise<[TextureName, TextureMapType, Texture]>((resolve, reject) =>
        loader.load(
          url,
          (texture) => resolve([textureName, mapType, texture]),
          undefined,
          reject
        )
      );

    dispatch({ type: 'pending' }); // Set status to pending before loading

    const promises = textureLoadData.flatMap(({ textureName, data }) =>
      data.map(({ mapType, url }) => loadTexture(textureName, mapType, url))
    );

    Promise.all(promises)
      .then((loadedTextures) => {
        const textureCollection = loadedTextures.reduce((textures, [textureName, mapType, texture]) => {
          if (!textures[textureName]) {
            textures[textureName] = {};
          }
          textures[textureName][mapType] = texture;
          return textures;
        }, {} as TextureCollection);
        dispatch({ type: 'load', textures: textureCollection });
      })
      .catch((error) => dispatch({ type: 'error' }));
  }, [dispatch]);

  return (
    <TextureContext.Provider value={state}>
      {children}
    </TextureContext.Provider>
  );
};

// Hook to use the texture context in other components
export const useTextures = () => {
  const context = useContext(TextureContext);
  if (!context) {
    throw new Error("useTexture must be used within a TextureProvider");
  }
  return context;
};