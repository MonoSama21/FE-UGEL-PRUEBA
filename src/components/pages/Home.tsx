import { Hero } from '../sections/Hero'
import { WeddingDetails } from '../sections/WeddingDetails'
import { OurStory } from '../sections/OurStory'
import { Gallery } from '../sections/Gallery'
import { RSVPForm } from '../sections/RSVPForm'
import { Footer } from '../sections/Footer'
import { CountDown } from '../sections/CountDown'
import { Gifts } from '../sections/Gifts'

export const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <CountDown  />  
      <WeddingDetails />
      <OurStory />
      <Gallery />
      <Gifts />
      <RSVPForm />
      <Footer />
    </div>
  )
}
