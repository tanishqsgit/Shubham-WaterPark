import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  PerformanceMonitor,
  RoundedBox,
  Stars,
} from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { useParkStore } from "../../store/useParkStore";
import { attractions, park } from "../../data/attractions";

const waterVertex = `uniform float time; varying vec2 vUv; varying float wave; void main(){vUv=uv; vec3 p=position; wave=sin(p.x*2.8+time)*cos(p.y*3.2+time*.8); p.z+=wave*.065; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`;
const waterFragment = `uniform float time; varying vec2 vUv; varying float wave; void main(){vec2 p=vUv*28.; float c=pow(abs(sin(p.x+sin(p.y+time*.6))*sin(p.y+cos(p.x-time*.5))),12.); float edge=smoothstep(.47,.5,max(abs(vUv.x-.5),abs(vUv.y-.5))); vec3 color=mix(vec3(.02,.62,.78),vec3(.22,.88,.91),wave*.5+.5); color+=c*.25; color=mix(color,vec3(.8,1.,1.),edge*.65); gl_FragColor=vec4(color,1.);}`;
function Water({
  position,
  size,
}: {
  position: [number, number, number];
  size: [number, number];
}) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const reduced = useParkStore((s) => s.reduced);
  const uniforms = useMemo(() => ({ time: { value: 0 } }), []);
  useFrame((_, d) => {
    if (mat.current && !reduced)
      mat.current.uniforms.time.value += Math.min(d, 0.05);
  });
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[...size, 40, 40]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={waterVertex}
        fragmentShader={waterFragment}
      />
    </mesh>
  );
}
function Box({
  position,
  scale,
  color,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={scale} />
      <meshStandardMaterial color={color} roughness={0.65} />
    </mesh>
  );
}
function Palm({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale} rotation={[0, position[0], -0.08]}>
      <mesh position={[0, 1.25, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.2, 2.5, 7]} />
        <meshStandardMaterial color="#ba8055" />
      </mesh>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <group
          key={i}
          position={[0, 2.5, 0]}
          rotation={[0, (i * Math.PI) / 3.5, 0]}
        >
          <mesh
            rotation={[0, 0, -0.35]}
            position={[0.55, 0.03, 0]}
            scale={[1, 0.12, 0.38]}
            castShadow
          >
            <sphereGeometry args={[1, 5, 3]} />
            <meshStandardMaterial color={i % 2 ? "#279968" : "#55bc6e"} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 2.4, 0]}>
        <sphereGeometry args={[0.24, 6, 5]} />
        <meshStandardMaterial color="#91603d" />
      </mesh>
    </group>
  );
}
function Tube({
  position,
  color = "#ffd60a",
  scale = 1,
}: {
  position: [number, number, number];
  color?: string;
  scale?: number;
}) {
  return (
    <mesh
      position={position}
      rotation={[Math.PI / 2, 0, 0]}
      scale={scale}
      castShadow
    >
      <torusGeometry args={[0.45, 0.16, 8, 24]} />
      <meshStandardMaterial color={color} roughness={0.3} />
    </mesh>
  );
}
function Umbrella({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <group position={position}>
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 2, 6]} />
        <meshStandardMaterial color="#fff5d4" />
      </mesh>
      <mesh position={[0, 2, 0]}>
        <coneGeometry args={[1, 0.45, 8]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 1.8, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[1, 0.1, 8]} />
        <meshStandardMaterial color="#fff6d6" />
      </mesh>
    </group>
  );
}
function Slide({
  points,
  color,
  enclosed = false,
  ride = false,
}: {
  points: number[][];
  color: string;
  enclosed?: boolean;
  ride?: boolean;
}) {
  const path = useMemo(
    () =>
      new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))),
    [points],
  );
  const rider = useRef<THREE.Mesh>(null);
  const reduced = useParkStore((s) => s.reduced);
  useFrame(({ clock }) => {
    if (rider.current && !reduced)
      rider.current.position
        .copy(path.getPoint((clock.elapsedTime * 0.18) % 1))
        .add(new THREE.Vector3(0, 0.16, 0));
  });
  return (
    <>
      <mesh castShadow>
        <tubeGeometry args={[path, 60, 0.33, 10, false]} />
        <meshStandardMaterial color={color} roughness={0.32} />
      </mesh>
      {!enclosed && (
        <mesh position={[0, 0.09, 0]}>
          <tubeGeometry args={[path, 60, 0.235, 8, false]} />
          <meshStandardMaterial color="#c7faff" roughness={0.23} />
        </mesh>
      )}
      {ride && (
        <mesh ref={rider}>
          <sphereGeometry args={[0.19, 10, 10]} />
          <meshStandardMaterial color="#ffe7a9" />
        </mesh>
      )}
    </>
  );
}
function Tower({
  height = 4,
  color = "#ffb92c",
}: {
  height?: number;
  color?: string;
}) {
  return (
    <group>
      {[-0.65, 0.65].flatMap((x) =>
        [-0.65, 0.65].map((z) => (
          <Box
            key={`${x}${z}`}
            position={[x, height / 2, z]}
            scale={[0.13, height, 0.13]}
            color="#e7f5ed"
          />
        )),
      )}
      <Box position={[0, height, 0]} scale={[1.8, 0.25, 1.8]} color={color} />
      <mesh position={[0, height + 1.2, 0]} castShadow>
        <coneGeometry args={[1.35, 0.8, 4]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {Array.from({ length: 8 }, (_, i) => (
        <Box
          key={i}
          position={[0.8, (i * height) / 8, 0.9]}
          scale={[0.6, 0.08, 0.2]}
          color="#f8e1b4"
        />
      ))}
    </group>
  );
}
function Spray({ rain = false }: { rain?: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const quality = useParkStore((s) => s.quality),
    reduced = useParkStore((s) => s.reduced);
  const count = quality === "low" ? 35 : 100;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useEffect(() => {
    if (!ref.current) return;
    for (let i = 0; i < count; i++) {
      ref.current.setColorAt(
        i,
        new THREE.Color(
          rain ? ["#a8f4ff", "#f7b9ec", "#fff4ae"][i % 3] : "#d2ffff",
        ),
      );
    }
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
  }, [count, rain]);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    for (let i = 0; i < count; i++) {
      const t = reduced ? 0 : clock.elapsedTime;
      dummy.position.set(
        Math.sin(i * 23) * 2,
        rain ? 3 - ((i * 0.17 + t * 2) % 3) : (i * 0.11 + t * 0.65) % 2.5,
        Math.cos(i * 41) * 1.5,
      );
      dummy.scale.setScalar(0.022 + (i % 3) * 0.012);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#d2ffff" transparent opacity={0.65} />
    </instancedMesh>
  );
}
function Vortex() {
  const ref = useRef<THREE.Group>(null);
  const reduced = useParkStore((s) => s.reduced);
  useFrame((_, delta) => {
    if (ref.current && !reduced) ref.current.rotation.z -= delta * 0.65;
  });
  return (
    <group ref={ref} position={[1.5, 0.7, -1.5]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[0, 0, i * 2]} scale={1 - i * 0.18}>
          <ringGeometry args={[0.45, 0.61, 40, 1, 0, Math.PI * 1.7]} />
          <meshBasicMaterial
            color={["#b29bff", "#7ecbff", "#efb6ff"][i]}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
function Attraction({ index }: { index: number }) {
  const data = attractions[index],
    ride = useParkStore((s) => s.ride),
    reduced = useParkStore((s) => s.reduced);
  const [hover, setHover] = useState(false);
  const bucket = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (bucket.current && !reduced)
      bucket.current.rotation.z =
        Math.max(0, Math.sin(clock.elapsedTime * 0.7)) * 0.95;
  });
  const common = {
    onPointerOver: () => {
      setHover(true);
      document.body.style.cursor = "pointer";
    },
    onPointerOut: () => {
      setHover(false);
      document.body.style.cursor = "";
    },
    onClick: () =>
      document
        .getElementById(data.id)
        ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }),
  };
  useEffect(
    () => () => {
      document.body.style.cursor = "";
    },
    [],
  );
  return (
    <group position={data.position as [number, number, number]} {...common}>
      {hover && (
        <pointLight
          color={data.color}
          intensity={8}
          position={[0, 3, 0]}
          distance={7}
        />
      )}
      {index === 0 && (
        <>
          <Tower height={5.5} color="#f16a57" />
          <Slide
            color="#ff7955"
            ride={ride}
            points={[
              [0, 5.6, 0],
              [0.3, 4.8, 1.3],
              [0.2, 1.5, 3.5],
              [-1, 0.7, 4.5],
              [-2, 1.9, 3],
              [-1, 2.3, 2],
            ]}
          />
        </>
      )}
      {index === 1 && (
        <>
          <Tower height={3.4} />
          <group position={[2, 0, 0]}>
            <Tower height={2.7} color="#1fb2d6" />
          </group>
          <Box position={[1, 2.8, 0]} scale={[2, 0.18, 0.8]} color="#ffcd47" />
          <Slide
            ride={ride}
            color="#ffd236"
            points={[
              [0, 3.5, 0],
              [-1, 3, 1],
              [-1.8, 2.4, 0],
              [-2.1, 1.4, 2],
              [-1, 0.5, 3],
            ]}
          />
          <Slide
            color="#f577b6"
            points={[
              [2, 2.9, 0],
              [3, 2.4, 1],
              [2.5, 1.8, 2],
              [3, 0.5, 3],
            ]}
          />
          <group ref={bucket} position={[0, 4.3, 0]}>
            <mesh>
              <cylinderGeometry args={[0.6, 0.4, 0.75, 10]} />
              <meshStandardMaterial color="#fd744d" />
            </mesh>
          </group>
          <Spray />
        </>
      )}
      {index === 2 && (
        <>
          <Tower height={4.2} color="#159bb8" />
          {["#ffcf22", "#fc785d", "#42cddd"].map((c, i) => (
            <group key={c} position={[(i - 1) * 0.8, 0, 0]}>
              <Slide
                color={c}
                ride={true}
                points={[
                  [0, 4.3, 0],
                  [0, 3.5, 1],
                  [0, 2.5, 2.1],
                  [0, 2.2, 3.4],
                  [0, 1.1, 4.6],
                  [0, 0.5, 5.6],
                ]}
              />
            </group>
          ))}
          <Box position={[0, 1.5, 5.8]} scale={[2.8, 0.35, 0.2]} color="#fff" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <Box
              key={i}
              position={[-1.2 + i * 0.4, 1.5, 5.68]}
              scale={[0.2, 0.35, 0.02]}
              color="#073c57"
            />
          ))}
        </>
      )}
      {index === 3 && (
        <>
          <Tower height={3.4} color="#91cf4c" />
          <Slide
            color="#a1d940"
            ride={ride}
            points={[
              [0, 3.4, 0],
              [1, 3, 1],
              [1.5, 2, 2],
              [0, 1.2, 2.8],
              [0, 0.5, 3.8],
            ]}
          />
          {[-1.2, 1.2].map((x, i) => (
            <group key={x} position={[x, 0.8, 1]}>
              <mesh>
                <cylinderGeometry args={[0.45, 0.45, 1.2, 12]} />
                <meshStandardMaterial
                  color={i ? "#ac7ce5" : "#76db80"}
                  transparent
                  opacity={0.8}
                />
              </mesh>
              <Float
                speed={reduced ? 0 : 2}
                floatIntensity={reduced ? 0 : 1}
                rotationIntensity={reduced ? 0 : 1}
              >
                <mesh position={[0, 0.8, 0]}>
                  <sphereGeometry args={[0.18, 8, 8]} />
                  <meshStandardMaterial color="#f0ffd6" />
                </mesh>
              </Float>
            </group>
          ))}
        </>
      )}
      {index === 4 && (
        <>
          <Tower height={4.8} color="#8971da" />
          <Slide
            enclosed
            color="#44346e"
            ride={ride}
            points={Array.from({ length: 19 }, (_, i) => [
              Math.cos(i * 0.6) * 1.5,
              4.8 - i * 0.23,
              Math.sin(i * 0.6) * 1.5,
            ])}
          />
          <Vortex />
        </>
      )}
      {index === 5 && (
        <>
          <Tower height={8} color="#f2a541" />
          <Slide
            color="#10b9b7"
            ride={ride}
            points={[
              [0, 8, 0],
              [0, 7.8, 1],
              [0, 4, 2.3],
              [0, 1, 4],
              [0, 0.5, 5.5],
            ]}
          />
        </>
      )}
      {index === 6 && (
        <>
          <RoundedBox args={[7, 0.3, 5]} radius={0.08} position={[0, 0.05, 0]}>
            <meshStandardMaterial color="#fff6d9" />
          </RoundedBox>
          <Water position={[0, 0.25, 0]} size={[6.7, 4.7]} />
          <Float
            speed={reduced ? 0 : 1}
            floatIntensity={reduced ? 0 : 0.15}
            rotationIntensity={reduced ? 0 : 0.2}
          >
            <Tube position={[-1, 0.42, 0]} />
            <Tube position={[1, 0.42, 1]} color="#ff7d86" />
          </Float>
        </>
      )}
      {index === 7 && (
        <>
          <Box position={[0, 0.08, 0]} scale={[3, 0.2, 3]} color="#8edce7" />
          <Water position={[0, 0.21, 0]} size={[2.9, 2.9]} />
          <Umbrella position={[0, 0.2, 0]} color="#ff8ca5" />
          <Spray rain />
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              position={[-1.8, 0.1 + i * 0.13, i * 0.5]}
              scale={[0.6, 0.2, 0.4]}
              color="#fef7da"
            />
          ))}
        </>
      )}
    </group>
  );
}
const curve = new THREE.CatmullRomCurve3(
  [
    [20, 17, 25],
    [12, 11, 18],
    [1, 8, 12],
    [6, 7, 11],
    [12, 8, 9],
    [-1, 7, 11],
    [11, 6, 10],
    [5, 13, 14],
    [2, 7, 13],
    [10, 7, 14],
    [18, 15, 23],
    [20, 17, 25],
  ].map((p) => new THREE.Vector3(...p)),
);
function CameraRig() {
  const target = useMemo(() => new THREE.Vector3(), []);
  const destination = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera, pointer, size }, delta) => {
    const state = useParkStore.getState(),
      p = state.reduced ? 0 : state.progress;
    const pos = curve.getPointAt(Math.min(0.999, p));
    const intro = state.section < 2,
      mobile = size.width < 768;
    pos.x += intro ? (mobile ? 0 : -1) : 0;
    pos.z += mobile ? 12 : 0;
    if (!state.reduced) {
      pos.x += pointer.x * 0.35;
      pos.y += pointer.y * 0.2;
    }
    camera.position.lerp(pos, 1 - Math.exp(-delta * 3));
    if (intro) destination.set(mobile ? -1 : -8, mobile ? 8 : 1.5, 0);
    else {
      const a = attractions[Math.min(7, Math.max(0, state.section - 2))];
      destination.set(
        a.position[0] - (mobile ? 0 : 3.2),
        mobile ? 8 : 1.5,
        a.position[2],
      );
    }
    target.lerp(destination, 1 - Math.exp(-delta * 3));
    camera.lookAt(target);
    const perspective = camera as THREE.PerspectiveCamera;
    const desired =
      state.section === 7 && !state.reduced
        ? 43 + Math.sin(p * Math.PI) * 10
        : 40;
    perspective.fov = THREE.MathUtils.lerp(perspective.fov, desired, 0.03);
    perspective.updateProjectionMatrix();
  });
  return null;
}
function World() {
  const quality = useParkStore((s) => s.quality),
    section = useParkStore((s) => s.section),
    reduced = useParkStore((s) => s.reduced);
  const dark = section === 6;
  const sky = useMemo(() => {
    const pixels = new Uint8Array(64 * 4);
    const top = new THREE.Color(dark ? "#14162f" : "#cceff3"),
      bottom = new THREE.Color(dark ? "#28284e" : "#f1f9ed");
    for (let i = 0; i < 64; i++) {
      const color = bottom.clone().lerp(top, i / 63);
      pixels[i * 4] = Math.round(color.r * 255);
      pixels[i * 4 + 1] = Math.round(color.g * 255);
      pixels[i * 4 + 2] = Math.round(color.b * 255);
      pixels[i * 4 + 3] = 255;
    }
    const texture = new THREE.DataTexture(pixels, 1, 64);
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
  }, [dark]);
  useEffect(() => () => sky.dispose(), [sky]);
  useEffect(() => {
    useParkStore.getState().set({ loading: false });
  }, []);
  return (
    <>
      <primitive attach="background" object={sky} />
      <fog attach="fog" args={[dark ? "#161c3d" : "#e1f5f4", 35, 85]} />
      <hemisphereLight args={["#e9ffff", "#8ccbb0", dark ? 0.65 : 2.3]} />
      <directionalLight
        position={[-8, 18, 12]}
        intensity={dark ? 0.7 : 3.2}
        color={dark ? "#a9a3ff" : "#fff0cf"}
        castShadow={quality === "high"}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
        shadow-bias={-0.001}
      />
      <CameraRig />
      <PerformanceMonitor
        onDecline={() => useParkStore.getState().set({ quality: "low" })}
      />
      <group position={[0, -0.6, 0]}>
        <RoundedBox
          args={[22, 1, 19]}
          radius={0.15}
          smoothness={3}
          receiveShadow
        >
          <meshStandardMaterial color="#f3e9ce" />
        </RoundedBox>
        <RoundedBox
          args={[22, 0.18, 19]}
          position={[0, 0.5, 0]}
          radius={0.04}
          smoothness={3}
          receiveShadow
        >
          <meshStandardMaterial color="#f6f0d8" />
        </RoundedBox>
      </group>
      <RoundedBox args={[14, 0.12, 7]} radius={0.04} position={[0, 0.1, 1]}>
        <meshStandardMaterial color="#7acfd2" />
      </RoundedBox>
      <Water position={[0, 0.19, 1]} size={[13.8, 6.8]} />
      {attractions.map((a, i) => (
        <Attraction key={a.id} index={i} />
      ))}
      {[
        [-9, 0, 6],
        [-9, 0, -6],
        [9, 0, -7],
        [9, 0, 6],
        [-7, 0, 7],
        [2, 0, 8],
        [-1, 0, -8],
      ].map((p, i) => (
        <Palm
          key={i}
          position={p as [number, number, number]}
          scale={i % 2 ? 1 : 0.85}
        />
      ))}
      {[
        [-4, 0, 7],
        [0, 0, 7],
        [8, 0, 6],
        [-9, 0, 1],
      ].map((p, i) => (
        <group key={i}>
          <Umbrella
            position={p as [number, number, number]}
            color={i % 2 ? "#f77678" : "#ffce3b"}
          />
          <Box
            position={[p[0] + 0.9, 0.25, p[2] + 0.2]}
            scale={[0.6, 0.15, 1.5]}
            color="#fffaf0"
          />
        </group>
      ))}
      {[-3, 0, 3].map((x, i) => (
        <Float
          key={x}
          speed={reduced ? 0 : 1.2}
          floatIntensity={reduced ? 0 : 0.15}
          rotationIntensity={reduced ? 0 : 0.2}
        >
          <Tube
            position={[x, 0.4, 1.2]}
            color={["#ffcd26", "#fb837c", "#aa93ed"][i]}
          />
        </Float>
      ))}
      <mesh position={[-12, -1.2, -14]}>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshBasicMaterial color="#ffe29b" />
      </mesh>
      {[
        [-14, 10, -12],
        [7, 12, -14],
        [14, 8, 2],
      ].map((p, i) => (
        <group key={i} position={p as [number, number, number]}>
          {[0, 1, 2].map((j) => (
            <mesh
              key={j}
              position={[j * 1.2, Math.sin(j) * 0.5, 0]}
              scale={[1.8, 0.7, 0.9]}
            >
              <sphereGeometry args={[1, 12, 8]} />
              <meshStandardMaterial color="#fffdf3" flatShading />
            </mesh>
          ))}
        </group>
      ))}
      {dark && (
        <Stars
          radius={35}
          depth={10}
          count={quality === "high" ? 700 : 150}
          factor={2}
          fade
          speed={reduced ? 0 : 1}
        />
      )}
      {quality === "high" && !reduced && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.18} luminanceThreshold={1.2} />
          <DepthOfField
            focusDistance={0.025}
            focalLength={0.15}
            bokehScale={0.12}
            height={360}
          />
          <Vignette eskil={false} offset={0.2} darkness={0.12} />
        </EffectComposer>
      )}
    </>
  );
}
function hasWebGL() {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}
export default function ParkWorld() {
  const quality = useParkStore((s) => s.quality);
  const [webgl] = useState(hasWebGL);
  useEffect(() => {
    if (!webgl) useParkStore.getState().set({ loading: false });
  }, [webgl]);
  return (
    <div
      className="world"
      aria-label="Interactive illustrated three-dimensional water park"
    >
      {webgl ? (
        <Canvas
          shadows={quality === "high"}
          dpr={quality === "high" ? [1, 1.6] : [1, 1]}
          camera={{ position: [20, 17, 25], fov: 40, near: 0.1, far: 120 }}
          gl={{
            antialias: quality === "high",
            powerPreference: "high-performance",
          }}
          fallback={<p className="webgl-fallback">{park.ui.fallback}</p>}
        >
          <Suspense fallback={null}>
            <World />
          </Suspense>
        </Canvas>
      ) : (
        <p className="webgl-fallback">{park.ui.fallback}</p>
      )}
    </div>
  );
}
