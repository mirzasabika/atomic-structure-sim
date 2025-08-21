import { useEffect, useRef, useState } from "react";
import Therory from "./Therory";

const ELEMENTS = {
  H:  {name:"Hydrogen", Z:1, mass:1, e:1},
  He: {name:"Helium",   Z:2, mass:4, e:2},
  Li: {name:"Lithium",  Z:3, mass:7, e:3},
  C:  {name:"Carbon",   Z:6, mass:12, e:6},
  N:  {name:"Nitrogen", Z:7, mass:14, e:7},
  O:  {name:"Oxygen",   Z:8, mass:16, e:8},
  Ne: {name:"Neon",     Z:10, mass:20, e:10},
  Na: {name:"Sodium",   Z:11, mass:23, e:11},
  Mg: {name:"Magnesium",Z:12, mass:24, e:12},
  S:  {name:"Sulfur",   Z:16, mass:32, e:16},
  Cl: {name:"Chlorine", Z:17, mass:35, e:17},
  Ca: {name:"Calcium",  Z:20, mass:40, e:20}
};

function electronConfig(e) {
  const shells = [];
  let rem = e, n = 1;
  while (rem > 0) {
    const cap = 2 * n * n;
    shells.push(Math.min(rem, cap));
    rem -= cap;
    n++;
  }
  return shells;
}

export default function AtomSimulation() {
  const canvasRef = useRef(null);
  const [elementKey, setElementKey] = useState("H");
  const [running, setRunning] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  const el = ELEMENTS[elementKey];
  const protons = el.Z;
  const neutrons = el.mass - el.Z;
  const electrons = el.e;
  const shells = electronConfig(electrons);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, center, animationId;
    let angleOffset = 0;

    function resize() {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      center = { x: W / 2, y: H / 2 - 10 };
    }
    resize();
    window.addEventListener("resize", resize);

    function drawBackground() {
      const grd = ctx.createLinearGradient(0, 0, 0, H);
      grd.addColorStop(0, "rgba(2,6,23,0.85)");
      grd.addColorStop(1, "rgba(3,20,36,0.6)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
    }

    function drawNucleus() {
      const g = ctx.createRadialGradient(center.x, center.y, 6, center.x, center.y, 80);
      g.addColorStop(0, "#ff9aa2");
      g.addColorStop(0.35, "#ff6b6b");
      g.addColorStop(1, "rgba(225,29,72,0.06)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(center.x, center.y, 40, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px Inter, Arial";
      ctx.textAlign = "center";
      ctx.fillText(`${protons}p, ${neutrons}n`, center.x, center.y + 6);
    }

    function drawOrbit(r) {
      ctx.beginPath();
      ctx.arc(center.x, center.y, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(56,189,248,0.12)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    function drawElectrons() {
      const baseRadius = 70;
      const gap = 54;
      for (let s = 0; s < shells.length; s++) {
        const count = shells[s];
        const r = baseRadius + s * gap;

        if (showLabels) {
          ctx.fillStyle = "rgba(147,197,253,0.9)";
          ctx.font = "12px Inter, Arial";
          ctx.textAlign = "center";
          ctx.fillText(`${["K", "L", "M", "N", "O"][s] || "n=" + (s + 1)} shell`, center.x, center.y - r + 14);
        }

        for (let i = 0; i < count; i++) {
          const theta = angleOffset + i * (2 * Math.PI / count) + s * 0.16;
          const ex = center.x + r * Math.cos(theta);
          const ey = center.y + r * Math.sin(theta);

          const g = ctx.createRadialGradient(ex, ey, 1, ex, ey, 18);
          g.addColorStop(0, "rgba(34,197,94,0.98)");
          g.addColorStop(0.25, "rgba(34,197,94,0.28)");
          g.addColorStop(1, "rgba(34,197,94,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(ex, ey, 12, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(ex, ey, 5, 0, Math.PI * 2);
          ctx.fillStyle = "#10b981";
          ctx.fill();
        }
      }
    }

    function render() {
      drawBackground();
      drawNucleus();
      for (let s = 0; s < shells.length; s++) {
        const r = 70 + s * 54;
        drawOrbit(r);
      }
      drawElectrons();
    }

    function loop() {
      if (running) angleOffset += 0.009;
      render();
      animationId = requestAnimationFrame(loop);
    }

    loop();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [elementKey, running, showLabels]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
      {/* Left Theory */}
      <Therory/>

      {/* Right Simulation */}
      <div className="bg-slate-900 p-4 rounded-xl shadow-lg flex flex-col gap-4">
        <div className="lg:flex-row  flex flex-col justify-between items-center">
          <select
            className="bg-slate-800 text-sky-400 rounded px-2 py-1"
            value={elementKey}
            onChange={(e) => setElementKey(e.target.value)}
          >
            {Object.keys(ELEMENTS).map((k) => (
              <option key={k} value={k}>
                {ELEMENTS[k].name} ({ELEMENTS[k].Z})
              </option>
            ))}
          </select>
          <div className="flex gap-2 lg:mt-0 mt-5">
            <button
              className="bg-blue-600 px-3 py-1 rounded"
              onClick={() => setRunning(!running)}
            >
              {running ? "Pause Animation" : "Resume Animation"}
            </button>
            <button
              className="bg-slate-700 px-3 py-1 rounded"
              onClick={() => setShowLabels(!showLabels)}
            >
              {showLabels ? "Hide Labels" : "Show Labels"}
            </button>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-lg">
          <canvas ref={canvasRef} className="w-full h-[400px]" />
        </div>

        <div className="bg-slate-800 p-3 rounded-lg text-slate-300 text-sm">
          <div className="flex justify-between">
            <div>
              <div className="font-bold">{el.name}</div>
              <div className="text-xs">{elementKey}</div>
            </div>
            <div className="text-right">
              <div className="text-xs">Atomic No.</div>
              <div className="font-bold">{protons}</div>
            </div>
          </div>
          <hr className="border-slate-700 my-2" />
          <div>
            Protons: <b className="text-white">{protons}</b><br />
            Neutrons: <b className="text-white">{neutrons}</b><br />
            Electrons: <b className="text-white">{electrons}</b>
          </div>
          <div className="flex gap-4 mt-2">
            <div className="bg-slate-900 p-2 rounded">
              <div className="text-xs text-slate-400">Electron config</div>
              <div className="font-bold">{shells.join(", ")}</div>
            </div>
            <div className="bg-slate-900 p-2 rounded">
              <div className="text-xs text-slate-400">Shells</div>
              <div className="font-bold">
                {shells.map((c,i)=> `${["K","L","M","N","O"][i]}=${c}`).join(" • ")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
