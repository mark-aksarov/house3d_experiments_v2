import { TextureName } from "@/context/TexturesContext";
import { Vector2 } from "three";

const materialDefaults: Record<"repeat" | "normalScale" | "roughness", Partial<Record<TextureName, any>>> = {
  repeat: {
    RoofingTiles003: new Vector2(1, 1),
    RoofingTiles004: new Vector2(0.4, 0.4),
    RoofingTiles014A: new Vector2(0.4, 0.4),
    Plaster003: new Vector2(0.4, 0.4),
    Concrete024: new Vector2(0.4, 0.4),
    RoofingTiles011A: new Vector2(0.4, 0.4),
    RoofingTiles012A: new Vector2(0.4, 0.4),
    RoofingTiles013A: new Vector2(0.4, 0.4),
    RoofingTiles015A: new Vector2(0.4, 0.4),
    Asphalt030: new Vector2(0.4, 0.4),
    Asphalt029A: new Vector2(0.4, 0.4),
    Asphalt006: new Vector2(0.5, 0.5),
    Bricks092: new Vector2(6.75, 6.75),
    Asphalt029B: new Vector2(0.75, 0.75),
    Bricks075A: new Vector2(0.5, 0.75),
    Ground037: new Vector2(7, 7),
    PavingStones108: new Vector2(5, 5),
    Metal046B: new Vector2(2, 2)
  },
  normalScale: {
    Asphalt006: new Vector2(0.25, 0.25),
    Plaster003: new Vector2(2, 2),
    Concrete024: new Vector2(2, 2),
    Asphalt030: new Vector2(2, 2),
    Asphalt029A: new Vector2(2, 2),
    Asphalt029B: new Vector2(2, 2),
    Bricks092: new Vector2(3, 3),
    Bricks075A: new Vector2(3, 3),
    RoofingTiles003: new Vector2(7, 7),
    RoofingTiles004: new Vector2(7, 7),
    RoofingTiles011A: new Vector2(7, 7),
    RoofingTiles012A: new Vector2(7, 7),
    RoofingTiles013A: new Vector2(7, 7),
    RoofingTiles014A: new Vector2(7, 7),
    RoofingTiles015A: new Vector2(7, 7),
    Ground037: new Vector2(0.5, 0.5),
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
    Asphalt029A: 3,
    Asphalt029B: 3,
    Ground037: 3,
    PavingStones108: 3,
    Metal046B: 1
  },
};

export default materialDefaults;