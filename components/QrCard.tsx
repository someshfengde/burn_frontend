import { LoaderIcon } from 'lucide-react';

type QrCardProps = {
  imageURL?: string;
  time: string;
};

export const QrCard: React.FC<QrCardProps> = ({ imageURL, time }) => {
  if (!imageURL) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-gray-200 text-center">
        <div className="bg-orange-100 p-4 rounded-full mb-4">
          <LoaderIcon 
            className="text-orange-500 animate-pulse" 
            size={32} 
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          QR Code Loading
        </h3>
        <p className="text-gray-500">
          Please wait while we generate your QR code
        </p>
      </div>
    );
  }

  return (
    <div className="
      relative 
      w-full 
      max-w-md 
      mx-auto 
      bg-white 
      rounded-xl 
      shadow-lg 
      overflow-hidden 
      transition-all 
      duration-300 
      hover:shadow-xl 
      group
    ">
      <div className="relative pt-[100%] w-full">
        <img
          src={imageURL}
          className="
            absolute 
            top-0 
            left-0 
            w-full 
            h-full 
            object-contain 
            p-4 
            group-hover:scale-105 
            transition-transform 
            duration-300
          "
          alt="Generated QR Code"
        />
      </div>
      
      <div className="
        absolute 
        bottom-0 
        left-0 
        right-0 
        bg-gradient-to-t 
        from-gray-100/90 
        to-transparent 
        p-4 
        text-center
      ">
        <div className="
          bg-orange-50 
          border 
          border-orange-200 
          rounded-full 
          inline-block 
          px-3 
          py-1 
          text-sm 
          text-orange-600
        ">
          Generated in {time} seconds
        </div>
      </div>
    </div>
  );
};

export default QrCard;
