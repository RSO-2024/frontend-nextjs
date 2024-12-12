import { Navbar } from "./components/Navbar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Clutchbids',
  icons: {
    icon: '../icon.svg'
  },
}

export default function Home() {
  return(
    <div>
      <h1>Home</h1>
    </div>
  )
}
