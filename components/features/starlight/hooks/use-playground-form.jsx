'use client';

import { useState, useRef, useMemo } from 'react';

const INITIAL_FORM = {
  username: '',
  repository: '',
  borderRadius: '',
  customTitle: '',
  singleLanguage: false,
  sharpProgress: false,
  styledProgress: false,
  lightTheme: false,
};

const baseURL = 'https://api.webstray.com/starlight/';

export const usePlaygroundForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [copiedField, setCopiedField] = useState(null);
  const timerRef = useRef(null);

  const isValid = useMemo(() => !!(formData.username && formData.repository), [formData]);

  const finalUrl = useMemo(() => {
    const { username, repository, ...rest } = formData;
    const base = `${baseURL}user/${username || 'username'}/repository/${repository || 'repository'}`;
    const params = new URLSearchParams();

    Object.entries(rest).forEach(([key, val]) => {
      if (val) params.append(key, String(val));
    });

    return params.toString() ? `${base}?${params.toString()}` : base;
  }, [formData]);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedField(type);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopiedField(null), 2000);
  };

  const handleUpdate = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const reset = () => {
    setFormData(INITIAL_FORM);
    setCopiedField(null);
  };

  return { formData, isValid, finalUrl, copiedField, handleCopy, handleUpdate, reset };
};
