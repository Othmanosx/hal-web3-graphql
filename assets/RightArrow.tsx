import React from "react"

type Props = {
  disabled: boolean
  onClick: () => void
}

const RightArrow = ({ disabled, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path
          fill="rgb(33, 114, 229)"
          d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
        />
      </svg>
    </div>
  )
}

export default RightArrow
