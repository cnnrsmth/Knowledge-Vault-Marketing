import { useState, useEffect } from "react";

export const useWaitlistSubmission = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [submittedEmails] = useState<Set<string>>(new Set());

  // Clear success/error states after delay
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const submitEmail = async (email: string) => {
    // Clear previous states
    setError(null);
    setSuccess(false);

    // Check if email was already submitted successfully
    if (submittedEmails.has(email)) {
      setError("Email already submitted");
      return;
    }

    // Rate limiting - 3 seconds between submissions
    const now = Date.now();
    if (now - lastSubmissionTime < 3000) {
      setError("Please wait a few seconds before trying again.");
      return;
    }

    // Basic email validation
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Invalid email format");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://knowledge-vault-waitlist-email.connor-smith391.workers.dev/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setLastSubmissionTime(now);
        submittedEmails.add(email); // Track successful submission
      } else if (response.status === 400) {
        setError("Invalid email format");
      } else {
        setError("Something went wrong, please try again.");
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { submitEmail, isLoading, error, success };
};
