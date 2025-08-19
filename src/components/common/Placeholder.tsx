import React from 'react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
          {title}
        </h1>
        <p className="text-text-secondary mt-1">
          {description}
        </p>
      </div>

      <div className="text-center py-16">
        {icon && (
          <div className="mb-6 flex justify-center">
            {icon}
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-sm p-12">
          <img
            src="./public/biu.png"
            alt="Em desenvolvimento"
            className="w-32 h-32 mx-auto mb-6 rounded-full opacity-50"
          />
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Em desenvolvimento
          </h2>
          <p className="text-text-secondary">
            Esta funcionalidade estará disponível em breve.
          </p>
        </div>
      </div>
    </div>
  );
};