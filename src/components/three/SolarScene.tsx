'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import * as THREE from 'three'
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import gsap from 'gsap'
import { CAMERA_DEFAULT_Z, CAMERA_FOV, PLANETS, SUN_SIZE } from '@/constants/solarSystem'

export interface SolarSceneHandle {
  zoomToPlanet: (id: string) => void
  zoomOut: () => void
}

interface Props {
  onPlanetEntered: (id: string) => void
  onPlanetExited: () => void
}

const SolarScene = forwardRef<SolarSceneHandle, Props>(function SolarScene(
  { onPlanetEntered, onPlanetExited },
  ref
) {
  const mountRef = useRef<HTMLDivElement>(null)

  // Callbacks stored in ref to avoid stale closure in GSAP onComplete
  const cbRef = useRef({ onPlanetEntered, onPlanetExited })
  useEffect(() => { cbRef.current = { onPlanetEntered, onPlanetExited } }, [onPlanetEntered, onPlanetExited])

  // Zoom functions set inside useEffect (after scene init), exposed via imperative handle
  const zoomRef = useRef<{ to: ((id: string) => void) | null; out: (() => void) | null }>({
    to: null,
    out: null,
  })

  useImperativeHandle(ref, () => ({
    zoomToPlanet: (id) => zoomRef.current.to?.(id),
    zoomOut: () => zoomRef.current.out?.(),
  }))

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const zoom = zoomRef.current

    // ── Scene setup ──────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = CAMERA_DEFAULT_Z

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 1)
    mount.appendChild(renderer.domElement)

    const labelRenderer = new CSS2DRenderer()
    labelRenderer.setSize(mount.clientWidth, mount.clientHeight)
    labelRenderer.domElement.style.cssText = 'position:absolute;top:0;left:0;pointer-events:none;'
    mount.appendChild(labelRenderer.domElement)

    // ── Lights ───────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.4))
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0)
    dirLight.position.set(5, 5, 5)
    scene.add(dirLight)

    // ── Stars — 3 depth layers with mouse parallax ────────────────────────
    const STAR_CFG = [
      { count: 500, spread: 80, size: 0.008 },
      { count: 500, spread: 60, size: 0.012 },
      { count: 400, spread: 40, size: 0.018 },
    ] as const
    const PARALLAX = [0.02, 0.06, 0.12] as const

    const starGroups = STAR_CFG.map(({ count, spread, size }) => {
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * spread
        pos[i * 3 + 1] = (Math.random() - 0.5) * spread
        pos[i * 3 + 2] = -15 - Math.random() * 20
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const mat = new THREE.PointsMaterial({ color: 0xffffff, size, sizeAttenuation: true })
      const pts = new THREE.Points(geo, mat)
      scene.add(pts)
      return pts
    })

    // ── Sun + halo ───────────────────────────────────────────────────────
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(SUN_SIZE, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1 })
    )
    scene.add(sun)
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(SUN_SIZE * 2.5, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.04, side: THREE.BackSide })
    ))

    // ── Orbit rings ──────────────────────────────────────────────────────
    PLANETS.forEach(p => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(p.orbitRadius, 0.006, 8, 128),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06 })
      )
      ring.rotation.x = Math.PI / 2
      scene.add(ring)
    })

    // ── Planets + CSS2D number labels ────────────────────────────────────
    type PE = { mesh: THREE.Mesh; id: string; angle: number; speed: number; r: number; size: number }
    const planets: PE[] = []
    const meshById = new Map<string, THREE.Mesh>()

    PLANETS.forEach(p => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(p.size, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.1, roughness: 0.85 })
      )
      scene.add(mesh)
      meshById.set(p.id, mesh)

      const el = document.createElement('div')
      el.textContent = p.id
      el.style.cssText = 'font-size:9px;color:rgba(255,255,255,0.55);letter-spacing:.14em;pointer-events:none;user-select:none;'
      const lbl = new CSS2DObject(el)
      lbl.position.set(0, p.size + 0.22, 0)
      mesh.add(lbl)

      planets.push({ mesh, id: p.id, angle: p.initialAngle, speed: p.speed, r: p.orbitRadius, size: p.size })
    })

    // ── Zoom functions ───────────────────────────────────────────────────
    let isZooming = false
    let pausedPlanetId: string | null = null
    const lookTarget = { x: 0, y: 0, z: 0 }

    zoom.to = (id: string) => {
      if (isZooming) return
      const mesh = meshById.get(id)
      const pDef = PLANETS.find(p => p.id === id)
      if (!mesh || !pDef) return
      isZooming = true
      pausedPlanetId = id

      // Capture position at click time (planet pauses here so position stays accurate)
      const mPos = mesh.position.clone()
      const back = new THREE.Vector3(-mPos.x, 0, -mPos.z).normalize()
      const offset = pDef.size * 3 + 1.8

      gsap.to(camera.position, {
        x: mPos.x + back.x * offset,
        y: mPos.y + 0.4,
        z: mPos.z + back.z * offset + 1.5,
        duration: 1.5,
        ease: 'power3.inOut',
        onComplete: () => {
          isZooming = false
          cbRef.current.onPlanetEntered(id)
        },
      })
      gsap.to(lookTarget, {
        x: mPos.x, y: mPos.y, z: mPos.z,
        duration: 1.5,
        ease: 'power3.inOut',
        onUpdate: () => camera.lookAt(lookTarget.x, lookTarget.y, lookTarget.z),
      })
    }

    zoom.out = () => {
      if (isZooming) return
      isZooming = true
      gsap.to(camera.position, {
        x: 0, y: 0, z: CAMERA_DEFAULT_Z,
        duration: 1.2,
        ease: 'power3.inOut',
        onComplete: () => {
          isZooming = false
          pausedPlanetId = null
          cbRef.current.onPlanetExited()
        },
      })
      gsap.to(lookTarget, {
        x: 0, y: 0, z: 0,
        duration: 1.2,
        ease: 'power3.inOut',
        onUpdate: () => camera.lookAt(lookTarget.x, lookTarget.y, lookTarget.z),
      })
    }

    // ── Raycasting ───────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster()
    const m2d = new THREE.Vector2()
    const meshList = planets.map(p => p.mesh)

    const onClick = (e: MouseEvent) => {
      if (isZooming) return
      const rect = mount.getBoundingClientRect()
      m2d.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      m2d.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(m2d, camera)
      const hits = raycaster.intersectObjects(meshList)
      if (hits.length) {
        const hit = planets.find(p => p.mesh === hits[0].object)
        if (hit) zoom.to?.(hit.id)
      }
    }

    let tx = 0, ty = 0
    const onMouseMove = (e: MouseEvent) => {
      tx = (e.clientX - window.innerWidth  / 2) / window.innerWidth
      ty = (e.clientY - window.innerHeight / 2) / window.innerHeight
      if (!isZooming) {
        const rect = mount.getBoundingClientRect()
        m2d.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        m2d.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
        raycaster.setFromCamera(m2d, camera)
        mount.style.cursor = raycaster.intersectObjects(meshList).length ? 'pointer' : 'default'
      }
    }

    mount.addEventListener('click', onClick)
    window.addEventListener('mousemove', onMouseMove)

    // ── Animation loop ───────────────────────────────────────────────────
    let mx = 0, my = 0
    let animId = 0, lastT = 0

    const animate = (t: number) => {
      const dt = Math.min((t - lastT) / 1000, 0.05)
      lastT = t

      mx += (tx - mx) * 0.08
      my += (ty - my) * 0.08

      // Paused planet keeps its angle; all others continue orbiting
      planets.forEach(p => {
        if (p.id !== pausedPlanetId) p.angle += p.speed * dt
        p.mesh.position.x = Math.cos(p.angle) * p.r
        p.mesh.position.z = Math.sin(p.angle) * p.r
      })

      starGroups.forEach((g, i) => {
        g.position.x =  mx * PARALLAX[i] * 8
        g.position.y = -my * PARALLAX[i] * 8
      })

      sun.scale.setScalar(1 + Math.sin(t * 0.001) * 0.025)

      renderer.render(scene, camera)
      labelRenderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }
    animId = requestAnimationFrame(animate)

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      labelRenderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      mount.removeEventListener('click', onClick)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      if (mount.contains(labelRenderer.domElement)) mount.removeChild(labelRenderer.domElement)
      zoom.to = null
      zoom.out = null
    }
  }, [])

  return <div ref={mountRef} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%' }} />
})

export default SolarScene
