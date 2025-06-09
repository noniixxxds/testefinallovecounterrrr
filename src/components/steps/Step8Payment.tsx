import React, { useState } from 'react';
import { CreditCard, QrCode, ArrowLeft, Shield } from 'lucide-react';
import { StepProps } from '../../types';

const Step8Payment: React.FC<StepProps> = ({ formData, updateFormData, onNext, onBack, isFirst, isLast }) => {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit' | ''>('');
  const [creditCardData, setCreditCardData] = useState({
    cpf: '',
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  });

  const handleCreditCardChange = (field: string, value: string) => {
    setCreditCardData(prev => ({ ...prev, [field]: value }));
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})\d+?$/, '$1');
  };

  const formatExpiry = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2}\/\d{2})\d+?$/, '$1');
  };

  const handleFinalizeOrder = () => {
    alert('Processando pagamento...');
  };

  return (
    <div className="form-step">
      <h1 className="text-xl font-bold text-white mb-2">Finalizar pedido</h1>
      <p className="text-gray-300 mb-6 text-sm">
        Revise seus itens antes do pagamento
      </p>

      {/* Order Summary */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-bold text-white mb-3">Resumo do pedido</h2>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-white text-xl font-bold">Total</span>
          <span className="text-white text-xl font-bold">R$ 27,00</span>
        </div>

        <div className="flex items-center gap-3 bg-orange-900/20 border border-orange-700 rounded-lg p-3">
          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">⚡</span>
          </div>
          <div className="flex-1">
            <p className="text-orange-300 font-semibold text-sm">Oferta por tempo limitado</p>
            <span className="bg-green-700 text-green-100 px-2 py-1 rounded text-xs">
              Economize 50%
            </span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-bold text-white mb-3">Método de pagamento</h3>
        <p className="text-gray-300 mb-4 text-sm">Escolha o método de pagamento ideal para você</p>

        <div className="space-y-3 mb-4">
          <button
            onClick={() => setPaymentMethod('pix')}
            className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
              paymentMethod === 'pix'
                ? 'border-pink-500 bg-pink-900/20'
                : 'border-gray-600 bg-gray-700 hover:border-gray-500'
            }`}
          >
            <QrCode className="text-green-400" size={20} />
            <span className="text-white font-semibold text-sm">Pix</span>
            {paymentMethod === 'pix' && <span className="ml-auto text-pink-400">✓</span>}
          </button>

          <button
            onClick={() => setPaymentMethod('credit')}
            className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
              paymentMethod === 'credit'
                ? 'border-pink-500 bg-pink-900/20'
                : 'border-gray-600 bg-gray-700 hover:border-gray-500'
            }`}
          >
            <CreditCard className="text-blue-400" size={20} />
            <span className="text-white font-semibold text-sm">Cartão de Crédito</span>
            {paymentMethod === 'credit' && <span className="ml-auto text-pink-400">✓</span>}
          </button>
        </div>

        {paymentMethod === 'credit' && (
          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-white text-xs font-medium mb-1">CPF</label>
              <input
                type="text"
                placeholder="Ex: 999.999.999-99"
                value={creditCardData.cpf}
                onChange={(e) => handleCreditCardChange('cpf', formatCPF(e.target.value))}
                maxLength={14}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-white text-xs font-medium mb-1">Nome</label>
              <input
                type="text"
                placeholder="Ex: João da Silva"
                value={creditCardData.name}
                onChange={(e) => handleCreditCardChange('name', e.target.value)}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-white text-xs font-medium mb-1">Número do Cartão</label>
              <input
                type="text"
                placeholder="Ex: 1234 5678 123 4567"
                value={creditCardData.number}
                onChange={(e) => handleCreditCardChange('number', formatCardNumber(e.target.value))}
                maxLength={19}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white text-xs font-medium mb-1">Validade</label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  value={creditCardData.expiry}
                  onChange={(e) => handleCreditCardChange('expiry', formatExpiry(e.target.value))}
                  maxLength={5}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-pink-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-white text-xs font-medium mb-1">CVV</label>
                <input
                  type="text"
                  placeholder="Ex: 123"
                  value={creditCardData.cvv}
                  onChange={(e) => handleCreditCardChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 3))}
                  maxLength={3}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-pink-500 transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod && (
          <button
            onClick={handleFinalizeOrder}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm"
          >
            {paymentMethod === 'pix' ? 'Gerar código PIX' : 'Realizar pagamento'}
          </button>
        )}

        {paymentMethod && (
          <div className="flex items-center justify-center gap-2 text-gray-400 text-xs mt-3">
            <Shield size={14} />
            <span>Pagamento seguro por Pagar.me</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
        >
          Voltar etapa
        </button>
      </div>
    </div>
  );
};

export default Step8Payment;