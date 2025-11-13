import { Object3DNode } from '@react-three/fiber';
import { Mesh } from 'three';

declare module '@react-three/fiber' {
  interface ThreeElements {
    mesh: Object3DNode<Mesh, typeof Mesh>;
  }
}
