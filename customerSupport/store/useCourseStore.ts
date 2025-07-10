import { create } from 'zustand';

export type Course = {
    courseId: string;
    title: string;
    subject: string;
    subjectThumbnail?: string;
    sessions: number;
    completedSessions: number;
    progressPercentage: number;
    rating: number;
    version: string;
    lastOpened?: string;
    nextLesson?: string;
    mentorLink?: string;
    llmMentorName?: string;
    status: 'enrolled' | 'completed' | 'wishlisted';
    certificateAvailable?: boolean;
    certificateUrl?: string;
    descriptionShort: string;
    difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
    tags: string[];
    enrollmentDate?: string;
  };
  

type CourseStore = {
    courses: Course[];
    filteredCourses: Course[];
    setCourses: (courses: Course[]) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
};

export const useCourseStore = create<CourseStore>((set, get) => ({
    courses: [],
    filteredCourses: [],
    searchQuery: '',
    setCourses: (courses) =>
      set({ courses, filteredCourses: courses }), // initialize both
    setSearchQuery: (query) => {
      set({ searchQuery: query });
  
      const allCourses = get().courses;
      const filtered = allCourses.filter((c) =>
        c.title.toLowerCase().includes(query.toLowerCase())
      );
      set({ filteredCourses: filtered });
    },
  }));
  