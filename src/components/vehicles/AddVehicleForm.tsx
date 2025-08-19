import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export const AddVehicleForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Automóvel' as const,
    manufacturer: '',
    model: '',
    plate: '',
    current_mileage: '',
    mileage_unit: 'km' as const,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const categories = ['Automóvel', 'Motocicleta', 'Bike', 'Embarcação', 'Avião'] as const;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${user?.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('vehicles')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('vehicles')
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const { error } = await supabase
        .from('vehicles')
        .insert([
          {
            user_id: user?.id,
            name: formData.name,
            category: formData.category,
            manufacturer: formData.manufacturer,
            model: formData.model,
            plate: formData.plate,
            current_mileage: parseInt(formData.current_mileage),
            mileage_unit: formData.mileage_unit,
            image_url: imageUrl,
          },
        ]);

      if (error) throw error;

      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating vehicle:', error);
      setError('Erro ao salvar veículo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Voltar para o dashboard"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
            Adicionar Veículo
          </h1>
          <p className="text-text-secondary mt-1">
            Cadastre um novo veículo
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Foto do Veículo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="vehicle-image"
                />
                <label
                  htmlFor="vehicle-image"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-text-secondary">
                    {imageFile ? imageFile.name : 'Clique para adicionar uma foto'}
                  </span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                  Nome do Veículo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                  placeholder="Ex: Meu Civic"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-text-primary mb-2">
                  Categoria
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                  required
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="manufacturer" className="block text-sm font-medium text-text-primary mb-2">
                  Fabricante
                </label>
                <input
                  id="manufacturer"
                  name="manufacturer"
                  type="text"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                  placeholder="Ex: Honda"
                  required
                />
              </div>

              <div>
                <label htmlFor="model" className="block text-sm font-medium text-text-primary mb-2">
                  Modelo
                </label>
                <input
                  id="model"
                  name="model"
                  type="text"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                  placeholder="Ex: Civic 2020"
                  required
                />
              </div>

              <div>
                <label htmlFor="plate" className="block text-sm font-medium text-text-primary mb-2">
                  Placa/Inscrição
                </label>
                <input
                  id="plate"
                  name="plate"
                  type="text"
                  value={formData.plate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                  placeholder="Ex: ABC-1234"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Quilometragem/Horário Atual
                </label>
                <div className="flex space-x-2">
                  <input
                    name="current_mileage"
                    type="number"
                    value={formData.current_mileage}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                    placeholder="0"
                    required
                  />
                  <select
                    name="mileage_unit"
                    value={formData.mileage_unit}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                    aria-label="Unidade de Quilometragem/Horário"
                  >
                    <option value="km">km</option>
                    <option value="horas">horas</option>
                  </select>
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary text-black font-semibold py-3 px-6 rounded-xl hover:bg-yellow-500 focus:ring-4 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Salvando...' : 'Salvar Veículo'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};