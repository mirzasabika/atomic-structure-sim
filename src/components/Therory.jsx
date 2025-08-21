import React from 'react'

function Therory() {
  return (
   <div className="space-y-6">
          <div className="bg-[#0f172a]/50 rounded-xl p-5 shadow-lg border border-white/5">
            <h2 className="text-blue-400 text-xl font-semibold mb-2">Theory — Quick Notes</h2>
            <p className="text-md text-gray-400 mb-3">
              Atoms have a nucleus (protons + neutrons) and electrons in shells (K, L, M...). Maximum electrons in shell n = <b>2n²</b>.
            </p>
            <ul className="text-gray-400 space-y-1 text-md list-disc pl-8">
              <li><b>Protons (+)</b>: determine atomic number.</li>
              <li><b>Neutrons (0)</b>: contribute to mass.</li>
              <li><b>Electrons (−)</b>: arranged in shells; chemical behavior depends on outer shells.</li>
            </ul>
          </div>

          <div className="bg-[#0f172a]/50 rounded-xl p-5 shadow-lg border border-white/5">
            <h2 className="text-blue-400 text-lg font-semibold mb-2">Atomic Models Timeline</h2>
            <ul className="text-gray-400 text-md space-y-1 list-disc pl-8">
              <li><b>Dalton (1803):</b> Atoms are indivisible solid spheres.</li>
              <li><b>Thomson (1897):</b> “Plum pudding” model with electrons.</li>
              <li><b>Rutherford (1911):</b> Nucleus at center, electrons orbit.</li>
              <li><b>Bohr (1913):</b> Electrons move in fixed shells.</li>
            </ul>
          </div>

          <div className="bg-[#0f172a]/50 rounded-xl p-5 shadow-lg border border-white/5">
            <h2 className="text-blue-400 text-lg font-semibold mb-2">Key Rules</h2>
            <ul className="text-gray-400 text-md space-y-1 list-decimal pl-8">
              <li><b>2n² Rule:</b> Maximum electrons in shell <i>n</i> = 2n².</li>
              <li><b>Octet Rule:</b> Atoms are stable when outer shell has 8 electrons.</li>
              <li><b>K shell:</b> max 2, <b>L shell:</b> max 8, <b>M shell:</b> max 18.</li>
            </ul>
          </div>

          <div className="bg-[#0f172a]/50 rounded-xl p-5 shadow-lg border border-white/5">
            <h2 className="text-blue-400 text-lg font-semibold mb-2">Applications in Chemistry</h2>
            <p className="text-sm text-gray-400">
              <b>Sodium (Na):</b> 1 electron in outer shell → very reactive.<br />
              <b>Neon (Ne):</b> Full outer shell → inert.<br />
              <b>Chlorine (Cl):</b> 7 electrons in outer shell → gains 1 to complete octet.
            </p>
          </div>
        </div>
  )
}

export default Therory