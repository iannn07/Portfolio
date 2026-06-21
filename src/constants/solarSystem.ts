export type PlanetId = '01' | '02' | '03' | '04'

export interface Planet {
  id: PlanetId
  section: string
  orbitRadius: number
  size: number
  speed: number         // radians/second
  initialAngle: number  // radians
  color: number         // THREE.js hex color
}

export const PLANETS: Planet[] = [
  { id: '01', section: 'About',    orbitRadius: 2.6, size: 0.30, speed: (2 * Math.PI) / 18, initialAngle: 0,              color: 0x2469B8 }, // Earth — ocean blue
  { id: '02', section: 'Work',     orbitRadius: 3.8, size: 0.22, speed: (2 * Math.PI) / 28, initialAngle: Math.PI * 0.4,  color: 0xB5411A }, // Mars — burnt sienna
  { id: '03', section: 'Ventures', orbitRadius: 5.2, size: 0.50, speed: (2 * Math.PI) / 45, initialAngle: Math.PI * 0.9,  color: 0xC8956C }, // Jupiter — banded amber
  { id: '04', section: 'Skills',   orbitRadius: 6.8, size: 0.42, speed: (2 * Math.PI) / 62, initialAngle: Math.PI * 1.5,  color: 0xE8D09A }, // Saturn — pale gold
]

export const SUN_SIZE  = 0.5
export const CAMERA_FOV = 58
