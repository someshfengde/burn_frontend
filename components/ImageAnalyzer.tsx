"use client";
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setError('');
      const previewUrl = URL.createObjectURL(event.target.files[0]);
      setImagePreview(previewUrl);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    setIsLoading(true);
    setError('');
    
    try {
      // First API call to analyze image
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

      // Second API call to get exercise recommendations
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
    <div className="flex w-full min-h-screen gap-4 p-4">
      {/* Left Section - Image Upload */}
      <Card className="flex-1">
      <CardContent className="p-4">
        <div className={`flex flex-col items-center justify-center gap-4 ${imagePreview ? 'h-auto' : 'h-64'}`}>
          {!imagePreview && (
            <div
              onDrop={(event) => {
                event.preventDefault();
                if (event.dataTransfer.files && event.dataTransfer.files[0]) {
                  handleImageUpload({ target: { files: event.dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>);
                }
              }}
              onDragOver={(event) => {
                event.preventDefault();
              }}
              className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 cursor-pointer hover:border-gray-400"
            >
              <label htmlFor="image-upload" className="flex flex-col items-center justify-center">
                <p className="text-gray-700">Drag and drop your image here, or</p>
                <p className="text-blue-600 hover:underline">click to select a file</p>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}
          {imagePreview && (
            <div className="flex justify-start items-center w-full min-h-[16rem]">
              <img
                src={imagePreview}
                alt="Preview"
                className="object-contain max-h-96"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>

      {/* Middle Section - Analyze Button */}
      <div className="flex items-center">
        <Button 
          onClick={analyzeImage} 
          disabled={isLoading || !image}
          className="px-8 py-6 text-lg"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Image →'}
        </Button>
      </div>

      {/* Right Section - Results */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}
          
          {foodItems.length > 0 && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Detected Food Items</h3>
                <div className="space-y-2">
                  {foodItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="font-medium">{item.food_item_name}</span>
                      <span className="text-gray-600">{item.calories} calories</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center p-2 mt-2 border-t border-gray-200">
                    <span className="font-bold">Total Calories</span>
                    <span className="font-bold">{totalCalories} calories</span>
                  </div>
                </div>
              </div>

              {exerciseRecommendations.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Exercise Recommendations</h3>
                  <div className="space-y-2">
                    {exerciseRecommendations.map((exercise, index) => (
                      <div key={index} className="p-2 bg-white rounded">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{exercise.exercise_name}</span>
                          <span className="text-gray-600">{exercise.calories_burned} calories</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Duration: {exercise.duration} minutes
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center p-2 mt-2 border-t border-gray-200">
                      <span className="font-bold">Total Calories Burned</span>
                      <span className="font-bold">{totalCaloriesBurned} calories</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {!foodItems.length && !error && !isLoading && (
            <div className="text-center text-gray-500">
              Upload an image and click analyze to see results
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageAnalyzer;