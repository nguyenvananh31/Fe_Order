
import React from 'react';


const Contact: React.FC = () => {
    return (
        <>
            <section className="bg-[#F4F1EA] py-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                        <div className="w-full max-w-xs px-4 mb-6 md:mb-8">
                            <div className="bg-white p-5 rounded-lg shadow-md text-center transition-colors duration-300 hover:bg-[#00813D] hover:text-white">
                                <div className="mb-3 ">
                                    <img src="https://modinatheme.com/html/foodking-html/assets/img/icon/location.svg" alt="Phone icon" className="mx-auto h-10 w-10 md:h-11 md:w-11 filter brightness-0 " />
                                </div>
                                <h3 className="text-sm md:text-base font-semibold">Address Line</h3>
                                <p className="mt-2 text-xs md:text-sm">
                                    Bowery St, New York, 37 USA <br />
                                    NY 10013, USA
                                </p>
                            </div>
                        </div>
                        <div className="w-full max-w-xs px-4 mb-6 md:mb-8">
                            <div className="bg-white p-5 rounded-lg shadow-md text-center transition-colors duration-300 hover:bg-[#00813D] hover:text-white">
                                <div className="mb-3">
                                    <img src="https://modinatheme.com/html/foodking-html/assets/img/icon/phone.svg" alt="Phone icon" className="mx-auto h-10 w-10 md:h-11 md:w-11 filter brightness-0" />
                                </div>
                                <h3 className="text-sm md:text-base font-semibold">Phone Number</h3>
                                <p className="mt-2 text-xs md:text-sm">
                                    +1255 - 568 - 6523 4374-221 <br />
                                    +1255 - 568 - 6523
                                </p>
                            </div>
                        </div>
                        <div className="w-full max-w-xs px-4 mb-6 md:mb-8">
                            <div className="bg-white p-5 rounded-lg shadow-md text-center transition-colors duration-300 hover:bg-[#00813D] hover:text-white">
                                <div className="mb-3">
                                    <img
                                        src="https://modinatheme.com/html/foodking-html/assets/img/icon/email.svg"
                                        alt="Email icon"
                                        className="mx-auto h-10 w-10 md:h-11 md:w-11 filter brightness-0 "
                                    />
                                </div>
                                <h3 className="text-sm md:text-base font-semibold">Mail Address</h3>
                                <p className="mt-2 text-xs md:text-sm">
                                    email@example.com <br />
                                    info@yourdomain.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#F4F1EA] py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                        <div className="w-full max-w-md px-4 mb-6 md:mb-8">
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold mb-4 text-center">Get in Touch</h3>
                                <p className="mb-6 text-sm md:text-base text-center">
                                    Lorem ipsum dolor sit amet consectetur adipiscing elit mattis <br />
                                    faucibus odio feugiat arc dolor.
                                </p>
                                <div className="relative h-56 md:h-64">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.497124226793!2d105.77343371509224!3d21.0285113860255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4f4736c7d3%3A0x8e0a158bcb04d9a1!2sH%C3%A0+N%E1%BB%99i%2C+Vietnam!5e0!3m2!1sen!2sbd!4v1678915269286!5m2!1sen!2sbd"
                                        className="absolute inset-0 w-full h-full border-0"
                                        allowFullScreen
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full max-w-md px-4 mb-6 md:mb-8">
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold mb-4 text-center">Fill Up The Form</h3>
                                <p className="mb-6 text-sm md:text-base text-center">Your email address will not be published. Required fields are marked *</p>
                                <form action="contact" id="contact-form" method="POST">
                                    <div className="space-y-4 ">
                                        <div>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Your Name*"
                                                className="w-full p-2.5 border  rounded text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#00813D] transition-all duration-300"
                                            />
                                        </div>
                                        <div >
                                            <input
                                                type="text"
                                                name="email"
                                                id="email"
                                                placeholder="Email Address*"
                                                className="w-full p-2.5 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#00813D] transition-all duration-300"
                                            />
                                        </div>
                                        <div >
                                            <textarea
                                                name="message"
                                                id="message"
                                                placeholder="Enter Your Message here"
                                                className="w-full p-2.5 border border-gray-300 rounded text-xs md:text-sm h-24 md:h-28 focus:outline-none focus:ring-2 focus:ring-[#00813D] transition-all duration-300"
                                            ></textarea>
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="w-full bg-blue-500 text-white py-2.5 rounded flex items-center justify-center space-x-2 transition-colors duration-300 hover:bg-[#00813D] hover:text-white"
                                            >
                                                {/* <i className="fal fa-paper-plane"></i> */}
                                                <span>Get In Touch</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;