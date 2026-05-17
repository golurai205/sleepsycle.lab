import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Moon,
  Sun,
  Waves,
  Wind,
  Headphones,
  Play,
  Pause,
  Menu,
  X,
} from 'lucide-react'

import './index.css'

type Mode = 'wake' | 'sleep'

function addMinutes(time: string, minutes: number) {
  const [hours, mins] = time.split(':').map(Number)

  const date = new Date()
  date.setHours(hours, mins, 0, 0)
  date.setMinutes(date.getMinutes() + minutes)

  return date
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })
}

function App() {
  const [dark, setDark] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mode, setMode] = useState<Mode>('wake')
  const [targetTime, setTargetTime] = useState('07:00')
  const [soundPlaying, setSoundPlaying] = useState('Rain')

  const sleepResults = useMemo(() => {
    const cycles = [4, 5, 6]

    return cycles.map((cycle) => {
      const travel = cycle * 90 + 15

      const result =
        mode === 'wake'
          ? addMinutes(targetTime, -travel)
          : addMinutes(targetTime, travel)

      return {
        cycle,
        time: formatTime(result),
      }
    })
  }, [mode, targetTime])

  const appTheme = dark ? 'dark' : 'light'

  return (
    <div className={appTheme}>
      <div className="min-h-screen bg-slate-100 text-slate-900 transition-all dark:bg-slate-950 dark:text-white">
        {/* HEADER */}

        <header className="sticky top-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur dark:bg-slate-900/70">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <Moon className="h-8 w-8 text-cyan-400" />

              <div>
                <h1 className="text-xl font-bold">
                  Sleep Cycle Labs
                </h1>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  AI Sleep Optimizer
                </p>
              </div>
            </div>

            <div className="hidden gap-4 md:flex">
              <a href="#calculator">Calculator</a>
              <a href="#sounds">Sounds</a>
              <a href="#about">About</a>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDark(!dark)}
                className="rounded-full bg-white px-4 py-2 text-black dark:bg-slate-800 dark:text-white"
              >
                {dark ? <Sun /> : <Moon />}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden"
              >
                {mobileOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 pb-4 md:hidden"
              >
                <div className="flex flex-col gap-3">
                  <a href="#calculator">Calculator</a>
                  <a href="#sounds">Sounds</a>
                  <a href="#about">About</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* HERO */}

        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-block rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-400">
              AI Sleep Calculator
            </p>

            <h2 className="text-5xl font-bold leading-tight">
              Wake Up
              <span className="text-cyan-400">
                {' '}
                Refreshed
              </span>
            </h2>

            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
              Calculate the perfect bedtime and wake-up time
              using 90-minute sleep cycles.
            </p>

            <a
              href="#calculator"
              className="mt-8 inline-block rounded-full bg-cyan-400 px-6 py-4 font-semibold text-black"
            >
              Start Calculating
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-slate-900 p-8 text-white"
          >
            <h3 className="text-2xl font-bold">
              Tonight's Best Sleep
            </h3>

            <p className="mt-6 text-5xl font-bold text-cyan-300">
              10:15 PM
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-slate-400">
                  Cycles
                </p>

                <p className="mt-2 text-3xl font-bold">
                  6
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-slate-400">
                  Quality
                </p>

                <p className="mt-2 text-3xl font-bold">
                  94%
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-slate-400">
                  Energy
                </p>

                <p className="mt-2 text-3xl font-bold">
                  High
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CALCULATOR */}

        <section
          id="calculator"
          className="mx-auto max-w-7xl px-4 py-16"
        >
          <h2 className="text-4xl font-bold">
            Sleep Calculator
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMode('wake')}
                  className={`rounded-2xl px-4 py-4 font-semibold ${
                    mode === 'wake'
                      ? 'bg-cyan-400 text-black'
                      : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                >
                  Wake Up At
                </button>

                <button
                  onClick={() => setMode('sleep')}
                  className={`rounded-2xl px-4 py-4 font-semibold ${
                    mode === 'sleep'
                      ? 'bg-cyan-400 text-black'
                      : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                >
                  Sleep At
                </button>
              </div>

              <input
                type="time"
                value={targetTime}
                onChange={(e) => setTargetTime(e.target.value)}
                className="mt-6 w-full rounded-2xl border border-slate-300 bg-transparent px-4 py-4 text-3xl font-bold outline-none"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {sleepResults.map((result) => (
                <motion.div
                  whileHover={{ y: -5 }}
                  key={result.cycle}
                  className="rounded-3xl bg-slate-900 p-6 text-white"
                >
                  <p className="text-sm text-slate-400">
                    {mode === 'wake'
                      ? 'Go to bed'
                      : 'Wake up'}
                  </p>

                  <h3 className="mt-4 text-4xl font-bold text-cyan-300">
                    {result.time}
                  </h3>

                  <p className="mt-6 text-lg">
                    {result.cycle} Cycles
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SOUNDS */}

        <section
          id="sounds"
          className="mx-auto max-w-7xl px-4 py-16"
        >
          <h2 className="text-4xl font-bold">
            Sleep Sounds
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {[
              {
                name: 'Rain',
                Icon: Waves,
                text: 'Gentle rainfall',
              },
              {
                name: 'Ocean',
                Icon: Waves,
                text: 'Ocean ambience',
              },
              {
                name: 'Forest',
                Icon: Wind,
                text: 'Forest breeze',
              },
              {
                name: 'White Noise',
                Icon: Headphones,
                text: 'Focus masking',
              },
              {
                name: 'Fan',
                Icon: Wind,
                text: 'Bedroom fan sound',
              },
            ].map(({ name, Icon, text }) => (
              <motion.button
                whileHover={{ y: -6 }}
                key={name}
                onClick={() => setSoundPlaying(name)}
                className={`rounded-3xl border p-6 text-left ${
                  soundPlaying === name
                    ? 'border-cyan-400 bg-cyan-400/10'
                    : 'border-slate-300 bg-white dark:border-white/10 dark:bg-slate-900'
                }`}
              >
                <div className="mb-8 flex items-center justify-between">
                  <Icon className="h-8 w-8 text-cyan-400" />

                  {soundPlaying === name ? (
                    <Pause />
                  ) : (
                    <Play />
                  )}
                </div>

                <h3 className="text-2xl font-bold">
                  {name}
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {text}
                </p>
              </motion.button>
            ))}
          </div>
        </section>

        {/* ABOUT */}

        <section
          id="about"
          className="mx-auto max-w-7xl px-4 py-16"
        >
          <div className="rounded-3xl bg-slate-900 p-10 text-white">
            <h2 className="text-4xl font-bold">
              Why Sleep Cycles Matter
            </h2>

            <p className="mt-6 max-w-3xl text-lg text-slate-300">
              Sleep happens in repeating 90-minute cycles.
              Waking up between cycles helps reduce grogginess
              and improves energy, mood, and productivity.
            </p>
          </div>
        </section>

        {/* FOOTER */}

        <footer className="border-t border-white/10 px-4 py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3">
              <Moon className="text-cyan-400" />

              <div>
                <p className="font-bold">
                  Sleep Cycle Labs
                </p>

                <p className="text-sm text-slate-500">
                  Better sleep starts tonight.
                </p>
              </div>
            </div>

            <div className="flex gap-4 text-sm text-slate-500">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Contact</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
