import { FC } from 'react'

interface Props {
  strokeWidth?: number
  sqSize?: number
  percent: number
}

const Circle = (props: Props) => {
  let { strokeWidth = 8, sqSize = 160, percent } = props;

  const radius = (sqSize - strokeWidth) / 2
  const viewBox = `0 0 ${sqSize} ${sqSize}`
  const dashArray = radius * Math.PI * 2
  const dashOffset = dashArray - (dashArray * (percent === 0 ? 30 : percent || 0)) / 100

  return (
    <svg className={`${percent === 0 && 'spin'}`} width={sqSize} height={sqSize} viewBox={viewBox}>
      <circle
        className="fill-none stroke-gray-200 dark:stroke-gray-800"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        className="fill-none stroke-gray-800 dark:stroke-gray-200 transition-all ease-in delay-200"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeLinecap="round"
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />
    </svg>
  )
}

export default Circle