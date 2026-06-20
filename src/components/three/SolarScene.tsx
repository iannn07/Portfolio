'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import * as THREE from 'three'
import {
  CSS2DObject,
  CSS2DRenderer,
} from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import gsap from 'gsap'
import { CAMERA_FOV, PLANETS, SUN_SIZE } from '@/constants/solarSystem'

// Top-down orbit view — camera elevated on Y axis with slight forward tilt
const CAM_DEFAULT = { x: 0, y: 18, z: 6 }
const PARALLAX = [0.02, 0.06, 0.12] as const

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
  ref,
) {
  const mountRef = useRef<HTMLDivElement>(null)

  const cbRef = useRef({ onPlanetEntered, onPlanetExited })
  useEffect(() => {
    cbRef.current = { onPlanetEntered, onPlanetExited }
  }, [onPlanetEntered, onPlanetExited])

  const zoomRef = useRef<{
    to: ((id: string) => void) | null
    out: (() => void) | null
  }>({
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

    // ── Scene ────────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    )
    camera.position.set(CAM_DEFAULT.x, CAM_DEFAULT.y, CAM_DEFAULT.z)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 1)
    mount.appendChild(renderer.domElement)

    const labelRenderer = new CSS2DRenderer()
    labelRenderer.setSize(mount.clientWidth, mount.clientHeight)
    labelRenderer.domElement.style.cssText =
      'position:absolute;top:0;left:0;pointer-events:none;'
    mount.appendChild(labelRenderer.domElement)

    // ── Lights ───────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.4))
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0)
    dirLight.position.set(5, 8, 5)
    scene.add(dirLight)

    // ── Stars — 3 depth layers, spherically distributed for top-down view ─
    const STAR_CFG = [
      { count: 500, spread: 80, size: 0.008 },
      { count: 500, spread: 60, size: 0.012 },
      { count: 400, spread: 40, size: 0.018 },
    ] as const

    const starMats: THREE.PointsMaterial[] = []
    const starGroups = STAR_CFG.map(({ count, spread, size }) => {
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * spread
        pos[i * 3 + 1] = (Math.random() - 0.5) * spread
        pos[i * 3 + 2] = (Math.random() - 0.5) * spread
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const mat = new THREE.PointsMaterial({
        color: 0xffffff,
        size,
        sizeAttenuation: true,
      })
      starMats.push(mat)
      const pts = new THREE.Points(geo, mat)
      scene.add(pts)
      return pts
    })

    // ── Sun + halo ───────────────────────────────────────────────────────
    const sunMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 1,
    })
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(SUN_SIZE, 32, 32),
      sunMat,
    )
    scene.add(sun)
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    })
    scene.add(
      new THREE.Mesh(new THREE.SphereGeometry(SUN_SIZE * 2.5, 16, 16), haloMat),
    )

    // ── Orbit rings ──────────────────────────────────────────────────────
    const ringMats: THREE.MeshBasicMaterial[] = []
    PLANETS.forEach((p) => {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
      })
      ringMats.push(mat)
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(p.orbitRadius, 0.018, 8, 128),
        mat,
      )
      ring.rotation.x = Math.PI / 2
      scene.add(ring)
    })

    // ── Planets + CSS2D section name labels ───────────────────────────────
    type PE = {
      mesh: THREE.Mesh
      id: string
      angle: number
      speed: number
      r: number
      size: number
    }
    const planets: PE[] = []
    const meshById = new Map<string, THREE.Mesh>()

    PLANETS.forEach((p) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(p.size, 24, 24),
        new THREE.MeshStandardMaterial({
          color: p.color,
          metalness: 0.1,
          roughness: 0.8,
        }),
      )
      mesh.position.x = Math.cos(p.initialAngle) * p.orbitRadius
      mesh.position.z = Math.sin(p.initialAngle) * p.orbitRadius
      scene.add(mesh)
      meshById.set(p.id, mesh)

      // Label uses CSS variables — inherits theme automatically from the document
      const el = document.createElement('div')
      el.textContent = p.section
      el.style.fontFamily = 'var(--mono)'
      el.style.fontSize = '11px'
      el.style.color = 'var(--secondary)'
      el.style.letterSpacing = '0.18em'
      el.style.textTransform = 'uppercase'
      el.style.pointerEvents = 'none'
      el.style.userSelect = 'none'
      el.style.transition = 'color 0.3s'
      const lbl = new CSS2DObject(el)
      lbl.position.set(0, -(p.size * 6), 0)
      mesh.add(lbl)

      planets.push({
        mesh,
        id: p.id,
        angle: p.initialAngle,
        speed: p.speed,
        r: p.orbitRadius,
        size: p.size,
      })
    })

    // ── Theme-aware material updates (called each frame, only acts on change) ─
    let lastTheme = ''
    const applyTheme = () => {
      const theme = document.documentElement.dataset.theme ?? 'dark'
      if (theme === lastTheme) return
      lastTheme = theme
      const dark = theme !== 'light'
      renderer.setClearColor(dark ? 0x000000 : 0xf5f5f0, 1)
      starMats.forEach((m, i) => {
        m.color.setHex(dark ? 0xffffff : 0x111111)
        m.size = dark ? STAR_CFG[i].size : STAR_CFG[i].size * 3
        m.needsUpdate = true
      })
      ringMats.forEach((m) => {
        m.color.setHex(dark ? 0xffffff : 0x000000)
        m.opacity = dark ? 0.2 : 0.1
        m.needsUpdate = true
      })
      sunMat.color.setHex(dark ? 0xffffff : 0xc8762c)
      sunMat.emissive.setHex(dark ? 0xffffff : 0xc8762c)
      sunMat.emissiveIntensity = dark ? 1.0 : 0.75
      sunMat.needsUpdate = true
      haloMat.color.setHex(dark ? 0xffffff : 0xd4813a)
      haloMat.opacity = dark ? 0.04 : 0.08
      haloMat.needsUpdate = true
    }

    // ── Zoom functions ───────────────────────────────────────────────────
    let isZooming = false
    let hoveredPlanetId: string | null = null // paused while mouse is over it
    let pausedPlanetId: string | null = null // paused while camera is zoomed in
    const lookTarget = { x: 0, y: 0, z: 0 }

    zoom.to = (id: string) => {
      if (isZooming) return
      const mesh = meshById.get(id)
      const pDef = PLANETS.find((p) => p.id === id)
      if (!mesh || !pDef) return
      isZooming = true
      pausedPlanetId = id

      const mPos = mesh.position.clone()
      const outward = new THREE.Vector3(mPos.x, 0, mPos.z).normalize()
      const offset = pDef.size * 3 + 2.5

      gsap.to(camera.position, {
        x: mPos.x + outward.x * offset,
        y: 4.5,
        z: mPos.z + outward.z * offset,
        duration: 1.5,
        ease: 'power3.inOut',
        onComplete: () => {
          isZooming = false
          cbRef.current.onPlanetEntered(id)
        },
      })
      gsap.to(lookTarget, {
        x: mPos.x,
        y: 0,
        z: mPos.z,
        duration: 1.5,
        ease: 'power3.inOut',
        onUpdate: () => camera.lookAt(lookTarget.x, lookTarget.y, lookTarget.z),
      })
    }

    zoom.out = () => {
      if (isZooming) return
      isZooming = true
      gsap.to(camera.position, {
        x: CAM_DEFAULT.x,
        y: CAM_DEFAULT.y,
        z: CAM_DEFAULT.z,
        duration: 1.2,
        ease: 'power3.inOut',
        onComplete: () => {
          isZooming = false
          pausedPlanetId = null
          cbRef.current.onPlanetExited()
        },
      })
      gsap.to(lookTarget, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.2,
        ease: 'power3.inOut',
        onUpdate: () => camera.lookAt(lookTarget.x, lookTarget.y, lookTarget.z),
      })
    }

    // ── Raycasting ───────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster()
    const m2d = new THREE.Vector2()
    const meshList = planets.map((p) => p.mesh)

    const onClick = (e: MouseEvent) => {
      if (isZooming) return
      const rect = mount.getBoundingClientRect()
      m2d.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      m2d.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(m2d, camera)
      const hits = raycaster.intersectObjects(meshList)
      if (hits.length) {
        const hit = planets.find((p) => p.mesh === hits[0].object)
        if (hit) zoom.to?.(hit.id)
      }
    }

    let tx = 0,
      ty = 0
    const onMouseMove = (e: MouseEvent) => {
      tx = (e.clientX - window.innerWidth / 2) / window.innerWidth
      ty = (e.clientY - window.innerHeight / 2) / window.innerHeight
      if (!isZooming) {
        const rect = mount.getBoundingClientRect()
        m2d.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        m2d.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
        raycaster.setFromCamera(m2d, camera)
        const hits = raycaster.intersectObjects(meshList)
        const hitPlanet = hits.length
          ? planets.find((p) => p.mesh === hits[0].object)
          : null
        hoveredPlanetId = hitPlanet ? hitPlanet.id : null
        mount.style.cursor = hits.length ? 'pointer' : 'default'
      }
    }
    const onMouseLeave = () => {
      hoveredPlanetId = null
    }

    mount.addEventListener('click', onClick)
    mount.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('mousemove', onMouseMove)

    // ── Animation loop ───────────────────────────────────────────────────
    let mx = 0,
      my = 0
    let animId = 0,
      lastT = 0

    const animate = (t: number) => {
      const dt = Math.min((t - lastT) / 1000, 0.05)
      lastT = t

      mx += (tx - mx) * 0.08
      my += (ty - my) * 0.08

      // Orbit — frozen while hovered (for click accuracy) or while camera is zoomed in
      planets.forEach((p) => {
        if (p.id !== hoveredPlanetId && p.id !== pausedPlanetId)
          p.angle += p.speed * dt
        p.mesh.position.x = Math.cos(p.angle) * p.r
        p.mesh.position.z = Math.sin(p.angle) * p.r
      })

      // Top-down parallax: mouse X → star X, mouse Y → star Z depth
      starGroups.forEach((g, i) => {
        g.position.x = mx * PARALLAX[i] * 8
        g.position.z = -my * PARALLAX[i] * 8
      })

      sun.scale.setScalar(1 + Math.sin(t * 0.001) * 0.025)

      applyTheme()
      renderer.render(scene, camera)
      labelRenderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }
    animId = requestAnimationFrame(animate)

    const onResize = () => {
      const w = mount.clientWidth,
        h = mount.clientHeight
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
      mount.removeEventListener('mouseleave', onMouseLeave)
      renderer.dispose()
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement)
      if (mount.contains(labelRenderer.domElement))
        mount.removeChild(labelRenderer.domElement)
      zoom.to = null
      zoom.out = null
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%' }}
    />
  )
})

export default SolarScene
