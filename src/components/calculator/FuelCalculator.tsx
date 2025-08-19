import React, { useState } from 'react';

export const FuelCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simple' | 'custom'>('simple');
  
  // Simple Calculator State
  const [simpleData, setSimpleData] = useState({
    ethanolPrice: '',
    gasolinePrice: '',
  });
  
  // Custom Calculator State
  const [customData, setCustomData] = useState({
    ethanolPrice: '',
    ethanolConsumption: '',
    gasolinePrice: '',
    gasolineConsumption: '',
  });

  const [simpleResult, setSimpleResult] = useState<string>('');
  const [customResult, setCustomResult] = useState<{
    recommended: string;
    ethanolCostPerKm: number;
    gasolineCostPerKm: number;
  } | null>(null);

  const handleSimpleCalculate = () => {
    const ethanol = parseFloat(simpleData.ethanolPrice);
    const gasoline = parseFloat(simpleData.gasolinePrice);
    
    if (ethanol && gasoline) {
      const ratio = ethanol / gasoline;
      setSimpleResult(ratio <= 0.7 ? 'Abasteça com Álcool' : 'Abasteça com Gasolina');
    }
  };

  const handleCustomCalculate = () => {
    const ethanolPrice = parseFloat(customData.ethanolPrice);
    const ethanolConsumption = parseFloat(customData.ethanolConsumption);
    const gasolinePrice = parseFloat(customData.gasolinePrice);
    const gasolineConsumption = parseFloat(customData.gasolineConsumption);
    
    if (ethanolPrice && ethanolConsumption && gasolinePrice && gasolineConsumption) {
      const ethanolCostPerKm = ethanolPrice / ethanolConsumption;
      const gasolineCostPerKm = gasolinePrice / gasolineConsumption;
      
      setCustomResult({
        recommended: ethanolCostPerKm < gasolineCostPerKm ? 'Álcool' : 'Gasolina',
        ethanolCostPerKm,
        gasolineCostPerKm,
      });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
          Calculadora de Combustível
        </h1>
        <p className="text-text-secondary mt-1">
          Descubra qual combustível é mais vantajoso
        </p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('simple')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'simple'
                  ? 'bg-primary text-black border-b-2 border-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Cálculo Simples
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'custom'
                  ? 'bg-primary text-black border-b-2 border-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Cálculo Personalizado
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'simple' ? (
              <div className="space-y-6">
                <div className="text-sm text-text-secondary mb-4">
                  Baseado na regra dos 70%: se o preço do álcool for até 70% do preço da gasolina, 
                  compensa abastecer com álcool.
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Preço do Álcool (R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={simpleData.ethanolPrice}
                      onChange={(e) => setSimpleData(prev => ({
                        ...prev,
                        ethanolPrice: e.target.value
                      }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                      placeholder="Ex: 3.89"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Preço da Gasolina (R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={simpleData.gasolinePrice}
                      onChange={(e) => setSimpleData(prev => ({
                        ...prev,
                        gasolinePrice: e.target.value
                      }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                      placeholder="Ex: 5.59"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSimpleCalculate}
                  className="w-full bg-primary text-black font-semibold py-3 px-6 rounded-xl hover:bg-yellow-500 transition-colors"
                >
                  Calcular
                </button>

                {simpleResult && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                    <div className="text-lg font-semibold text-green-800">
                      {simpleResult}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-sm text-text-secondary mb-4">
                  Compare o custo por quilômetro de cada combustível baseado no consumo real do seu veículo.
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-text-primary">Álcool</h3>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Preço (R$/L)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={customData.ethanolPrice}
                        onChange={(e) => setCustomData(prev => ({
                          ...prev,
                          ethanolPrice: e.target.value
                        }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                        placeholder="3.89"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Consumo (Km/L)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={customData.ethanolConsumption}
                        onChange={(e) => setCustomData(prev => ({
                          ...prev,
                          ethanolConsumption: e.target.value
                        }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                        placeholder="8.5"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-text-primary">Gasolina</h3>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Preço (R$/L)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={customData.gasolinePrice}
                        onChange={(e) => setCustomData(prev => ({
                          ...prev,
                          gasolinePrice: e.target.value
                        }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                        placeholder="5.59"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Consumo (Km/L)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={customData.gasolineConsumption}
                        onChange={(e) => setCustomData(prev => ({
                          ...prev,
                          gasolineConsumption: e.target.value
                        }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                        placeholder="12.5"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCustomCalculate}
                  className="w-full bg-primary text-black font-semibold py-3 px-6 rounded-xl hover:bg-yellow-500 transition-colors"
                >
                  Calcular
                </button>

                {customResult && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="text-center mb-4">
                      <div className="text-lg font-semibold text-green-800 mb-2">
                        Recomendação: {customResult.recommended}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white p-3 rounded-lg">
                        <div className="text-sm text-text-secondary">Álcool</div>
                        <div className="font-semibold text-text-primary">
                          R$ {customResult.ethanolCostPerKm.toFixed(4)}/km
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <div className="text-sm text-text-secondary">Gasolina</div>
                        <div className="font-semibold text-text-primary">
                          R$ {customResult.gasolineCostPerKm.toFixed(4)}/km
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};