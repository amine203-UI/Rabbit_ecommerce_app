import axios from "axios";
import { useEffect, useRef , useState } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { Link } from "react-router-dom"

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const[startX, setStartX] = useState(0);
    const[scrollLeft, setScrollLeft] = useState(false);
    const[canScrollLeft, setCanScrollLeft] = useState(false);
    const[canScrollRight,setCanScrollRight] = useState(true);
    
    const [newArrivals, setNewArrivals] = useState([]);

    useEffect(() =>{
      const fetchNewArrivals = async() =>{
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
          );
          setNewArrivals(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchNewArrivals();
    }, []);
  
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }

    const handleMouseMove = (e) =>{
       if(!isDragging) return;
       const x = e.pageX - scrollRef.current.offsetLeft;
       const walk = x-startX;
       scrollRef.current.scrollLeft = scrollLeft - walk;
    }

    const handleMouseOrLeave = () => {
       setIsDragging(false);
    }
    const scroll = (direction) => {
       const scrollAmount = direction === "left" ? -300 : 300;
       scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }


//    update scroll buttons
    const updateScrollButtons = () => {
    const container = scrollRef.current;
    if(container){
      const leftScroll = container.scrollLeft;
      const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth;
      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
    
   }
  useEffect (() => {
    const container = scrollRef.current;
    if(container){
     container.addEventListener("scroll",updateScrollButtons);
     updateScrollButtons();
     return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, [newArrivals])
  return (
    <section className="py-6 px-4 lg:px-0">
      <div  className="container mx-auto text-center mb-10 mt-15 p-4 relative">
           <h2 className="text-3xl font-bold mb-2"> Explore New Arrivals </h2>
           <p className="text-lg text-gray-600 mb-8">
                Discover the latest styles straight off the runway, Freshly added to keep your wardrobe on the cutting edge os fashion.
           </p>

           {/* scroll buttons */}
           <div className="absolute right-0 bottom-[-30px] flex space-x-2 ">
                <button onClick={() => scroll("left")} disabled={!canScrollLeft} className={`p-0.5 rounded border border-gray-300 ${canScrollLeft ? 'bg-white text-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                  <FiChevronLeft className="text-xl"/>
                </button>
                <button onClick={()=> scroll("right")}  className={`p-0.5 rounded border border-gray-300 ${canScrollRight ? 'bg-white text-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                  <FiChevronRight className="text-xl"/>
                </button>
           </div>

      </div>

      {/* scrollable content */}
           <div ref={scrollRef} onMouseDown ={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseOrLeave} onMouseLeave = {handleMouseOrLeave} className="container mx-auto overflow-x-scroll flex space-x-6 relative hide-scrollbar">
                {newArrivals.map((product) => (
                  <div key = {product._id} className={`min-w-[280px] md:min-w-[320px] lg:min-w-[320px] relative ${isDragging ?"cursor-grabbing" : " cursor-grab"}`}>
                    <img src={product.images[0]?.url} alt={product.images[0]?.altText || product.name} draggable= "false" className="w-full h-[300px] md:h-[400px] lg:h-[500px]object-cover rounded-sm "/>
                    <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
                       <Link to={`/product/${product._id}`} className="block">
                         <h4 className="font-medium">{product.name}</h4>
                         <p className="mt-1">${product.price}</p>
                       </Link>
                    </div>
                  </div>

                ))}
           </div>
    </section>
  )
}

export default NewArrivals
