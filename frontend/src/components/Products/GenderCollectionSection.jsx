import { Link } from 'react-router-dom'
import mensCollectionImage from '../../assets/mens-collection.webp'
import womensCollectionImage from '../../assets/womens-collection.webp'
const GenderCollectionSection = () => {
  return (
    <section className=' py-10 px-4 lg:px-0 mt-4'>
      <div className=' container mx-auto flex flex-col md:flex-row gap-4'>
         {/* women's collection */}
         <div className='relative flex-1'>
             <img src={womensCollectionImage} alt="women's collection" className='w-full h-[500px] object bg-cover'/>
             <div className='absolute bottom-8 left-8 '>
                <Link to="/collection/all?gender=women" className='text-4xl font-bold text-white mb-3 '>Women's Collection</Link>
             </div>
         </div>
         {/* men's collection */}
         <div className='relative flex-1'>
             <img src={mensCollectionImage} alt="men's collection" className='w-full h-[500px] object bg-cover'/>
             <div className='absolute bottom-8 left-8 '>
                <Link to="/collection/all?gender=men" className='text-4xl font-bold text-gray-900 mb-3 '>Men's Collection</Link>
             </div>
         </div>
      </div>
    </section>
  )
}

export default GenderCollectionSection
