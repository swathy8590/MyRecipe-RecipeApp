
"use client";

import Recipedetails from "@/app/components/common/recipedetail/Recipedetails";

export default function Home() {
    const [windowWidth, setWindowWidth] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            handleResize(); // Initialize width on mount
            return () => window.removeEventListener('resize', handleResize); // Cleanup on unmount
        }
    }, []);


    return (
        <>

            <div >
                <h2 className="text-2xl font-semibold text-white pb-4 ps-6">
                    All Recipes
                </h2>
                <Recipedetails />
            </div>


        </>
    );
}
