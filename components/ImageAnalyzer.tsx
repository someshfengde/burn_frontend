'use client';
import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Check, Sparkles } from 'lucide-react';

interface FoodItem {
  food_item_name: string;
  calories: number;
}

interface ExerciseItem {
  exercise_name: string;
  duration: number;
  calories_burned: number;
}

interface AnalysisResponse {
  food_items: FoodItem[];
}

interface ExerciseResponse {
  recommendations: ExerciseItem[];
}

const ImageAnalyzer = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [exerciseRecommendations, setExerciseRecommendations] = useState<ExerciseItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const uploadedFile = event.target.files[0];
      
      // Validate file type and size
      if (!uploadedFile.type.startsWith('image/')) {
        setError('Please upload a valid image file');
        return;
      }

      if (uploadedFile.size > 10 * 1024 * 1024) { // 10MB limit
        setError('Image size should be less than 10MB');
        return;
      }

      setImage(uploadedFile);
      setError('');
      const previewUrl = URL.createObjectURL(uploadedFile);
      setImagePreview(previewUrl);
    }
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview(null);
    setFoodItems([]);
    setExerciseRecommendations([]);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    setIsLoading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('image', image);
      
      const response = await fetch('https://burn-1.onrender.com/api/v1/ask_llama/analyze-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      const analysisData: AnalysisResponse = await response.json();
      setFoodItems(analysisData.food_items);

      const exerciseResponse = await fetch('https://burn-1.onrender.com/api/v1/ask_llama/get_exercise_recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          food_items: analysisData.food_items
        }),
      });

      if (!exerciseResponse.ok) {
        throw new Error('Failed to get exercise recommendations');
      }

      const exerciseData: ExerciseResponse = await exerciseResponse.json();
      setExerciseRecommendations(exerciseData.recommendations);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalCalories = foodItems.reduce((sum, item) => sum + item.calories, 0);
  const totalCaloriesBurned = exerciseRecommendations.reduce((sum, item) => sum + item.calories_burned, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-white p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="text-yellow-300" />
                Nutritional Image Analyzer
              </h1>
              <p className="text-sm text-white/80 mt-1">
                Upload an image of your meal and get instant nutritional insights
              </p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid md:grid-cols-3 gap-6 p-6">
          {/* Image Upload Section */}
          <div className="md:col-span-1 bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-200">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            
            {!imagePreview ? (
              <label 
                htmlFor="image-upload" 
                className="
                  cursor-pointer 
                  flex 
                  flex-col 
                  items-center 
                  justify-center 
                  h-full 
                  text-center 
                  hover:bg-gray-100 
                  rounded-lg 
                  p-6 
                  transition
                "
              >
                <Upload className="text-orange-500 mb-4" size={48} />
                <p className="text-gray-600 font-medium">
                  Drag and drop or click to upload
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  PNG, JPG up to 10MB
                </p>
              </label>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Uploaded"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  onClick={clearImage}
                  className="
                    absolute 
                    top-2 
                    right-2 
                    bg-red-500 
                    text-white 
                    rounded-full 
                    p-1 
                    hover:bg-red-600 
                    transition
                  "
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Analyze Button */}
          <div className="md:col-span-1 flex items-center justify-center">
            <button
              onClick={analyzeImage}
              disabled={isLoading || !image}
              className="
                flex 
                items-center 
                gap-2 
                px-6 
                py-3 
                bg-gradient-to-r 
                from-orange-500 
                to-red-500 
                text-white 
                rounded-full 
                font-semibold 
                shadow-lg 
                hover:scale-105 
                transition-all 
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {isLoading ? 'Analyzing...' : 'Analyze Image'}
              {!isLoading && <Check size={20} />}
            </button>
          </div>

          {/* Results Section */}
          <div className="md:col-span-1 bg-gray-50 rounded-xl p-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 flex items-center gap-2">
                <X className="text-red-500" />
                {error}
              </div>
            )}
            
            {!foodItems.length && !error && !isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <ImageIcon size={48} className="text-gray-300 mb-4" />
                <p>Upload an image to see nutritional details</p>
              </div>
            )}

            {foodItems.length > 0 && (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="text-orange-500" /> 
                    Detected Food Items
                  </h3>
                  {foodItems.map((item, index) => (
                    <div 
                      key={index} 
                      className="
                        flex 
                        justify-between 
                        items-center 
                        p-2 
                        rounded-md 
                        hover:bg-gray-50 
                        transition
                      "
                    >
                      <span>{item.food_item_name}</span>
                      <span className="text-orange-600 font-medium">
                        {item.calories} cal
                      </span>
                    </div>
                  ))}
                  <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                    <span>Total Calories</span>
                    <span className="text-orange-600">{totalCalories} cal</span>
                  </div>
                </div>

                {exerciseRecommendations.length > 0 && (
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Sparkles className="text-green-500" /> 
                      Exercise Recommendations
                    </h3>
                    {exerciseRecommendations.map((exercise, index) => (
                      <div 
                        key={index} 
                        className="
                          p-2 
                          rounded-md 
                          hover:bg-gray-50 
                          transition
                        "
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{exercise.exercise_name}</span>
                          <span className="text-green-600">
                            {exercise.calories_burned} cal
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {exercise.duration} minutes
                        </div>
                      </div>
                    ))}
                    <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                      <span>Total Calories Burned</span>
                      <span className="text-green-600">{totalCaloriesBurned} cal</span>
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

export default ImageAnalyzer;