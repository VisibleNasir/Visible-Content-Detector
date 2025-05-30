import { useState, useRef, ReactNode } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { ShinyButton } from "@/components/magicui/shiny-button";

interface PredictionResult {
  result: string;
  predicted_class: ReactNode;
  confidence_scores: { [label: string]: number };
  error: string | null;
}

const Detect = () => {
  const [videoResult, setVideoResult] = useState<PredictionResult | null>(null);
  const [loadingVideo, setLoadingVideo] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [imageResult, setImageResult] = useState<PredictionResult | null>(null);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState<string>('');
  const [textResult, setTextResult] = useState<PredictionResult | null>(null);
  const [loadingText, setLoadingText] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setImageResult(null);
      setError(null);
    }
  };

  const handleImageDetect = async () => {
    if (!file) {
      setError("Please select an image");
      setImageResult(null);
      return;
    }

    setLoadingImage(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction");
      }

      const result: PredictionResult = await response.json();
      setImageResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setImageResult({
        result: `Error: ${errorMessage}`,
        predicted_class: null,
        confidence_scores: {},
        error: errorMessage,
      });
      setError(errorMessage);
    } finally {
      setLoadingImage(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setImageResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleTextDetect = async () => {
    if (!text.trim()) {
      setTextResult({
        result: "Please enter some text to analyze.",
        predicted_class: null,
        confidence_scores: {},
        error: "No text provided",
      });
      return;
    }

    setLoadingText(true);
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data: PredictionResult = await response.json();
      if (response.ok) {
        setTextResult(data);
      } else {
        setTextResult({
          result: `Error: ${data.error}`,
          predicted_class: null,
          confidence_scores: {},
          error: data.error,
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to connect to the server.";
      setTextResult({
        result: `Error: ${errorMessage}`,
        predicted_class: null,
        confidence_scores: {},
        error: errorMessage,
      });
    } finally {
      setLoadingText(false);
    }
  };

  const handleVideoDetect = async () => {
    // Mock API response (replace with actual backend call)
    setLoadingVideo(true);
    try {
      // Simulate API call (replace with actual fetch to your video backend)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setVideoResult({
        result: "No harmful content found in video",
        predicted_class: "no harmful",
        confidence_scores: { "no harmful": 0.95, "harmful": 0.05 },
        error: null,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setVideoResult({
        result: `Error: ${errorMessage}`,
        predicted_class: null,
        confidence_scores: {},
        error: errorMessage,
      });
    } finally {
      setLoadingVideo(false);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-12 mt-8 px-4 w-full">
      {/* Text Detection */}
      <Card className="w-[350px] min-h-[500px] bg-zinc-900 border-zinc-800 text-white flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
        <div>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Text Detection</CardTitle>
            <CardDescription className="text-lg">Analyze any written content instantly.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="text" className="text-lg">Enter Text</Label>
              <Textarea
                id="text"
                rows={6}
                placeholder="Paste your content here..."
                className="bg-zinc-800 text-white h-42"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            {loadingText ? (
              <div className="relative">
                <Skeleton className="h-12 w-full bg-zinc-800 animate-pulse" aria-busy="true" />
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-400 text-lg font-medium">
                  Processing...
                </p>
              </div>
            ) : textResult ? (
              <div
                className={`font-medium border p-3 rounded-md text-lg ${
                  textResult.error || textResult.result.toLowerCase().includes('error')
                    ? 'text-red-400 bg-zinc-800'
                    : textResult.result.toLowerCase().includes('no harmful')
                    ? 'text-green-400 bg-zinc-900'
                    : 'text-red-400 bg-zinc-800'
                }`}
              >
                {textResult.error ? (
                  <p>{textResult.result}</p>
                ) : (
                  <>
                    <p>{textResult.result}</p>
                    <p>Predicted Class: {textResult.predicted_class}</p>
                    <p>Confidence Scores:</p>
                    <ul className="list-disc pl-5">
                      {Object.entries(textResult.confidence_scores).map(([label, score]) => (
                        <li key={label}>{label}: {(score * 100).toFixed(2)}%</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ) : null}
          </CardContent>
        </div>
        <CardFooter className="flex justify-end p-4">
          <ShinyButton className="px-6 py-2 text-xl" onClick={handleTextDetect}>
            Detect
          </ShinyButton>
        </CardFooter>
      </Card>

      {/* Image Detection */}
      <Card className="w-[350px] min-h-[500px] bg-zinc-900 border-zinc-800 text-white flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
        <div>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Image Detection</CardTitle>
            <CardDescription className="text-lg">Upload an image to detect harmful content.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="image" className="text-lg">Upload Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="bg-zinc-800 text-white h-30 file:text-black file:bg-purple-200 file:px-6 file:rounded-md"
              />
            </div>
            {loadingImage ? (
              <div className="relative">
                <Skeleton className="h-12 w-full bg-zinc-800 animate-pulse" aria-busy="true" />
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-400 text-lg font-medium">
                  Processing...
                </p>
              </div>
            ) : imageResult ? (
              <div
                className={`font-medium border p-3 rounded-md text-lg ${
                  imageResult.error || imageResult.result.toLowerCase().includes('error')
                    ? 'text-red-400 bg-zinc-800'
                    : imageResult.result.toLowerCase().includes('no harmful')
                    ? 'text-green-400 bg-zinc-900'
                    : 'text-red-400 bg-zinc-800'
                }`}
              >
                {imageResult.error ? (
                  <p>{imageResult.result}</p>
                ) : (
                  <>
                    <p>{imageResult.result}</p>
                    <p>Predicted Class: {imageResult.predicted_class}</p>
                    <p>Confidence Scores:</p>
                    <ul className="list-disc pl-5">
                      {Object.entries(imageResult.confidence_scores).map(([label, score]) => (
                        <li key={label}>{label}: {(score * 100).toFixed(2)}%</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ) : error ? (
              <p className="text-red-400 font-medium border p-3 rounded-md bg-zinc-900 text-lg">
                {error}
              </p>
            ) : null}
          </CardContent>
        </div>
        <CardFooter className="flex justify-end p-4 gap-4">
          <Button className="px-6 py-2 text-xl bg-gray-500" onClick={handleReset}>
            Reset
          </Button>
          <Button
            className="px-6 py-2 text-xl bg-blue-500 disabled:bg-blue-300"
            onClick={handleImageDetect}
            disabled={loadingImage || !file}
          >
            Detect
          </Button>
        </CardFooter>
      </Card>

      {/* Video Detection */}
      <Card className="w-[350px] min-h-[500px] bg-zinc-900 border-zinc-800 text-white flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
        <div>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Video Detection</CardTitle>
            <CardDescription className="text-lg">Submit a video file to scan for unsafe content.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="video" className="text-lg">Upload Video</Label>
              <Input
                id="video"
                type="file"
                accept="video/*"
                className="bg-zinc-800 text-white h-30 file:text-black file:bg-purple-200 file:px-6 file:rounded-md"
              />
            </div>
            {loadingVideo ? (
              <div className="relative">
                <Skeleton className="h-12 w-full bg-zinc-800 animate-pulse" aria-busy="true" />
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-400 text-lg font-medium">
                  Processing...
                </p>
              </div>
            ) : videoResult ? (
              <div
                className={`font-medium border p-3 rounded-md text-lg ${
                  videoResult.error || videoResult.result.toLowerCase().includes('error')
                    ? 'text-red-400 bg-zinc-800'
                    : videoResult.result.toLowerCase().includes('no harmful')
                    ? 'text-green-400 bg-zinc-900'
                    : 'text-red-400 bg-zinc-800'
                }`}
              >
                {videoResult.error ? (
                  <p>{videoResult.result}</p>
                ) : (
                  <>
                    <p>{videoResult.result}</p>
                    <p>Predicted Class: {videoResult.predicted_class}</p>
                    <p>Confidence Scores:</p>
                    <ul className="list-disc pl-5">
                      {Object.entries(videoResult.confidence_scores).map(([label, score]) => (
                        <li key={label}>{label}: {(score * 100).toFixed(2)}%</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ) : null}
          </CardContent>
        </div>
        <CardFooter className="flex justify-end p-4">
          <ShinyButton className="px-6 py-2 text-xl" onClick={handleVideoDetect}>
            Detect
          </ShinyButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Detect;