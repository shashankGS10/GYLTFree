/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useCourseStore } from '@/store/useCourseStore';

export const useCourses = () => {
  const { setCourses } = useCourseStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Swap this with Supabase / API when available
        const res = await fetch('/mockData/dummyCourses.json');
        if (!res.ok) throw new Error('Failed to fetch course data');

        const data = await res.json();
        setCourses(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [setCourses]);

  return { loading, error };
};
