'use client'

import React from 'react';


const HomeContent = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Organizo</h1>
      <p className="text-gray-600">
        Organizo is your all-in-one organization and task management app. Whether you're managing personal projects, collaborating with a team, or simply staying organized in your daily life, Organizo has you covered.
      </p>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Key Features</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Create and manage boards for different projects or tasks.</li>
          <li>Organize tasks into lists for better categorization.</li>
          <li>Collaborate with team members on shared boards.</li>
          <li>Set due dates and labels for tasks to stay on top of your work.</li>
        </ul>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Get Started</h2>
        <p className="text-gray-600">
          Sign in to start organizing your work and life just using your gmail. It's time to boost your productivity and keep everything in one place with Organizo!
        </p>
      </div>
    </div>
  );
};

export default HomeContent;
