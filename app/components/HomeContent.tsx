'use client'

import React, { useEffect, useState, useRef } from 'react';
import "../globals.css"
import "./Button/ButtonCmp.css"
import SignInBtn from './SignInBtn';
import Image from 'next/image';
import { signIn } from 'next-auth/react';


const HomeContent = () => {

  const messages = ['improved collaboration', 'increased productivity', 'you!'];
  const [welcomeMessage, setWelcomeMessage] = useState(messages[0]);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const messagetag = document.getElementById('welcomeMessage');
    messagetag?.classList.remove('start-animation');
    setTimeout(() => {
      messagetag?.classList.add('start-animation');
      setWelcomeMessage(messages[messageIndex]);
    }, 500);
  }, [messageIndex]);
    

  return (
        <div
            className="start-animation text-justify  text-[#262626] font-mono w-[100vw] px-10 home-content text-[--text-sideNav] mx-auto " //bg-[#f5f5f5]
            style={{
            height: '91vh',
            overflow: 'scroll'
        }}>
            <div
                className="pt-8 rounded w-[90vw] text-[#262626] backdrop-blur-md">
                <div className='text-center text-3xl font-bold my-14 '> 
                  <h1 className='text-[#162936] my-2'>Project Management</h1>
                  <h1 className='text-[#162936] my-2'>Platform Made for</h1>
                    <h1 id='welcomeMessage' className='my-2 start-animation text-[#375bbe]'>"{welcomeMessage}"</h1>
                </div>
                <p className="my-8 font-mono text-2xl">Where Project Management Becomes Effortless!</p>
                <p className="mb-8 text-sm">
                    Organizo, your ultimate solution for seamless organization and efficient task
                    management, is here to transform the way you work. Whether you're orchestrating
                    personal projects, collaborating with a dedicated team, or simply striving to
                    maintain order in your daily life, Organizo is your steadfast companion.
                </p>
                <p className="mb-8 text-sm">
                    Imagine a world where chaos is tamed, priorities are crystal clear, and
                    productivity knows no bounds. Welcome to that world with Organizo at your side.
                </p>
                <p className="mb-8 text-sm">
                    With a user-friendly interface and a powerful set of tools, Organizo empowers
                    you to streamline your tasks, enhance your teamwork, and boost your personal and
                    professional growth.
                </p>
            </div>
           <div className=' flex justify-center items-center pt-5 pb-10 gap-10'>
            <button onClick={() => signIn('google')} className=' hover:scale-105 text-white px-9 py-3 bg-[#075a91]'>
              Log In
            </button>
            <button onClick={() => signIn('google')} className=' hover:scale-105 text-white px-9 py-3 bg-[#36b265]'>
              Get Started
            </button>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-2  text-[#262626] ">Key Features</h2>
            </div>
            <div className="mt-2 py-8 pt-4 inline-block">
                <div className="float-left">
                    <Image
                        width={600}
                        height={600}
                        src="/image-figma-model.png"
                        alt="model-image"
                        className="card my-auto mr-4 mb-4 rounded-lg" />
                </div>
               
                <div className=" ">
                    <h2 className="text-xl font-semibold mb-2">Discover the Power of Organizo's Features</h2>
                    <p className="mb-8">
                        Organizo is packed with a rich set of features designed to simplify your project
                        management experience. Let's take a closer look at what Organizo can do for you:
                    </p>
                    <ul className="list-disc list-inside ml-5  ">
                        <li>
                            <strong>Create and Manage Boards:</strong>
                            Easily set up and manage boards for different projects or tasks. Organize your
                            work in a way that makes sense to you.
                        </li>
                        <li>
                            <strong>Effortless Task Organization:</strong>
                            Streamline your tasks by categorizing them into lists, making it simpler to stay
                            organized and focused.
                        </li>
                        <li>
                            <strong>Collaboration Made Simple:</strong>
                            Work together seamlessly with your team members on shared boards. Share ideas,
                            track progress, and achieve your goals collaboratively.
                        </li>
                        <li>
                            <strong>Stay on Top of Deadlines:</strong>
                            Utilize due dates and labels to prioritize tasks, ensuring you never miss an
                            important deadline or overlook a critical task.
                        </li>
                    </ul>
                    <p className="mt-6">
                        Organizo's feature-rich environment empowers you to take control of your
                        projects and tasks, making your work more efficient and enjoyable.
                    </p>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">Get Started</h2>
                <p className="">
                    Sign in to start organizing your work and life using your Gmail. It's time to
                    boost your productivity and keep everything in one place with Organizo!
                </p>
            </div>
            {/* Additional Content */}
            <div className="mt-8 inline-block">
            <div className='float-right pl-3 pb-3'>
                    <Image
                        width={600}
                        height={600}
                        src="/home-image.jpeg"
                        alt='model-image'
                        className='opacity-90 rounded-2xl'/>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-3">Unlock the Potential of Organizo</h2>
                    <p className="text-lg pr-10 my-auto">
                        Organizo is not just another project management tool; it's your path to
                        achieving unparalleled productivity and organization. Let's delve deeper into
                        what makes Organizo a game-changer:
                    </p>
                    <ul className="list-disc list-inside ml-5 mt-4">
                        <li>
                            <strong>Intuitive Interface:</strong>
                            Organizo offers an effortlessly intuitive interface that simplifies your journey
                            to efficient task management. Navigate through your projects with ease and
                            grace.
                        </li>
                        <li>
                            <strong>Real-Time Collaboration:</strong>
                            Experience the power of real-time collaboration with your team. Share ideas,
                            exchange feedback, and work harmoniously towards your objectives, no matter
                            where your team members are located.
                        </li>
                        <li>
                            <strong>Task Prioritization:</strong>
                            Stay on top of your workload by prioritizing tasks. With Organizo, you can set
                            deadlines, assign labels, and ensure that nothing falls through the cracks.
                        </li>
                    </ul>
                    <p className="mt-6">
                        Organizo empowers you to maximize your productivity, minimize stress, and
                        accomplish your goals more efficiently than ever before. Welcome to a world
                        where organization and success walk hand in hand.
                    </p>
                </div>

            </div>
            {/* Add animations using CSS or a library like Animate.css */}
            <div className="animated fadeInUp delay-1s mt-8">
                <h2 className="text-xl font-semibold mb-2">Start Your Journey</h2>
                <p className="">
                    Are you ready to get started? Sign in now and experience the power of Organizo.
                    Take control of your tasks, projects, and goals with ease.
                </p>
            </div>
            <div className=' pt-14 mb-28 '>
                <SignInBtn/>
            </div>
            <footer className= "footer-animation bg-gray-800 opacity-50 text-white py-4 relative w-screen right-10">
    <div className="container mx-auto flex justify-between items-center">
        <div className="text-sm">
            <p>&copy; 2023 Organizo. All rights reserved.</p>
        </div>
        <div className="text-sm ">
            <ul className="">
                <li className='h-[2ch] my-6'>
                    <a href="#" className="hover:text-blue-300  mt-3 hover:underline transition duration-300 py-3">Privacy Policy</a>
                </li>
                <li className='h-[2ch] my-6'>
                    <a href="#" className="hover:text-blue-300 mt-3 hover:underline transition duration-300 py-3">Terms of Service</a>
                </li>
                <li className='h-[2ch] my-6'>
                    <a href="#" className="hover:text-blue-300 mt-3 hover:underline transition duration-300 py-3">Contact Us</a>
                </li>
            </ul>
        </div>
    </div>
</footer>



        </div>

    );
};

export default HomeContent;
