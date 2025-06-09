import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { StepProps } from '../../types';

const Step7Contact: React.FC<StepProps> = ({ formData, updateFormData, onNext, onBack, isFirst, isLast }) => {
  const handleContactChange = (field: 'name' | 'email' | 'phone', value: string) => {
    updateFormData({
      contact: {
        ...formData.contact,
        [field]: value
      }
    });
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const canProceed = formData.contact.name.trim() && 
                    formData.contact.email.trim() && 
                    isValidEmail(formData.contact.email);

  return (
    <div className="form-step">
      <h1 className="text-xl font-bold text-white mb-2">Informações de contato</h1>
      <p className="text-gray-300 mb-6 text-sm">
        Precisamos de suas informações para enviar sua página personalizada.
      </p>
      
      <div className="space-y-4 mb-6">
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Seu nome completo"
            value={formData.contact.name}
            onChange={(e) => handleContactChange('name', e.target.value)}
            className="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
          />
        </div>
        
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="email"
            placeholder="seu@email.com"
            value={formData.contact.email}
            onChange={(e) => handleContactChange('email', e.target.value)}
            className="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
          />
          {formData.contact.email && !isValidEmail(formData.contact.email) && (
            <p className="text-red-400 text-xs mt-1">Por favor, insira um email válido</p>
          )}
        </div>
        
        <div className="relative">
          <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="tel"
            placeholder="(11) 99999-9999 (opcional)"
            value={formData.contact.phone}
            onChange={(e) => handleContactChange('phone', e.target.value)}
            className="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
          />
        </div>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
        >
          Voltar etapa
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="flex-1 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm"
        >
          Próxima etapa
        </button>
      </div>
    </div>
  );
};

export default Step7Contact;