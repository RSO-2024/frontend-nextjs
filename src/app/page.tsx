import { Navbar } from "./components/Navbar"
import { Metadata } from "next"
import { Card } from "./components/ui/Card"
import Hero from "./components/ui/Hero"

export const metadata: Metadata = {
  title: 'Clutchbids',
  icons: {
    icon: '../icon.svg'
  },
}

export default function Home() {
  return(
      <Hero/>
  )
}
