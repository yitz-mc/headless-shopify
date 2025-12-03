import { Hero } from '@/components/sections';

export default function Home() {
  return (
    <>
      <Hero />

      {/* Collections Grid - Placeholder */}
      <section className="py-12 container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Wardrobe Closets', 'Milano', 'Garages', 'Pantries'].map((category) => (
            <div
              key={category}
              className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition cursor-pointer"
            >
              <span className="text-lg font-medium">{category}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials - Placeholder */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">What Our Customers Say</h2>
          <p className="text-center text-gray-600">
            Trustpilot reviews will be integrated here
          </p>
        </div>
      </section>
    </>
  );
}
