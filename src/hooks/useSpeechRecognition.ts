"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SpeechRecognitionResultList = {
  length: number;
  [index: number]: {
    isFinal: boolean;
    [index: number]: { transcript: string };
  };
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: SpeechRecognitionResultList;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};

function getSpeechRecognitionCtor():
  | (new () => SpeechRecognitionLike)
  | undefined {
  if (typeof window === "undefined") return undefined;

  const win = window as typeof window & {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };

  return win.SpeechRecognition ?? win.webkitSpeechRecognition;
}

function getTranscript(event: SpeechRecognitionEventLike) {
  let transcript = "";

  for (let index = event.resultIndex; index < event.results.length; index += 1) {
    transcript += event.results[index][0]?.transcript ?? "";
  }

  const lastResult = event.results[event.results.length - 1];
  const isFinal = lastResult?.isFinal ?? false;

  return {
    transcript: transcript.trim(),
    isFinal,
  };
}

export function useSpeechRecognition({
  onResult,
  lang = "en-US",
}: {
  onResult: (transcript: string, isFinal: boolean) => void;
  lang?: string;
}) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState("");
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const onResultRef = useRef(onResult);

  onResultRef.current = onResult;

  useEffect(() => {
    const Ctor = getSpeechRecognitionCtor();
    setIsSupported(Boolean(Ctor));
    if (!Ctor) return;

    const recognition = new Ctor();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = lang;

    recognition.onresult = (event) => {
      const { transcript, isFinal } = getTranscript(event);
      if (!transcript) return;
      onResultRef.current(transcript, isFinal);
    };

    recognition.onerror = (event) => {
      if (event.error === "aborted") {
        setIsListening(false);
        return;
      }

      if (event.error === "no-speech") {
        setError("No speech detected. Try again.");
      } else if (event.error === "not-allowed") {
        setError("Microphone permission denied.");
      } else {
        setError("Voice search is unavailable. Please type instead.");
      }

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
      recognitionRef.current = null;
    };
  }, [lang]);

  const startListening = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      setError("Voice search is not supported in this browser.");
      return;
    }

    try {
      setError("");
      setIsListening(true);
      recognition.start();
    } catch {
      setIsListening(false);
      setError("Could not start voice search. Try again.");
    }
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
      return;
    }

    startListening();
  }, [isListening, startListening, stopListening]);

  return {
    isListening,
    isSupported,
    error,
    setError,
    startListening,
    stopListening,
    toggleListening,
  };
}
