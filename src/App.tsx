import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useState, useRef } from 'react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import './App.css'

function CuteCat() {
  const groupRef = useRef<THREE.Group>(null)
  const [time, setTime] = useState(0)

  // Create heart shape geometry
  const heartGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    const x = 0, y = 0
    shape.moveTo(x + 0.5, y + 0.5)
    shape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y)
    shape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7)
    shape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9)
    shape.bezierCurveTo(x + 1.3, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7)
    shape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1, y)
    shape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5)

    const extrudeSettings = {
      depth: 0.5,
      bevelEnabled: true,
      bevelSegments: 1,
      steps: 1,
      bevelSize: 0.1,
      bevelThickness: 0.1
    }
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  useFrame((state, delta) => {
    setTime(state.clock.getElapsedTime())

    // Bounce animation
    if (groupRef.current) {
      groupRef.current.position.y = -15 + Math.sin(time * 2) * 1.5
    }
  })

  // Create hearts in a circle around the cat
  const hearts = useMemo(() => {
    const positions = []
    const numHearts = 8
    const radius = 20

    for (let i = 0; i < numHearts; i++) {
      const angle = (i / numHearts) * Math.PI * 2
      positions.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        index: i
      })
    }
    return positions
  }, [])

  return (
    <group ref={groupRef} position={[-45, -15, 0]}>
      {/* Main body - oval shaped */}
      <mesh position={[0, -2, 0]} scale={[1, 1.2, 0.9]}>
        <sphereGeometry args={[5, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Head - more defined and rounded */}
      <mesh position={[0, 5, 0]} scale={[1.1, 1, 1]}>
        <sphereGeometry args={[4.5, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Cheeks - make it cuter */}
      <mesh position={[-3, 4, 3]}>
        <sphereGeometry args={[1.5, 12, 12]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[3, 4, 3]}>
        <sphereGeometry args={[1.5, 12, 12]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Ears - larger and more prominent */}
      <mesh position={[-3, 8.5, 0]} rotation={[0.2, 0, -0.4]}>
        <coneGeometry args={[2, 3.5, 3]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[3, 8.5, 0]} rotation={[0.2, 0, 0.4]}>
        <coneGeometry args={[2, 3.5, 3]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Ear inner - pink */}
      <mesh position={[-3, 8.3, 1]} rotation={[0.2, 0, -0.4]}>
        <coneGeometry args={[1.2, 2.5, 3]} />
        <meshStandardMaterial color="#ffb6c1" />
      </mesh>
      <mesh position={[3, 8.3, 1]} rotation={[0.2, 0, 0.4]}>
        <coneGeometry args={[1.2, 2.5, 3]} />
        <meshStandardMaterial color="#ffb6c1" />
      </mesh>

      {/* Eyes - bigger and more expressive */}
      <mesh position={[-1.8, 5.8, 4]}>
        <sphereGeometry args={[0.6, 12, 12]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[1.8, 5.8, 4]}>
        <sphereGeometry args={[0.6, 12, 12]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Eye highlights for cuteness */}
      <mesh position={[-1.6, 6.1, 4.5]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[2, 6.1, 4.5]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Nose - more cat-like triangle */}
      <mesh position={[0, 4.5, 4.5]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.4, 0.5, 3]} />
        <meshStandardMaterial color="#ff9999" />
      </mesh>

      {/* Mouth - W shape for cat */}
      <mesh position={[-0.5, 3.5, 4.5]} rotation={[0, 0, 0.6]}>
        <capsuleGeometry args={[0.1, 0.8, 4, 4]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.5, 3.5, 4.5]} rotation={[0, 0, -0.6]}>
        <capsuleGeometry args={[0.1, 0.8, 4, 4]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Whiskers */}
      <mesh position={[-2, 5, 5]} rotation={[0, 0, -2]}>
        <capsuleGeometry args={[0.08, 3, 4, 4]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh position={[-2, 3.5, 5]} rotation={[0, 0, -1]}>
        <capsuleGeometry args={[0.08, 3, 4, 4]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh position={[3.5, 5, 5]} rotation={[0, 0, 2]}>
        <capsuleGeometry args={[0.08, 3, 4, 4]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh position={[3.5, 3.5, 5]} rotation={[0, 0, 1]}>
        <capsuleGeometry args={[0.08, 3, 4, 4]} />
        <meshStandardMaterial color="#444444" />
      </mesh>

      {/* Arms raised up - more defined */}
      <mesh position={[-5.5, 1, 1]} rotation={[0.3, 0, -0.9]}>
        <capsuleGeometry args={[1.2, 4.5, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[5.5, 1, 1]} rotation={[0.3, 0, 0.9]}>
        <capsuleGeometry args={[1.2, 4.5, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>


      {/* Hearts around the cat with pulsing animation */}
      {hearts.map((pos) => {
        const scale = 1.5 + Math.sin(time * 3 + pos.index) * 0.5
        return (
          <mesh
            key={pos.index}
            position={[pos.x, pos.y, 0]}
            geometry={heartGeometry}
            scale={scale}
            rotation={[Math.PI, 0, 0]}
          >
            <meshStandardMaterial color="#ff1744" />
          </mesh>
        )
      })}
    </group>
  )
}


function AnimatedText() {
  const text = "I LOVE YOU"
  const [time, setTime] = useState(0)

  // Create heart curve path for text to follow
  const heartCurve = useMemo(() => {
    const curve = new THREE.CurvePath<THREE.Vector3>()
    const scale = 2.5
    const x = 0, y = 0, z = 10

    // Create curves that follow the heart outline
    const curve1 = new THREE.CubicBezierCurve3(
      new THREE.Vector3((x + 5) * scale, (y + 5) * scale, z),
      new THREE.Vector3((x + 5) * scale, (y + 5) * scale, z),
      new THREE.Vector3((x + 4) * scale, y * scale, z),
      new THREE.Vector3(x * scale, y * scale, z)
    )

    const curve2 = new THREE.CubicBezierCurve3(
      new THREE.Vector3(x * scale, y * scale, z),
      new THREE.Vector3((x - 6) * scale, y * scale, z),
      new THREE.Vector3((x - 6) * scale, (y + 7) * scale, z),
      new THREE.Vector3((x - 6) * scale, (y + 7) * scale, z)
    )

    const curve3 = new THREE.CubicBezierCurve3(
      new THREE.Vector3((x - 6) * scale, (y + 7) * scale, z),
      new THREE.Vector3((x - 6) * scale, (y + 11) * scale, z),
      new THREE.Vector3((x - 3) * scale, (y + 15.4) * scale, z),
      new THREE.Vector3((x + 5) * scale, (y + 19) * scale, z)
    )

    const curve4 = new THREE.CubicBezierCurve3(
      new THREE.Vector3((x + 5) * scale, (y + 19) * scale, z),
      new THREE.Vector3((x + 13) * scale, (y + 15.4) * scale, z),
      new THREE.Vector3((x + 16) * scale, (y + 11) * scale, z),
      new THREE.Vector3((x + 16) * scale, (y + 7) * scale, z)
    )

    const curve5 = new THREE.CubicBezierCurve3(
      new THREE.Vector3((x + 16) * scale, (y + 7) * scale, z),
      new THREE.Vector3((x + 16) * scale, (y + 7) * scale, z),
      new THREE.Vector3((x + 16) * scale, y * scale, z),
      new THREE.Vector3((x + 10) * scale, y * scale, z)
    )

    const curve6 = new THREE.CubicBezierCurve3(
      new THREE.Vector3((x + 10) * scale, y * scale, z),
      new THREE.Vector3((x + 7) * scale, y * scale, z),
      new THREE.Vector3((x + 5) * scale, (y + 5) * scale, z),
      new THREE.Vector3((x + 5) * scale, (y + 5) * scale, z)
    )

    curve.add(curve1)
    curve.add(curve2)
    curve.add(curve3)
    curve.add(curve4)
    curve.add(curve5)
    curve.add(curve6)

    return curve
  }, [])

  useFrame((_state, delta) => {
    setTime(t => (t + delta * 0.05) % 1)
  })

  const numInstances = 20
  const offsetStep = 1 / numInstances

  return (
    <>
      {Array.from({ length: numInstances }).map((_, index) => {
        const offset = (time + index * offsetStep) % 1
        const point = heartCurve.getPointAt(offset)

        return (
          <group key={index} position={[point.x, -(point.y - 25), point.z]} rotation={[0, 0, 0]}>
            <Text
              fontSize={1}
              color="#ff1744"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              {text}
            </Text>
          </group>
        )
      })}
    </>
  )
}

export default function App() {
  return (
    <Canvas
      camera={{ position: [0, 0, 90], fov: 50 }}
    >
      <ambientLight intensity={0.7} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <directionalLight position={[-50, 10, 5]} intensity={0.8} />
      <AnimatedText />
      <CuteCat />
      <Text position={[15, 0, 0]} fontSize={2} color={"#ff1744"}>
        Happy Valentine's Day!
      </Text>
    </Canvas>
  )
}


