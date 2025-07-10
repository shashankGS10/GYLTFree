/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Course } from "@/store/useCourseStore";

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <div className="border-2 border-primary bg-white flex flex-col overflow-hidden card-background card-border p-0">
      <div className="relative w-full h-48 ">
        <div className="relative w-full h-full ">
          {course.subjectThumbnail && (
        <img
          src={`${course.subjectThumbnail}`}
          alt={course.subject}
          className="w-full h-full object-cover rounded-lg"
        />
          )}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4 bg-opacity-50 backdrop-blur-sm">
        <span className="absolute top-2 left-2 text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
          {course.difficultyLevel}
        </span>
        <h3 className="text-xl font-bold text-gray-100">{course.title}</h3>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 flex flex-col gap-3">
        <p className="text-primary text-sm leading-relaxed">
          {course.descriptionShort}
        </p>

        <div className="text-sm">
        <p className="text-primary text-sm leading-relaxed">
            Next: <strong>{course.nextLesson || "Completed 🎉"}</strong>
          </p>
          <p className="text-primary text-sm leading-relaxed">Progress: {course.progressPercentage}%</p>
            <div className="bg-primary h-2 rounded-full overflow-hidden mt-1">
            <div
              className="bg-green-500 h-full transition-all duration-300"
              style={{ width: `${course.progressPercentage}%` }}
            ></div>
            </div>
        </div>

        <a
          href={course.mentorLink}
          className="mt-4 inline-block text-center bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Chat With {course.llmMentorName}
        </a>
      </div>
    </div>
  );
};
export default CourseCard;
