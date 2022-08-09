import React from "react"

type Props = {
  disabled: boolean
  onClick: () => void
}

const LeftArrow = ({ disabled, onClick }: Props) => {
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
          d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
        />
      </svg>
    </div>
  )
}

export default LeftArrow
