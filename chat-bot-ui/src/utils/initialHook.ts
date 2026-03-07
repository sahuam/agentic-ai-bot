import { useState } from "react";

export function useComponentInit() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return { isLoading: loading, error, setLoading, setError };
}
