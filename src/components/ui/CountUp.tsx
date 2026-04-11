"use client";

import ReactCountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface CountUpProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

export function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
  decimals = 0,
}: CountUpProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <span ref={ref} className={className}>
      {inView ? (
        <ReactCountUp
          start={0}
          end={end}
          duration={duration}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          useEasing
        />
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  );
}
