import { useImmerReducer } from 'use-immer';
import { ColorRepresentation } from 'three';
import { TextureName } from './TexturesContext';
import { createContext, useContext, ReactNode, Dispatch } from 'react';

type MaterialsState = {
  roof: {
    coverTextureName: TextureName;
    color: ColorRepresentation;
  };
  fence: {
    color: ColorRepresentation
  };
  foundation: {
    textureName: TextureName;
  };
  corners: {
    color: ColorRepresentation;
  };
  walls: {
    textureName: TextureName;
  };
  windows: {
    sashColor: ColorRepresentation;
    frameColor: ColorRepresentation;
  },
  doors: {
    color: ColorRepresentation;
  };
};

type MaterialsAction =
  | { type: 'roofCoverTextureChanged'; payload: TextureName }
  | { type: 'roofColorChanged'; payload: ColorRepresentation }
  | { type: 'fenceColorChanged'; payload: ColorRepresentation }
  | { type: 'foundationTextureChanged'; payload: TextureName }
  | { type: 'cornersColorChanged'; payload: ColorRepresentation }
  | { type: 'wallsTextureChanged'; payload: TextureName }
  | { type: 'windowsSashColorChanged'; payload: ColorRepresentation }
  | { type: 'windowsFrameColorChanged'; payload: ColorRepresentation }
  | { type: 'doorsColorChanged'; payload: ColorRepresentation };

const initialState: MaterialsState = {
  roof: {
    coverTextureName: 'RoofingTiles003',
    color: "#ffffff"
  },
  fence: {
    color: "#ffffff"
  },
  foundation: {
    textureName: 'Plaster003'
  },
  corners: {
    color: "#ffffff"
  },
  walls: {
    textureName: 'Bricks092'
  },
  windows: {
    sashColor: "#634A33",
    frameColor: "#ffffff"
  },
  doors: {
    color: "#632D11"
  },
};

function materialsReducer(draft: MaterialsState, action: MaterialsAction) {
  switch (action.type) {
    case 'roofCoverTextureChanged':
      draft.roof.coverTextureName = action.payload;
      break;
    case 'roofColorChanged':
      draft.roof.color = action.payload;
      break;
    case 'fenceColorChanged':
      draft.fence.color = action.payload;
      break;
    case 'foundationTextureChanged':
      draft.foundation.textureName = action.payload;
      break;
    case 'cornersColorChanged':
      draft.corners.color = action.payload;
      break;
    case 'wallsTextureChanged':
      draft.walls.textureName = action.payload;
      break;
    case 'windowsSashColorChanged':
      draft.windows.sashColor = action.payload;
      break;
    case 'windowsFrameColorChanged':
      draft.windows.frameColor = action.payload;
      break;
    case 'doorsColorChanged':
      draft.doors.color = action.payload;
      break;
  }
}

const MaterialsContext = createContext<MaterialsState | null>(null);
const MaterialsDispatchContext = createContext<Dispatch<MaterialsAction> | null>(null);

export function MaterialsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useImmerReducer(materialsReducer, initialState);

  return (
    <MaterialsContext.Provider value={state}>
      <MaterialsDispatchContext.Provider value={dispatch}>
        {children}
      </MaterialsDispatchContext.Provider>
    </MaterialsContext.Provider>
  );
}

export function useMaterials() {
  const context = useContext(MaterialsContext);
  if (!context) {
    throw new Error('useMaterialsContext must be used within a MaterialsProvider');
  }
  return context;
}

export function useMaterialsDispatch() {
  const context = useContext(MaterialsDispatchContext);
  if (!context) {
    throw new Error('useMaterialsDispatch must be used within a MaterialsProvider');
  }
  return context;
}