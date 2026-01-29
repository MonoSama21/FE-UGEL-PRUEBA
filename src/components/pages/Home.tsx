import { Footer } from '../sections/Footer'
import { MonitoreoForm } from '../sections/MonitoreoForm'
import { Navbar } from '../sections/Navbar'


export const Home = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <MonitoreoForm />
      <Footer />
    </div>
  )
}
