import BuckConverterTool from './components/BuckConverterTool';

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
            <h1 className="text-xl font-bold text-gray-800">PowerDesign Pro</h1>
          </div>
          <span className="text-sm text-gray-500">v1.0.0</  span>
        </div>
      </header>
      
      <main className="py-8">
        <BuckConverterTool />
      </main>
    </div>
  );
}

export default App;