import { TextureName } from "@/context/TexturesContext";
import { Vector2 } from "three";

const materialDefaults: Record<"repeat" | "normalScale" | "roughness", Partial<Record<TextureName, any>>> = {
  repeat: {
    Plaster003: new Vector2(5, 5),
    Concrete024: new Vector2(3, 3),
    RoofingTiles003: new Vector2(1, 1),
    RoofingTiles004: new Vector2(1, 1),
    RoofingTiles011A: new Vector2(1.25, 1.25),
    RoofingTiles012A: new Vector2(1.25, 1.25),
    RoofingTiles013A: new Vector2(1.25, 1.25),
    RoofingTiles014A: new Vector2(1, 1),
    RoofingTiles015A: new Vector2(1.25, 1.25),
    Asphalt030: new Vector2(3, 3),
    Asphalt006: new Vector2(5, 5),
    Bricks092: new Vector2(6.75, 6.75),
    Asphalt029B: new Vector2(3, 3),
    Bricks075A: new Vector2(0.5, 0.75),
    Asphalt031: new Vector2(1, 1),
    PavingStones108: new Vector2(5, 5),
    Metal046B: new Vector2(2, 2)
  },
  normalScale: {
    Asphalt006: new Vector2(0.25, 0.25),
    Plaster003: new Vector2(2, 2),
    Concrete024: new Vector2(2, 2),
    Asphalt030: new Vector2(2, 2),
    Asphalt029B: new Vector2(2, 2),
    Bricks092: new Vector2(3, 3),
    Bricks075A: new Vector2(3, 3),
    RoofingTiles003: new Vector2(4, 4),
    RoofingTiles004: new Vector2(4, 4),
    RoofingTiles011A: new Vector2(7, 7),
    RoofingTiles012A: new Vector2(7, 7),
    RoofingTiles013A: new Vector2(7, 7),
    RoofingTiles014A: new Vector2(7, 7),
    RoofingTiles015A: new Vector2(7, 7),
    Asphalt031: new Vector2(0.5, 0.5),
    PavingStones108: new Vector2(2, 2),
    Metal046B: new Vector2(2, 2)
  },
  roughness: {
    Bricks092: 1.5,
    Bricks075A: 1.5,
    RoofingTiles003: 2,
    RoofingTiles004: 2,
    RoofingTiles011A: 2,
    RoofingTiles012A: 2,
    RoofingTiles013A: 2,
    RoofingTiles014A: 2,
    RoofingTiles015A: 2,
    Plaster003: 3,
    Concrete024: 3,
    Asphalt006: 3,
    Asphalt030: 3,
    Asphalt029B: 3,
    Asphalt031: 3,
    PavingStones108: 3,
    Metal046B: 1
  },
};

export default materialDefaults;