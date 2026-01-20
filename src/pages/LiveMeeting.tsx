import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mic, MicOff, Square, ArrowLeft, Clock, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { groq } from "@/lib/groq";
import { toast } from "sonner";

interface TranscriptEntry {
  id: string;
  speaker: string;
  text: string;
  timestamp: string;
}

export default function LiveMeeting() {
  const navigate = useNavigate();
  const {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    error: speechError,
  } = useSpeechRecognition();

  const [transcriptEntries, setTranscriptEntries] = useState<TranscriptEntry[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [summary, setSummary] = useState<string>("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const previousTranscriptRef = useRef("");

  // Update elapsed time
  useEffect(() => {
    if (!isListening || !startTime) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime.getTime()) / 1000);
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [isListening, startTime]);

  // Handle transcript updates - add new text as entries when it becomes final
  useEffect(() => {
    if (!transcript) return;

    // Check if we have new final text (when transcript stops growing, it's likely final)
    const currentText = transcript.trim();
    if (currentText && currentText !== previousTranscriptRef.current) {
      // Simple approach: add transcript chunks as they come in
      // In a real implementation, you'd wait for final results
      previousTranscriptRef.current = currentText;
    }
  }, [transcript]);

  const handleStartRecording = () => {
    if (!isSupported) {
      toast.error("Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (speechError) {
      toast.error(speechError);
      return;
    }

    resetTranscript();
    setTranscriptEntries([]);
    setSummary("");
    setStartTime(new Date());
    setElapsedTime(0);
    previousTranscriptRef.current = "";
    startListening();
    toast.success("Recording started. Start speaking!");
  };

  const handleStopRecording = async () => {
    stopListening();
    
    const fullTranscript = transcript.trim();
    
    if (!fullTranscript) {
      toast.info("No speech detected. Please try again.");
      return;
    }

    // Add final transcript as an entry
    if (fullTranscript && !transcriptEntries.some(e => e.text === fullTranscript)) {
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = elapsedTime % 60;
      const timestamp = `${minutes}:${seconds.toString().padStart(2, '0')}`;

      const finalEntry: TranscriptEntry = {
        id: Date.now().toString(),
        speaker: "Speaker",
        text: fullTranscript,
        timestamp,
      };

      setTranscriptEntries((prev) => [...prev, finalEntry]);
    }

    // Generate summary using Groq
    setIsGeneratingSummary(true);
    toast.info("Generating summary...");

    try {
      const transcriptForSummary = transcriptEntries.length > 0
        ? transcriptEntries.map(e => e.text).join(" ")
        : fullTranscript;
      
      if (!transcriptForSummary.trim()) {
        toast.error("No transcript available for summarization");
        setIsGeneratingSummary(false);
        return;
      }

      // Use streaming summarization
      let summaryText = "";
      for await (const chunk of groq.summarizeTextStream(transcriptForSummary)) {
        summaryText += chunk;
        setSummary(summaryText);
      }

      toast.success("Summary generated successfully!");
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate summary");
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border flex items-center justify-between px-6 glass">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="font-semibold">New Meeting</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {formatTime(elapsedTime)}
              </span>
            </div>
          </div>
        </div>

        {isListening && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/20">
            <span className="recording-dot" />
            <span className="text-sm font-medium text-destructive">Recording</span>
          </div>
        )}
      </header>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Transcript panel */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-3xl mx-auto space-y-4">
              {transcriptEntries.length === 0 && !transcript && (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="mb-2">Click the microphone to start recording</p>
                  <p className="text-sm">Your speech will be transcribed in real-time</p>
                </div>
              )}

              {transcriptEntries.map((entry) => (
                <div key={entry.id} className="group">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium">{entry.speaker[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{entry.speaker}</span>
                        <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                      </div>
                      <p className="text-muted-foreground">{entry.text}</p>
                    </div>
                  </div>
                </div>
              ))}

              {transcript && !transcriptEntries.some(e => e.text === transcript) && (
                <div className="flex items-start gap-3 opacity-70">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium">S</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">Speaker</span>
                      <span className="text-xs text-muted-foreground">{formatTime(elapsedTime)}</span>
                    </div>
                    <p className="text-muted-foreground italic">{transcript}</p>
                  </div>
                </div>
              )}

              {isListening && transcriptEntries.length === 0 && !transcript && (
                <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm">Listening... Start speaking</span>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="border-t border-border p-6">
            <div className="flex items-center justify-center gap-4">
              {!isListening ? (
                <Button
                  variant="hero"
                  size="icon"
                  className="w-16 h-16 rounded-full"
                  onClick={handleStartRecording}
                  disabled={!isSupported}
                >
                  <Mic className="w-6 h-6" />
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "w-14 h-14 rounded-full",
                      isMuted && "bg-destructive/10 border-destructive text-destructive"
                    )}
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                  </Button>

                  <Button
                    variant="recording"
                    size="icon"
                    className="w-16 h-16 rounded-full"
                    onClick={handleStopRecording}
                    disabled={isGeneratingSummary}
                  >
                    {isGeneratingSummary ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <Square className="w-6 h-6 fill-current" />
                    )}
                  </Button>
                </>
              )}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-4">
              {!isListening
                ? "Click the microphone to start recording"
                : isGeneratingSummary
                ? "Generating summary..."
                : "Click the stop button to end the meeting and generate summary"}
            </p>
          </div>
        </div>

        {/* Right sidebar - Summary */}
        <aside className="w-80 border-l border-border p-6 hidden lg:block">
          <h3 className="font-semibold mb-4">Summary</h3>
          
          <div className="space-y-4">
            {isGeneratingSummary && !summary && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            )}

            {summary && (
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="prose prose-sm max-w-none">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{summary}</p>
                </div>
              </div>
            )}

            {!summary && !isGeneratingSummary && (
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-sm text-muted-foreground">
                  Summary will appear here after you stop recording.
                </p>
              </div>
            )}

            {transcriptEntries.length > 0 && (
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="text-sm font-medium mb-2">Transcript Stats</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Entries: {transcriptEntries.length}</p>
                  <p>Duration: {formatTime(elapsedTime)}</p>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
