"use client"

import type React from "react"

interface InstrumentSelectorProps {
  instruments: string[]
  selectedInstruments: string[]
  toggleInstrument: (instrument: string) => void
}

const InstrumentSelector: React.FC<InstrumentSelectorProps> = ({
  instruments,
  selectedInstruments,
  toggleInstrument,
}) => {
  return (
    <div>
      <label className="block mb-1 font-medium">募集楽器パート</label>
      <div className="flex flex-wrap gap-2">
        {instruments.map((instrument) => (
          <label key={instrument} className="inline-flex items-center mr-4 mb-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={selectedInstruments.includes(instrument)}
              onChange={() => toggleInstrument(instrument)}
            />
            <span className="ml-2">{instrument}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default InstrumentSelector

