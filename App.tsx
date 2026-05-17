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
function App() {
  const [dark, setDark] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mode, setMode] = useState<Mode>('wake')
  const [targetTime, setTargetTime] = useState('07:00')
  const [napStart, setNapStart] = useState('14:00')
  const [averageSleep, setAverageSleep] = useState(6.25)
  const [desiredSleep, setDesiredSleep] = useState(8)
  const [bedtime, setBedtime] = useState('22:45')
  const [wakeTime, setWakeTime] = useState('06:45')
  const [goal, setGoal] = useState(8)
  const [water, setWater] = useState(5)
  const [coachInput, setCoachInput] = useState('I wake up tired')
  const [soundPlaying, setSoundPlaying] = useState('Rain')
  const [showPremium, setShowPremium] = useState(false)
  const [reminderEnabled, setReminderEnabled] = useState(false)
  const [meditationSeconds, setMeditationSeconds] = useState(300)
  const [authOpen, setAuthOpen] = useState(false)

  const sleepResults = useMemo(() => {
    return cycles.map((cycle) => {
      const travel = cycle.count * 90 + 15
      const date = addMinutes(targetTime, mode === 'wake' ? -travel : travel)
      return { ...cycle, time: formatTime(date), minutes: travel }
    })
  }, [mode, targetTime])

  const napResults = useMemo(
    () => [
      { name: 'Power Nap', duration: 20, benefit: 'Fast alertness boost' },
      { name: 'Recovery Nap', duration: 90, benefit: 'One full sleep cycle' },
      { name: 'Full Cycle Nap', duration: 110, benefit: 'Includes wind-down buffer' },
    ].map((nap) => ({ ...nap, wake: formatTime(addMinutes(napStart, nap.duration)) })),
    [napStart],
  )

  const weeklyDebt = Math.max(0, (desiredSleep - averageSleep) * 7)
  const totalSleep = Number((minutesBetween(bedtime, wakeTime) / 60).toFixed(1))
  const quality = Math.min(98, Math.max(45, Math.round((totalSleep / goal) * 88 + (reminderEnabled ? 5 : 0))))

  const [history, setHistory] = useState<HistoryEntry[]>([
    { bedtime: '22:40', wake: '06:35', total: 7.9, quality: 88 },
    { bedtime: '23:10', wake: '06:50', total: 7.7, quality: 84 },
    { bedtime: '22:30', wake: '06:45', total: 8.2, quality: 93 },
    { bedtime: '23:00', wake: '07:00', total: 8, quality: 91 },
  ])

  const average = Number((history.reduce((sum, item) => sum + item.total, 0) / history.length).toFixed(1))
  const streak = history.filter((item) => item.total >= goal - 0.4).length
  const maxBar = Math.max(...history.map((item) => item.total), goal)

  const coach = useMemo(() => {
    const input = coachInput.toLowerCase()
    return coachResponses.find((response) => response.keys.some((key) => input.includes(key))) ?? {
      title: 'Build a calmer sleep system',
      tips: [
        'Keep a stable sleep/wake time, including weekends, within a 60-minute range.',
        'Reserve your bed for sleep and intimacy so your brain links bed with rest.',
        'Use this calculator to choose a wake time that ends near a 90-minute cycle.',
      ],
    }
  }, [coachInput])

  function saveSleepEntry() {
    setHistory((current) => [
      ...current.slice(-5),
      { bedtime, wake: wakeTime, total: totalSleep, quality },
    ])
  }

  function startReminder() {
    setReminderEnabled(true)
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => undefined)
    }
  }

  const appTheme = dark ? 'dark' : 'light'

  return (
    <div className={appTheme}>
      <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-950 transition-colors duration-500 dark:bg-[#030712] dark:text-white">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violet-600/25 blur-3xl" />
          <div className="absolute right-[-160px] top-60 h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="absolute bottom-0 left-[-120px] h-[420px] w-[420px] rounded-full bg-indigo-700/20 blur-3xl" />
          {Array.from({ length: 22 }).map((_, index) => (
            <span
              key={index}
              className="absolute h-1 w-1 rounded-full bg-white/60 shadow-[0_0_16px_rgba(255,255,255,.9)]"
              style={{ top: `${(index * 37) % 90}%`, left: `${(index * 53) % 96}%`, opacity: index % 3 === 0 ? 0.9 : 0.35 }}
            />
          ))}
        </div>

        <header className="sticky top-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-2xl dark:bg-slate-950/55">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <a href="#top" className="flex items-center gap-3" aria-label="Sleep Cycle Labs home">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-300 shadow-lg shadow-violet-500/25">
                <CloudMoon className="h-6 w-6 text-white" />
              </span>
              <span>
                <span className="block text-lg font-semibold tracking-tight">Sleep Cycle Labs</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">AI sleep optimization</span>
              </span>
            </a>
            <div className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="rounded-full px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-900/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white">
                  {item}
                </a>
              ))}
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <button onClick={() => setDark((value) => !value)} className="rounded-full border border-slate-300/50 bg-white/60 px-4 py-2 text-sm font-medium shadow-sm transition hover:scale-105 dark:border-white/10 dark:bg-white/10">
                {dark ? 'Light' : 'Dark'} mode
              </button>
              <button onClick={() => setAuthOpen(true)} className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 shadow-xl shadow-indigo-950/10 transition hover:scale-105 dark:bg-white dark:text-slate-950">
                Login / Sign up
              </button>
            </div>
            <button onClick={() => setMobileOpen((value) => !value)} className="rounded-2xl border border-white/10 p-3 lg:hidden" aria-label="Open menu">
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </nav>
          <AnimatePresence>
            {mobileOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="border-t border-white/10 px-4 py-4 lg:hidden">
                {navItems.map((item) => (
                  <a onClick={() => setMobileOpen(false)} key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="block rounded-2xl px-4 py-3 text-slate-700 dark:text-slate-200">
                    {item}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main id="top" className="relative z-10">
          <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-24 lg:pt-24">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-sm text-violet-700 dark:text-violet-200">
                <Sparkles className="h-4 w-4" /> Built for USA, UK, Canada & Australia sleep routines
              </div>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
                Wake up refreshed with AI-powered sleep cycles.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Sleep Cycle Labs calculates your perfect bedtime or wake-up time using 90-minute cycles, nap science, sleep debt recovery, smart reminders, and an AI sleep coach.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#calculator" className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 px-7 py-4 font-semibold text-white shadow-2xl shadow-violet-500/25 transition hover:scale-[1.03]">
                  Calculate Your Perfect Sleep Time <ChevronRight className="ml-2 h-5 w-5 transition group-hover:translate-x-1" />
                </a>
                <button onClick={() => setShowPremium(true)} className="inline-flex items-center justify-center rounded-full border border-slate-300/60 bg-white/60 px-7 py-4 font-semibold text-slate-900 backdrop-blur transition hover:scale-[1.03] dark:border-white/10 dark:bg-white/10 dark:text-white">
                  <Crown className="mr-2 h-5 w-5 text-amber-300" /> Try Premium
                </button>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-3 sm:max-w-xl">
                {['90-min cycles', 'AI coaching', 'AdSense ready'].map((item) => (
                  <div key={item} className="rounded-3xl border border-slate-200 bg-white/60 p-4 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                    <Check className="mx-auto mb-2 h-5 w-5 text-cyan-300" />
                    <p className="text-sm text-slate-600 dark:text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
              <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-violet-500/20 to-cyan-500/10 blur-2xl" />
              <div className="relative rounded-[2rem] border border-white/15 bg-white/70 p-5 shadow-2xl backdrop-blur-2xl dark:bg-white/[0.07]">
                <div className="flex items-center justify-between rounded-3xl bg-slate-950 p-5 text-white dark:bg-black/40">
                  <div>
                    <p className="text-sm text-slate-400">Tonight's best plan</p>
                    <p className="mt-1 text-3xl font-semibold">10:15 PM</p>
                  </div>
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-300 shadow-lg shadow-cyan-500/20">
                    <Moon className="h-10 w-10" />
                  </div>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <StatCard icon={<Clock3 />} label="Cycles" value="6" detail="Best quality" />
                  <StatCard icon={<HeartPulse />} label="Readiness" value="94%" detail="Recovery score" />
                </div>
                <div className="mt-5 rounded-3xl border border-white/10 bg-slate-950/90 p-5 text-white">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-medium">Sleep quality trend</p>
                    <LineChart className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div className="flex h-36 items-end gap-3">
                    {[58, 72, 66, 84, 79, 91, 96].map((height, index) => (
                      <motion.div key={index} initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ delay: index * 0.08 }} className="flex-1 rounded-t-2xl bg-gradient-to-t from-indigo-600 to-cyan-300" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <AdBanner label="AdSense placement: responsive top wellness sponsor" />

          <section id="calculator" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Sleep cycle calculator" title="Find your ideal sleep or wake time" text="Choose whether you want to wake up refreshed or go to sleep now. We include a 15-minute falling-asleep buffer and 90-minute cycles." />
            <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
              <GlassCard>
                <div className="grid grid-cols-2 rounded-2xl bg-slate-900/5 p-1 dark:bg-black/30">
                  {(['wake', 'sleep'] as Mode[]).map((item) => (
                    <button key={item} onClick={() => setMode(item)} className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${mode === item ? 'bg-white text-slate-950 shadow-lg dark:bg-white' : 'text-slate-500 dark:text-slate-300'}`}>
                      I want to {item === 'wake' ? 'wake up at' : 'go to sleep at'}
                    </button>
                  ))}
                </div>
                <label className="mt-6 block text-sm font-medium text-slate-600 dark:text-slate-300">Target time</label>
                <input type="time" value={targetTime} onChange={(event) => setTargetTime(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white/70 px-5 py-4 text-2xl font-semibold outline-none ring-cyan-300/30 transition focus:ring-4 dark:border-white/10 dark:bg-black/30" />
                <p className="mt-5 rounded-3xl bg-cyan-400/10 p-4 text-sm text-slate-600 dark:text-slate-300">
                  Tip: six cycles works best for most adults, but five cycles can be realistic for high-demand mornings.
                </p>
              </GlassCard>
              <div className="grid gap-4 md:grid-cols-3">
                {sleepResults.map((result) => (
                  <motion.div whileHover={{ y: -8 }} key={result.count} className="rounded-[2rem] border border-white/10 bg-slate-950 p-6 text-white shadow-2xl shadow-indigo-950/20">
                    <div className={`mb-5 inline-flex rounded-full bg-gradient-to-r ${qualityTone[result.quality]} px-3 py-1 text-xs font-bold text-slate-950`}>{result.quality}</div>
                    <p className="text-sm text-slate-400">{mode === 'wake' ? 'Go to sleep at' : 'Wake up at'}</p>
                    <p className="mt-2 text-4xl font-semibold">{result.time}</p>
                    <div className="mt-6 border-t border-white/10 pt-5">
                      <p className="font-medium">{result.count} cycles</p>
                      <p className="mt-1 text-sm text-slate-400">{result.note}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
            <GlassCard>
              <div className="flex items-center gap-3"><Coffee className="text-amber-300" /><h2 className="text-2xl font-semibold">Nap Calculator</h2></div>
              <label className="mt-6 block text-sm text-slate-500 dark:text-slate-400">Nap start time</label>
              <input type="time" value={napStart} onChange={(event) => setNapStart(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white/70 px-5 py-4 text-xl font-semibold outline-none dark:border-white/10 dark:bg-black/30" />
              <div className="mt-5 grid gap-3">
                {napResults.map((nap) => (
                  <div key={nap.name} className="flex items-center justify-between rounded-3xl bg-slate-900/5 p-4 dark:bg-white/5">
                    <div><p className="font-semibold">{nap.name}</p><p className="text-sm text-slate-500 dark:text-slate-400">{nap.duration} min • {nap.benefit}</p></div>
                    <p className="text-xl font-semibold text-cyan-500 dark:text-cyan-300">{nap.wake}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
            <GlassCard>
              <div className="flex items-center gap-3"><TimerReset className="text-rose-300" /><h2 className="text-2xl font-semibold">Sleep Debt Calculator</h2></div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <NumberInput label="Average daily sleep" value={averageSleep} setValue={setAverageSleep} suffix="hrs" />
                <NumberInput label="Desired sleep" value={desiredSleep} setValue={setDesiredSleep} suffix="hrs" />
              </div>
              <div className="mt-6 rounded-[2rem] bg-gradient-to-br from-violet-500/20 to-cyan-500/10 p-6">
                <p className="text-sm text-slate-500 dark:text-slate-300">Weekly sleep debt</p>
                <p className="mt-1 text-5xl font-semibold">{weeklyDebt.toFixed(1)}h</p>
                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">Recover gently: add 30–45 minutes for several nights, keep naps early, hydrate, and protect a consistent wake time.</p>
              </div>
            </GlassCard>
          </section>

          <section id="tracker" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Sleep tracker dashboard" title="Save history, goals, and weekly analytics" text="A premium dashboard preview for daily sleep goals, streaks, hydration reminders, and quality tracking." />
            <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
              <GlassCard>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TimeField label="Bedtime" value={bedtime} onChange={setBedtime} />
                  <TimeField label="Wake-up" value={wakeTime} onChange={setWakeTime} />
                  <NumberInput label="Daily sleep goal" value={goal} setValue={setGoal} suffix="hrs" />
                  <NumberInput label="Water cups" value={water} setValue={setWater} suffix="cups" />
                </div>
                <button onClick={saveSleepEntry} className="mt-6 w-full rounded-3xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-4 font-semibold text-white shadow-lg shadow-cyan-500/20">Save sleep history</button>
                <button onClick={startReminder} className="mt-3 flex w-full items-center justify-center gap-2 rounded-3xl border border-white/10 bg-white/10 px-5 py-4 font-semibold"><Bell className="h-5 w-5" /> {reminderEnabled ? 'Reminder armed for bedtime' : 'Enable bedtime reminder'}</button>
              </GlassCard>
              <GlassCard>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Metric icon={<Zap />} label="Sleep streak" value={`${streak} days`} />
                  <Metric icon={<BarChart3 />} label="Average" value={`${average}h`} />
                  <Metric icon={<Droplets />} label="Water" value={`${water}/8`} />
                </div>
                <div className="mt-6 grid gap-6 lg:grid-cols-[.65fr_.35fr]">
                  <div className="rounded-[2rem] bg-slate-950 p-5 text-white">
                    <div className="mb-4 flex items-center justify-between"><p className="font-semibold">Weekly quality chart</p><p className="text-sm text-cyan-300">Live</p></div>
                    <div className="flex h-52 items-end gap-3">
                      {history.map((item, index) => (
                        <div key={`${item.bedtime}-${index}`} className="flex flex-1 flex-col items-center gap-2">
                          <div className="w-full rounded-t-2xl bg-gradient-to-t from-violet-700 to-cyan-300" style={{ height: `${(item.total / maxBar) * 100}%` }} />
                          <span className="text-xs text-slate-400">{item.total}h</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <ProgressRing value={quality} label="Tonight quality" />
                </div>
              </GlassCard>
            </div>
          </section>

          <section id="ai-coach" className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
            <GlassCard>
              <div className="flex items-center gap-3"><Brain className="text-violet-300" /><h2 className="text-3xl font-semibold">AI Sleep Coach</h2></div>
              <p className="mt-3 text-slate-600 dark:text-slate-300">Ask about insomnia, waking tired, sleep schedules, stress, naps, or better recovery.</p>
              <textarea value={coachInput} onChange={(event) => setCoachInput(event.target.value)} className="mt-6 min-h-32 w-full rounded-[2rem] border border-slate-200 bg-white/70 p-5 outline-none focus:ring-4 focus:ring-violet-400/20 dark:border-white/10 dark:bg-black/30" placeholder="Example: I can't sleep" />
              <div className="mt-4 flex flex-wrap gap-2">
                {['I can’t sleep', 'I wake up tired', 'How to fix sleep schedule'].map((prompt) => <button key={prompt} onClick={() => setCoachInput(prompt)} className="rounded-full bg-slate-900/5 px-4 py-2 text-sm dark:bg-white/10">{prompt}</button>)}
              </div>
            </GlassCard>
            <GlassCard>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">Coach response</p>
              <h3 className="mt-3 text-3xl font-semibold">{coach.title}</h3>
              <div className="mt-6 space-y-4">
                {coach.tips.map((tip) => <div key={tip} className="flex gap-3 rounded-3xl bg-slate-900/5 p-4 dark:bg-white/5"><Check className="mt-1 h-5 w-5 flex-none text-cyan-300" /><p className="text-slate-600 dark:text-slate-300">{tip}</p></div>)}
              </div>
            </GlassCard>
          </section>

          <section id="sounds" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Sleep sounds" title="Calming sound cards for your wind-down" text="Tap a card to simulate playback. The UI is ready for audio files, subscriptions, or affiliate sound bundles." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                ['Rain', Waves, 'Gentle rainfall for mental quiet'],
                ['Ocean', Waves, 'Slow waves and coastal ambience'],
                ['Forest', Wind, 'Leaves, birds, and soft air'],
                ['White Noise', Headphones, 'Steady masking for focus'],
                ['Fan Sound', Wind, 'Consistent bedroom hum'],
              ].map(([name, Icon, text]) => (
                <motion.button whileHover={{ y: -8 }} key={String(name)} onClick={() => setSoundPlaying(String(name))} className={`rounded-[2rem] border p-6 text-left transition ${soundPlaying === name ? 'border-cyan-300 bg-cyan-300/10' : 'border-white/10 bg-white/60 dark:bg-white/[0.06]'}`}>
                  <div className="mb-8 flex items-center justify-between"><Icon className="h-7 w-7 text-cyan-300" />{soundPlaying === name ? <Pause /> : <Play />}</div>
                  <h3 className="text-xl font-semibold">{String(name)}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{String(text)}</p>
                </motion.button>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-3">
              <AffiliateCard icon={<Eye />} title="Silk sleep masks" text="Premium blackout comfort for travel, shift work, and deep rest." />
              <AffiliateCard icon={<ShieldCheck />} title="Hybrid mattresses" text="Supportive cooling sleep products with affiliate-ready CTA blocks." />
              <AffiliateCard icon={<Glasses />} title="Blue light glasses" text="Reduce evening screen glare and support melatonin-friendly routines." />
            </div>
          </section>

          <section id="blog" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="SEO blog preview" title="Sleep education built for organic search" text="Helpful, structured article cards target health, wellness, productivity, and sleep-cycle queries." />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
              {[
                'Best Time to Sleep',
                'Sleep Cycle Explained',
                'Why You Wake Up Tired',
                'Sleep Tips for Better Health',
                'How Much Sleep Do You Need',
              ].map((title, index) => (
                <article key={title} className="rounded-[2rem] border border-white/10 bg-white/70 p-5 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl dark:bg-white/[0.06]">
                  <p className="text-sm text-cyan-500 dark:text-cyan-300">Guide 0{index + 1}</p>
                  <h3 className="mt-3 text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">Evidence-informed sleep guidance with quick takeaways, cycle timing, and practical routines.</p>
                  <a href="#calculator" className="mt-5 inline-flex items-center text-sm font-semibold text-violet-500">Read preview <ChevronRight className="h-4 w-4" /></a>
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
              <GlassCard>
                <div className="flex items-center gap-3"><AlarmClock className="text-cyan-300" /><h2 className="text-3xl font-semibold">Smart alarm concept</h2></div>
                <p className="mt-4 text-slate-600 dark:text-slate-300">A future-ready alarm that wakes you near the lightest sleep phase, fades in calming sounds, and pairs with your daily sleep goal.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">{['Gentle fade-in', 'Cycle window', 'Morning briefing'].map((item) => <div key={item} className="rounded-2xl bg-slate-900/5 p-4 text-sm dark:bg-white/5">{item}</div>)}</div>
              </GlassCard>
              <GlassCard>
                <h3 className="text-2xl font-semibold">Meditation timer</h3>
                <p className="mt-3 text-slate-500 dark:text-slate-400">Set a calming pre-sleep breathing session.</p>
                <div className="mt-6 text-6xl font-semibold">{Math.floor(meditationSeconds / 60)}:{String(meditationSeconds % 60).padStart(2, '0')}</div>
                <div className="mt-6 flex gap-3">
                  {[180, 300, 600].map((seconds) => <button key={seconds} onClick={() => setMeditationSeconds(seconds)} className="rounded-full bg-white/10 px-4 py-2">{seconds / 60}m</button>)}
                </div>
              </GlassCard>
            </div>
          </section>

          <AdBanner label="AdSense placement: in-content responsive sleep products ad" />

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Testimonials" title="Trusted by wellness-focused sleepers" text="Designed for professionals, students, parents, athletes, and health-conscious users." />
            <div className="grid gap-5 md:grid-cols-3">
              {['The cycle results helped me stop waking mid-dream.', 'The sleep debt card made my recovery plan obvious.', 'Premium, clean, and faster than every sleep site I used.'].map((quote, index) => <GlassCard key={quote}><div className="mb-4 flex gap-1">{Array.from({ length: 5 }).map((_, star) => <Star key={star} className="h-4 w-4 fill-amber-300 text-amber-300" />)}</div><p className="text-lg leading-8">“{quote}”</p><p className="mt-5 text-sm text-slate-500 dark:text-slate-400">Verified beta user #{index + 1}</p></GlassCard>)}
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="FAQ" title="Sleep Cycle Labs questions" text="Clear answers for users and search engines." />
            <div className="space-y-4">
              {[
                ['Why 90-minute sleep cycles?', 'Sleep often moves through lighter, deeper, and REM stages in roughly 90-minute waves, so waking near a cycle boundary can feel smoother.'],
                ['Is this medical advice?', 'No. Sleep Cycle Labs provides educational wellness guidance. Speak with a clinician for persistent insomnia, sleep apnea symptoms, or health concerns.'],
                ['Can I save sleep history?', 'Yes. This demo stores history in the live dashboard state and is structured for account-based persistence.'],
                ['Where are ads placed?', 'Responsive ad areas are included near the top and mid-content, plus affiliate cards and a premium subscription modal.'],
              ].map(([question, answer]) => <details key={question} className="group rounded-[2rem] border border-white/10 bg-white/70 p-6 dark:bg-white/[0.06]"><summary className="cursor-pointer text-lg font-semibold">{question}</summary><p className="mt-4 text-slate-600 dark:text-slate-300">{answer}</p></details>)}
            </div>
          </section>
        </main>

        <footer className="relative z-10 border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3"><CloudMoon className="text-cyan-300" /><div><p className="font-semibold">Sleep Cycle Labs</p><p className="text-sm text-slate-500 dark:text-slate-400">Premium AI sleep calculator for healthier routines.</p></div></div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400"><span>Privacy</span><span>Terms</span><span>Affiliate Disclosure</span><span>Contact</span></div>
          </div>
        </footer>

        <AnimatePresence>
          {showPremium && <Modal onClose={() => setShowPremium(false)} title="Upgrade to Sleep Cycle Labs Premium"><p className="text-slate-600 dark:text-slate-300">Unlock unlimited sleep history, advanced AI coaching, smart alarm integrations, sound mixes, and exportable weekly reports.</p><button className="mt-6 w-full rounded-3xl bg-gradient-to-r from-amber-300 to-violet-400 px-5 py-4 font-semibold text-slate-950">Start 7-day premium trial</button></Modal>}
          {authOpen && <Modal onClose={() => setAuthOpen(false)} title="Welcome back"><div className="space-y-3"><input placeholder="Email address" className="w-full rounded-2xl border border-white/10 bg-white/70 px-4 py-3 outline-none dark:bg-black/30" /><input placeholder="Password" type="password" className="w-full rounded-2xl border border-white/10 bg-white/70 px-4 py-3 outline-none dark:bg-black/30" /><button className="flex w-full items-center justify-center gap-2 rounded-3xl bg-white px-5 py-4 font-semibold text-slate-950"><Lock className="h-4 w-4" /> Login / create account</button></div></Modal>}
        </AnimatePresence>
      </div>
    </div>
  )
}

function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="mb-10 max-w-3xl"><p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-500 dark:text-cyan-300">{eyebrow}</p><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h2><p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">{text}</p></div>
}

function GlassCard({ children }: { children: React.ReactNode }) {
  return <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5 }} className="rounded-[2rem] border border-slate-200 bg-white/75 p-6 shadow-xl shadow-indigo-950/5 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.06]">{children}</motion.div>
}

function StatCard({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: string; detail: string }) {
  return <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5 text-white">{icon}<p className="mt-4 text-sm text-slate-400">{label}</p><p className="text-3xl font-semibold">{value}</p><p className="text-sm text-cyan-300">{detail}</p></div>
}

function NumberInput({ label, value, setValue, suffix }: { label: string; value: number; setValue: (value: number) => void; suffix: string }) {
  return <label className="block"><span className="text-sm text-slate-500 dark:text-slate-400">{label}</span><div className="mt-2 flex items-center rounded-3xl border border-slate-200 bg-white/70 px-4 dark:border-white/10 dark:bg-black/30"><input type="number" step="0.25" value={value} onChange={(event) => setValue(Number(event.target.value))} className="min-w-0 flex-1 bg-transparent py-4 text-xl font-semibold outline-none" /><span className="text-sm text-slate-500">{suffix}</span></div></label>
}

function TimeField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="block"><span className="text-sm text-slate-500 dark:text-slate-400">{label}</span><input type="time" value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white/70 px-4 py-4 text-xl font-semibold outline-none dark:border-white/10 dark:bg-black/30" /></label>
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-3xl bg-slate-900/5 p-5 dark:bg-white/5"><div className="text-cyan-300">{icon}</div><p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{label}</p><p className="text-2xl font-semibold">{value}</p></div>
}

function ProgressRing({ value, label }: { value: number; label: string }) {
  const angle = Math.round((value / 100) * 360)
  return <div className="grid place-items-center rounded-[2rem] bg-slate-950 p-5 text-white"><div className="grid h-44 w-44 place-items-center rounded-full" style={{ background: `conic-gradient(#67e8f9 ${angle}deg, rgba(255,255,255,.1) 0deg)` }}><div className="grid h-32 w-32 place-items-center rounded-full bg-slate-950 text-center"><div><p className="text-4xl font-semibold">{value}%</p><p className="text-xs text-slate-400">{label}</p></div></div></div></div>
}

function AffiliateCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <motion.div whileHover={{ y: -6 }} className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-6 backdrop-blur"><div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/15 text-cyan-300">{icon}</div><h3 className="text-2xl font-semibold">{title}</h3><p className="mt-3 text-slate-600 dark:text-slate-300">{text}</p><button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"><ShoppingBag className="h-4 w-4" /> Shop picks</button></motion.div>
}

function AdBanner({ label }: { label: string }) {
  return <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/50 p-6 text-center text-sm text-slate-500 backdrop-blur dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-400">{label}</div></div>
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/70 p-4 backdrop-blur-xl"><motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white p-6 shadow-2xl dark:bg-slate-950"><div className="mb-5 flex items-start justify-between gap-4"><h2 className="text-2xl font-semibold">{title}</h2><button onClick={onClose} className="rounded-full bg-slate-900/5 p-2 dark:bg-white/10"><X className="h-5 w-5" /></button></div>{children}</motion.div></motion.div>
}

export default App
