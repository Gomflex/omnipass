export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to OMNIPASS
        </h1>
        <p className="text-center text-lg mb-4">
          Universal Points Platform for Tourists in South Korea
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Earn Points</h2>
            <p>Shop at duty-free stores, complete eco-missions, or charge with your card</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Spend Points</h2>
            <p>Use for shopping, transportation, cultural events and more</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Find Partners</h2>
            <p>Discover partner stores and locations on our interactive map</p>
          </div>
        </div>
      </div>
    </main>
  );
}
