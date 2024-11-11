"use client"
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-50 py-10 px-4 rounded-t-2xl">
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
                        <li><Link href={"/landingpage"} className='pb-5'>Home</Link></li>
                        <li><Link href={"/recipes"} className='mb-5'> Recipe</Link></li>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae enim pharetra, venenatis nunc eget, finibus est. Maecenas , finibus est.
                    </p>
                    <div className="flex space-x-2">
                        <input
                            type="email"
                            placeholder="email address"
                            className="border rounded-lg w-[50%] px-4 py-2 flex-1"
                        />
                        <button className="px-3  bg-[#b55] text-slate-100 rounded-md   ">
                            sign up
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

