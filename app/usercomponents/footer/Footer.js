"use client"
import Link from 'next/link';
import React from 'react';

const Footer = ({ createRecipe }) => {
    return (
        <footer className="bg-gray-200 py-10 px-4 ">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Social Media Section */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="mb-4">
                        {/* Placeholder for the logo */}
                        <div className="  flex items-center justify-center mt-10">
                            <span className="text-gray-800 text-3xl font-bold">MY</span><span className="text-red-500  text-3xl font-bold">Recipe</span>
                        </div>
                        <p className="font-bold text-gray-800 mb-2 mt-1">Yummy Bites</p>
                    </div>

                    <div className="flex space-x-4 text-gray-600">
                        {/* Social Media Icons */}
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-pinterest"></i>
                        <i className="fab fa-youtube"></i>
                        <i className="fab fa-tiktok"></i>
                    </div>
                </div>

                {/* Shop + Explore Section */}
                <div className="text-center md:text-left">
                    <h3 className="text-red-600 font-bold mb-4">Menu</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li><Link href={"/home"} className='pb-5'>Home</Link></li>
                        <li><Link href={"/allrecipes"} className='mb-5'> Recipe</Link></li>
                        <li><Link href={"createrecipe/"} className='mb-5'>Add Recipe</Link></li>
                        {/* <li><Link href={"createrecipe/"} className='mb-5'>About us</Link></li> */}

                    </ul>
                </div>
                {/* <div className="text-center md:text-left">
                    <h3 className="text-red-600 font-bold mb-4">info</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li>account</li>
                        <li>contact us</li>
                        <li>careers</li>
                        <li>faqs</li>
                        <li>sitemap</li>
                    </ul>
                </div> */}

                {/* Newsletter Section */}
                <div className="text-center md:text-left">
                    <h3 className="text-red-600 font-bold mb-4">Create Your Own Recipe</h3>
                    <p className="text-gray-700 mb-4">
                        Creating your own recipe on a
                        <span className=" font-bold"> My</span><span className="text-red-500 font-bold">Recipe </span>
                        website allows you to share unique dishes,
                        experiment with flavors, and build a community around your culinary creations.
                    </p>
                    {/* <div className="text-left  w-full">

                        <Link href={"createrecipe"}>
                            <button onClick={createRecipe} className=" px-10  py-2 mt-4  bg-[#b55] text-white rounded-md "  >
                                Create New Recipe</button>
                        </Link>
                    </div> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;

