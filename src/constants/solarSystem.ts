export type PlanetId = '01' | '02' | '03' | '04' | '05'

export interface Planet {
  id: PlanetId
  section: string
  orbitRadius: number
  size: number
  speed: number        // radians/second  = (2π / period_seconds)
  initialAngle: number // radians
}

export const PLANETS: Planet[] = [
  { id: '01', section: 'About',    orbitRadius: 3.5,  size: 0.22, speed: (2 * Math.PI) / 18, initialAngle: 0 },
  { id: '02', section: 'Work',     orbitRadius: 5.5,  size: 0.30, speed: (2 * Math.PI) / 28, initialAngle: Math.PI / 3 },
  { id: '03', section: 'Projects', orbitRadius: 7.0,  size: 0.25, speed: (2 * Math.PI) / 38, initialAngle: (2 * Math.PI) / 3 },
  { id: '04', section: 'Ventures', orbitRadius: 8.5,  size: 0.27, speed: (2 * Math.PI) / 50, initialAngle: Math.PI },
  { id: '05', section: 'Skills',   orbitRadius: 10.0, size: 0.20, speed: (2 * Math.PI) / 65, initialAngle: (4 * Math.PI) / 3 },
]

export const SUN_SIZE        = 0.5
export const CAMERA_DEFAULT_Z = 14
export const CAMERA_FOV       = 58
