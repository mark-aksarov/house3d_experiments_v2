import { Mesh, Object3D } from 'three';
import React, { createContext, Dispatch, ReactNode, useContext } from 'react';
import { Action, ModelCollection, State } from '../ModelsContext';

const createMesh = (name: string) => {
  const mesh = new Mesh();
  mesh.name = name;
  return mesh;
};

// Create the root object
const house = new Object3D();
house.name = 'House1';

// Roof structure
const roof = new Object3D();
roof.name = 'Roof';

const roofBottom = new Object3D();
roofBottom.name = 'RoofBottom';
roofBottom.add(createMesh('RoofBottom'));

const roofCover = new Object3D();
roofCover.name = 'RoofCover';
roofCover.add(createMesh('RoofCover'));

const roofSupport = new Object3D();
roofSupport.name = 'RoofSupport';
roofSupport.add(createMesh('RoofSupport'));

roof.add(roofBottom, roofCover, roofSupport);

// Walls
const walls = new Object3D();
walls.name = 'Walls';
walls.add(createMesh('Walls'));

// Foundation
const foundation = new Object3D();
foundation.name = 'Foundation';
foundation.add(createMesh('Foundation'));

// Columns
const columns = new Object3D();
columns.name = 'Columns';
columns.add(createMesh('Columns'));

// Porch Railings
const porchRailings = new Object3D();
porchRailings.name = 'PorchRailings';
porchRailings.add(createMesh('PorchRailings'));

// Windows
const windows = new Object3D();
windows.name = 'Windows';

const window1 = new Object3D();
window1.name = 'Window1';
window1.add(createMesh('WindowBlinds1'));
window1.add(createMesh('WindowFrame1'));
window1.add(createMesh('WindowGlass1'));
window1.add(createMesh('WindowSash1'));

const window2 = new Object3D();
window2.name = 'Window2';
window2.add(createMesh('WindowBlinds2'));
window2.add(createMesh('WindowFrame2'));
window2.add(createMesh('WindowGlass2'));
window2.add(createMesh('WindowSash2'));

windows.add(window1, window2);

// Doors
const doors = new Object3D();
doors.name = 'Doors';

const door1 = new Object3D();
door1.name = 'Door1';
door1.add(createMesh('DoorFrame1'));
door1.add(createMesh('DoorHandle1'));
door1.add(createMesh('DoorHinges1'));
door1.add(createMesh('DoorPanel1'));

const door2 = new Object3D();
door2.name = 'Door2';
door2.add(createMesh('DoorFrame2'));
door2.add(createMesh('DoorHandle2'));
door2.add(createMesh('DoorHinges2'));
door2.add(createMesh('DoorPanel2'));

doors.add(door1, door2);

// Gates
const gates = new Object3D();
gates.name = 'Gates';

const gates1 = new Object3D();
gates1.name = 'Gates1';
gates1.add(createMesh('GatesDoor1'));
gates1.add(createMesh('GatesFrame1'));

gates.add(gates1);

// Corners
const corners = new Object3D();
corners.name = 'Corners';
corners.add(createMesh('Corners'));

// Paving
const paving = new Object3D();
paving.name = 'Paving';
paving.add(createMesh('Paving'));

// Road
const road = new Object3D();
road.name = 'Road';
road.add(createMesh('Road'));

house.add(roof, walls, foundation, columns, porchRailings, windows, doors, gates, corners, paving, road);

const mockModels: ModelCollection = {
  House1: house,
  House2: house,
};

export const mockedDispatch = jest.fn();
export const ModelsContext = createContext<State | null>(null);
export const ModelsDispatchContext = createContext<(() => void) | null>(null);

export function ModelsProvider({ children }: { children: ReactNode }) {
  const mockState: State = {
    models: mockModels,
    status: 'success',
    selectedModelName: 'House1',
  };

  return (
    <ModelsContext.Provider value={mockState}>
      <ModelsDispatchContext.Provider value={mockedDispatch}>
        {children}
      </ModelsDispatchContext.Provider>
    </ModelsContext.Provider>
  );
}

// Custom hook to use ModelsContext
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