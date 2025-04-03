import { Material, Mesh, Object3D, Texture } from "three";

/**
 * A function that helps clean up texture resources
 * 
 * @param {Texture} texture - texture to be destroyed
 */
export async function disposeTexture(texture: Texture) {
  if (!(texture instanceof Texture)) {
    throw new Error("texture must be instance of Texture");
  }

  texture.dispose();
}

/**
 * A function that helps clean up texture resources
 * 
 * @param {Material} material - material to be destroyed
 */
export async function disposeMaterial(material: Material) {
  if (!(material instanceof Material)) {
    throw new Error("material must be instance of Material");
  }

  material.dispose();
}

/**
 * A function that helps clean up object resources
 * 
 * @param {Object3D} object - object to be destroyed
 */
export async function disposeObject(object: Object3D) {
  if (!(object instanceof Object3D)) {
    throw new Error("object must be instance of Object3D");
  }

  object.traverse(object => {
    if (!(object instanceof Mesh)) return;

    object.geometry.dispose();
  })
}