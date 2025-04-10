import { useImmerReducer } from 'use-immer';
import { ColorRepresentation } from 'three';
import { TextureName } from './TexturesContext';
import { createContext, useContext, ReactNode, Dispatch } from 'react';

type MaterialsState = {
  common: {
    color: ColorRepresentation
  };
  roof: {
    coverTextureName: TextureName;
    color: ColorRepresentation;
  };
  foundation: {
    textureName: TextureName;
  };
  walls: {
    textureName: TextureName;
  };
  windows: {
    sashColor: ColorRepresentation;
    blindsColor: ColorRepresentation;
    glassColor: ColorRepresentation;
    glassOpacity: number;
  },
  doors: {
    color: ColorRepresentation;
  };
};

type MaterialsAction =
  | { type: 'roofCoverTextureChanged'; payload: TextureName }
  | { type: 'roofColorChanged'; payload: ColorRepresentation }
  | { type: 'commonColorChanged'; payload: ColorRepresentation }
  | { type: 'foundationTextureChanged'; payload: TextureName }
  | { type: 'cornersColorChanged'; payload: ColorRepresentation }
  | { type: 'wallsTextureChanged'; payload: TextureName }
  | { type: 'windowsSashColorChanged'; payload: ColorRepresentation }
  | { type: 'windowsBlindsColorChanged'; payload: ColorRepresentation }
  | { type: 'windowsGlassColorChanged'; payload: ColorRepresentation }
  | { type: 'windowsGlassOpacityChanged'; payload: number }
  | { type: 'doorsColorChanged'; payload: ColorRepresentation };

const initialState: MaterialsState = {
  roof: {
    coverTextureName: 'RoofingTiles003',
    color: "#ffffff"
  },
  common: {
    color: "#ffffff"
  },
  foundation: {
    textureName: 'Asphalt031'
  },
  walls: {
    textureName: 'Bricks092'
  },
  windows: {
    sashColor: "#634a33",
    blindsColor: "#ffffff",
    glassColor: "#ffffff",
    glassOpacity: 0.5
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
    case 'commonColorChanged':
      draft.common.color = action.payload;
      break;
    case 'foundationTextureChanged':
      draft.foundation.textureName = action.payload;
      break;
    case 'wallsTextureChanged':
      draft.walls.textureName = action.payload;
      break;
    case 'windowsSashColorChanged':
      draft.windows.sashColor = action.payload;
      break;
    case 'windowsBlindsColorChanged':
      draft.windows.blindsColor = action.payload;
      break;
    case 'windowsGlassColorChanged':
      draft.windows.glassColor = action.payload;
      break;
    case 'windowsGlassOpacityChanged':
      draft.windows.glassOpacity = action.payload;
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