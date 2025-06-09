import React, { useState } from 'react';
import { FormData } from './types';
import Preview from './components/Preview';
import StepIndicator from './components/StepIndicator';
import Step1Title from './components/steps/Step1Title';
import Step2Message from './components/steps/Step2Message';
import Step3Date from './components/steps/Step3Date';
import Step4Photos from './components/steps/Step4Photos';
import Step5Music from './components/steps/Step5Music';
import Step6Animation from './components/steps/Step6Animation';
import Step7Contact from './components/steps/Step7Contact';
import Step8Payment from './components/steps/Step8Payment';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    pageTitle: '',
    message: '',
    startDate: '',
    photos: [],
    youtubeUrl: '',
    animation: '',
    contact: {
      name: '',
      email: '',
      phone: ''
    },
    plan: ''
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    Step1Title,
    Step2Message,
    Step3Date,
    Step4Photos,
    Step5Music,
    Step6Animation,
    Step7Contact,
    Step8Payment
  ];

  const CurrentStepComponent = steps[currentStep];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Form Section - Top */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-pink-500 mb-2">Love Counter</h1>
            <p className="text-gray-300 text-sm">Crie sua página de amor personalizada</p>
          </div>
          
          <StepIndicator currentStep={currentStep} totalSteps={steps.length} />
          
          <CurrentStepComponent
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
            isFirst={currentStep === 0}
            isLast={currentStep === steps.length - 1}
          />
        </div>
      </div>
      
      {/* Preview Section - Bottom */}
      
      <div className="relative no-scrollbar overflow-x-hidden w-full min-h-screen lg:min-h-[85vh] lg:h-[85vh] lg:max-h-[85vh] rounded-lg bg-neutral-900 shadow-lg shadow-black">

        <div className="p-4">
          <h3 className="text-white text-center text-sm font-medium mb-3">Visualização em tempo real</h3>
          <Preview formData={formData} />
        </div>

         


      </div>
    </div>
    
  );
}

export default App;