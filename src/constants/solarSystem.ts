export type PlanetId = '01' | '02' | '03' | '04' | '05'

export interface Planet {
  id: PlanetId
  section: string
  orbitRadius: number
  size: number
  speed: number         // radians/second
  initialAngle: number  // radians
  color: number         // THREE.js hex color inspired by real solar system
}

export const PLANETS: Planet[] = [
  { id: '01', section: 'About',    orbitRadius: 2.6, size: 0.32, speed: (2 * Math.PI) / 18, initialAngle: 0,              color: 0xB8B8B8 }, // Mercury — silver-gray
  { id: '02', section: 'Work',     orbitRadius: 3.8, size: 0.44, speed: (2 * Math.PI) / 28, initialAngle: Math.PI * 0.4,  color: 0xE8C97B }, // Venus — golden cream
  { id: '03', section: 'Projects', orbitRadius: 5.0, size: 0.36, speed: (2 * Math.PI) / 38, initialAngle: Math.PI * 0.8,  color: 0x5BA3C9 }, // Earth — ocean blue
  { id: '04', section: 'Ventures', orbitRadius: 6.2, size: 0.38, speed: (2 * Math.PI) / 50, initialAngle: Math.PI * 1.3,  color: 0xD4522E }, // Mars — rusty red
  { id: '05', section: 'Skills',   orbitRadius: 7.5, size: 0.52, speed: (2 * Math.PI) / 65, initialAngle: Math.PI * 1.8,  color: 0xD4A04A }, // Jupiter — amber
]

export const SUN_SIZE  = 0.5
export const CAMERA_FOV = 58
