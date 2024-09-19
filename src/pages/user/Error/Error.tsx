import React from 'react'

const Error = () => {
  return (
    <section className="bg-[#F4F1EA] py-16 flex items-center justify-center ">
  <div className="container mx-auto text-center">
    <div className="error-content">
      <h2 className="text-6xl font-bold text-gray-800 mb-4 animate__animated animate__fadeInUp animate__delay-300ms">
        4<span className="text-red-500">0</span>4
      </h2>
      <h3 className="text-2xl font-semibold text-gray-600 mb-6 animate__animated animate__fadeInUp animate__delay-500ms">
        We’re sorry, page not found
      </h3>
      <a
        href="/"
        className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold transition-colors duration-300 hover:bg-blue-600 animate__animated animate__fadeInUp animate__delay-700ms"
      >
        Back To Home
      </a>
    </div>
  </div>
</section>

  )
}

export default Error