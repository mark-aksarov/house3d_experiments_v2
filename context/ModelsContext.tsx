"use client"

import { Object3D } from 'three';
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import React, { createContext, useContext, ReactNode, useReducer, useEffect, Dispatch } from 'react';

export type ModelCollection = Record<ModelName, Object3D>;
export type ModelName = 'House1' | 'House2';

const modelLoadData: { modelName: ModelName; url: string }[] = [
  { modelName: 'House1', url: 'models/house1.glb' },
  { modelName: 'House2', url: 'models/house2.glb' },
];

export type Status = 'pending' | 'success' | 'error';

export interface State {
  selectedModelName: ModelName | null;
  models: ModelCollection | null;
  status: Status;
}

type Action =
  | { type: 'load'; models: ModelCollection }
  | { type: 'error' }
  | { type: 'pending' }
  | { type: 'selectedModelNameChanged'; modelName: ModelName };

const initialState: State = {
  selectedModelName: null,
  models: null,
  status: 'pending',
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'load':
      return { ...state, models: action.models, status: 'success' };
    case 'error':
      return { ...state, status: 'error' };
    case 'pending':
      return { ...state, status: 'pending' };
    case 'selectedModelNameChanged':
      return { ...state, selectedModelName: action.modelName };
    default:
      return state;
  }
};

export const ModelsContext = createContext<State | null>(null);
export const ModelsDispatchContext = createContext<Dispatch<Action> | null>(null);

export function ModelsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loader = new GLTFLoader();

    const loadModel = (modelName: ModelName, url: string) => {
      return new Promise<[ModelName, Object3D]>((resolve, reject) => {
        loader.load(
          url,
          (data: GLTF) => resolve([modelName, data.scene]),
          undefined,
          reject
        );
      });
    };

    dispatch({ type: 'pending' }); // Set status to pending before loading

    const promises = modelLoadData.map(({ modelName, url }) =>
      loadModel(modelName, url)
    );

    Promise.all(promises)
      .then((loadedModels) => {
        const modelCollection = loadedModels.reduce((acc, [name, object]) => {
          acc[name] = object;
          return acc;
        }, {} as ModelCollection);
        dispatch({ type: 'load', models: modelCollection });
      })
      .catch((error) => dispatch({ type: 'error' }));
  }, [dispatch]);

  return (
    <ModelsContext.Provider value={state}>
      <ModelsDispatchContext.Provider value={dispatch}>
        {children}
      </ModelsDispatchContext.Provider>
    </ModelsContext.Provider>
  );
};

export const useModels = () => {
  const context = useContext(ModelsContext);
  if (!context) {
    throw new Error('useModels must be used within a ModelsContextProvider');
  }
  return context;
};

export const useModelsDispatch = () => {
  const context = useContext(ModelsDispatchContext);
  if (!context) {
    throw new Error('useModelsDispatch must be used within a ModelsContextProvider');
  }
  return context;
};