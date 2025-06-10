import React, { useState, useEffect } from 'react';
import { Heart, Star, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { FormData } from '../types';

interface PreviewProps {
  formData: FormData;
}

const Preview: React.FC<PreviewProps> = ({ formData }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Auto-advance photos every 3 seconds
  useEffect(() => {
    if (formData.photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % formData.photos.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [formData.photos.length]);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % formData.photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + formData.photos.length) % formData.photos.length);
  };

  const goToPhoto = (index: number) => {
    setCurrentPhotoIndex(index);
  };

  const getAnimationComponent = () => {
    switch (formData.animation) {
      case 'hearts':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <Heart
                key={i}
                className="absolute text-pink-500 animate-bounce"
                style={{
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 90}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
                size={12}
              />
            ))}
          </div>
        );
      case 'meteors':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="absolute text-yellow-400 animate-ping"
                style={{
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 90}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
                size={10}
              />
            ))}
          </div>
        );
      case 'aurora':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-green-500/20 animate-pulse" />
            {[...Array(4)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute text-blue-300 animate-pulse"
                style={{
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 90}%`,
                  animationDelay: `${i * 0.4}s`,
                }}
                size={10}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const calculateTimeDifference = (startDate: string) => {
    if (!startDate) return null;
    
    const start = new Date(startDate);
    const now = new Date();
    const diff = now.getTime() - start.getTime();
    
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { years, months, days, hours, minutes, seconds };
  };

  const timeDiff = calculateTimeDifference(formData.startDate);

  return (
    <div className="w-full max-w-sm mx-auto h-10000 bg-gray-10000 rounded-xl overflow-hidden relative shadow-2xl">
      {getAnimationComponent()}
      
      <div className="">
        {/* Photo Carousel */}
        {formData.photos.length > 0 && (
          <div className="relative h-48 bg-gray-700 overflow-hidden">
            <img
              src={formData.photos[currentPhotoIndex]}
              alt={`Foto ${currentPhotoIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation arrows */}
            {formData.photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight size={14} />
                </button>
              </>
            )}
            
            {/* Dots indicator */}
            {formData.photos.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                {formData.photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPhoto(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
            
            {/* Hearts overlay */}
            <div className="absolute bottom-3 left-3">
              <Heart className="text-red-500 fill-current" size={16} />
            </div>
            <div className="absolute top-3 right-3">
              <Heart className="text-red-500 fill-current" size={14} />
            </div>
          </div>
        )}
        
        {/* Content */}


        
        <div className="">

          <div className="text-center">
            <h1 className="text-lg font-bold text-red-400 mb-1 font-serif italic">
              
              {formData.pageTitle || '(visualização em tempo real)'}
            </h1>
            <p className="text-gray-300 text-xs">
              {formData.pageTitle ? formData.pageTitle.toLowerCase() : 'fefefefefscscs'}
            </p>
          </div>









          

          {formData.message && (
            <div className="text-center">
              <p className="text-white text-xs leading-relaxed">
                {formData.message}
              </p>
            </div>
          )}

          {timeDiff && (
            <div className="text-center">
              <p className="text-white text-xs mb-3">Compartilhando momentos há</p>
              
              <div className="grid grid-cols-3 gap-1 text-center">
                <div className="bg-gray-700/50 rounded-lg p-2">
                  <div className="text-white text-sm font-bold">{timeDiff.years.toString().padStart(2, '0')}</div>
                  <div className="text-gray-400 text-xs">anos</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-2">
                  <div className="text-white text-sm font-bold">{timeDiff.months.toString().padStart(2, '0')}</div>
                  <div className="text-gray-400 text-xs">meses</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-2">
                  <div className="text-white text-sm font-bold">{timeDiff.days.toString().padStart(2, '0')}</div>
                  <div className="text-gray-400 text-xs">dias</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-1 text-center mt-1">
                <div className="bg-gray-700/50 rounded-lg p-2">
                  <div className="text-white text-sm font-bold">{timeDiff.hours.toString().padStart(2, '0')}</div>
                  <div className="text-gray-400 text-xs">horas</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-2">
                  <div className="text-white text-sm font-bold">{timeDiff.minutes.toString().padStart(2, '0')}</div>
                  <div className="text-gray-400 text-xs">minutos</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-2">
                  <div className="text-white text-sm font-bold">{timeDiff.seconds.toString().padStart(2, '0')}</div>
                  <div className="text-gray-400 text-xs">segundos</div>
                </div>
              </div>
            </div>
          )}

          {formData.youtubeUrl && (
            <div className="bg-red-600/20 rounded-lg p-2 text-center">
              <p className="text-red-300 text-xs">🎵 Música: YouTube</p>
            </div>
          )}

          {formData.animation && (
            <div className="text-center">
              <p className="text-purple-300 text-xs">
                ✨ Animação: {
                  formData.animation === 'hearts' ? 'Chuva de Corações' :
                  formData.animation === 'meteors' ? 'Meteoros' :
                  'Aurora Boreal'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;