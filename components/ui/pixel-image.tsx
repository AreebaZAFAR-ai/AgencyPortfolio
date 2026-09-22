"use client"

import { useEffect, useMemo, useState } from "react"

import { cn } from "@/lib/utils"

type Grid = {
  rows: number
  cols: number
}

const DEFAULT_GRIDS: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
}

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS

interface PixelImageProps {
  src: string
  grid?: PredefinedGridKey
  customGrid?: Grid
  grayscaleAnimation?: boolean
  pixelFadeInDuration?: number // in ms
  maxAnimationDelay?: number // in ms
  colorRevealDelay?: number // in ms
  className?: string
  imageClassName?: string
  loop?: boolean
  loopHoldDuration?: number // in ms, how long to stay fully revealed before hiding again
  loopHiddenDuration?: number // in ms, how long to stay hidden before revealing again
}

export const PixelImage = ({
  src,
  grid = "6x4",
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  customGrid,
  className,
  imageClassName,
  loop = false,
  loopHoldDuration = 2500,
  loopHiddenDuration = 400,
}: PixelImageProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showColor, setShowColor] = useState(false)

  const MIN_GRID = 1
  const MAX_GRID = 16

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (grid?: Grid) => {
      if (!grid) return false
      const { rows, cols } = grid
      return (
        Number.isInteger(rows) &&
        Number.isInteger(cols) &&
        rows >= MIN_GRID &&
        cols >= MIN_GRID &&
        rows <= MAX_GRID &&
        cols <= MAX_GRID
      )
    }

    return isValidGrid(customGrid) ? customGrid! : DEFAULT_GRIDS[grid]
  }, [customGrid, grid])

  useEffect(() => {
    let cancelled = false
    let frame: number
    const timers: number[] = []

    const runCycle = () => {
      frame = requestAnimationFrame(() => {
        if (!cancelled) setIsVisible(true)
      })

      timers.push(
        window.setTimeout(() => {
          if (!cancelled) setShowColor(true)
        }, colorRevealDelay)
      )

      if (loop) {
        const revealCompleteAt = Math.max(
          maxAnimationDelay + pixelFadeInDuration,
          colorRevealDelay
        )

        timers.push(
          window.setTimeout(() => {
            if (cancelled) return
            setShowColor(false)
            setIsVisible(false)

            timers.push(
              window.setTimeout(() => {
                if (!cancelled) runCycle()
              }, loopHiddenDuration)
            )
          }, revealCompleteAt + loopHoldDuration)
        )
      }
    }

    runCycle()

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [
    colorRevealDelay,
    loop,
    loopHoldDuration,
    loopHiddenDuration,
    maxAnimationDelay,
    pixelFadeInDuration,
  ])

  const pieces = useMemo(() => {
    const total = rows * cols
    // Deterministic pseudo-random seed per tile index, so the stagger looks
    // organic without calling Math.random() during render.
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 12.9898) * 43758.5453
      return x - Math.floor(x)
    }

    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols

      const clipPath = `polygon(
        ${col * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${(row + 1) * (100 / rows)}%,
        ${col * (100 / cols)}% ${(row + 1) * (100 / rows)}%
      )`

      const delay = seededRandom(index) * maxAnimationDelay
      return {
        clipPath,
        delay,
      }
    })
  }, [rows, cols, maxAnimationDelay])

  return (
    <div className={cn("relative h-72 w-72 select-none md:h-96 md:w-96", className)}>
      {pieces.map((piece, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all ease-out",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: `${piece.delay}ms`,
            transitionDuration: `${pixelFadeInDuration}ms`,
          }}
        >
          <img
            src={src}
            alt={`Pixel image piece ${index + 1}`}
            className={cn(
              "z-1 h-full w-full rounded-[2.5rem] object-cover",
              grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale"),
              imageClassName
            )}
            style={{
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  )
}
