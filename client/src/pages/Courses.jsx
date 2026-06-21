import React from "react";

const courses = [
    {
        title: "MS Project Masterclass: Project-Based Learning (Beginner to Advanced)",
        description: "Microsoft Project Real-World Projects",
        level: "Beginner to Advanced",
        link: "https://www.youtube.com/playlist?list=PLxgggrEKTYF1jCtmtBkgezCvBjOKNASCd", 
        // এই প্লেলিস্টের ১ম ভিডিওর ID (যেমন: v=XXXXXX এর অংশটুকু) নিচে বসাবেন
        firstVideoId: "AMCryxyu_XA" 
    },
    {
        title: "Cisco Packet Tracer",
        description: " Cisco packet tracer video tutorial step by step CN Project.",
        level: "Intermediate",
        link: "https://www.youtube.com/playlist?list=PLxgggrEKTYF24IJV-_6ktKVFJLEcbl9n6",
        firstVideoId: "-PtnVmgCquI"
    },
    {
        title: "Excel Freelancing: Beginner to Advanced (Full Course)",
        description: "Master Microsoft Excel from scratch and start your freelancing journey.",
        level: "Intermediate",
        link: "https://www.youtube.com/playlist?list=PLxgggrEKTYF0W84oD1MfYjbs8ht-2zyJT",
        // আপনার এই প্লেলিস্টের ১ম ভিডিওর আইডি (আমি বসিয়ে দিয়েছি)
        firstVideoId: "VORt9qlZQJg" 
    },
    {
        title: "BCS preliminary কম্পিউটার ও তথ্য প্রযুক্তি কোর্স (BCS Computer & IT Course in Bengali)",
        description: "BCS Preliminary কম্পিউটার প্রস্তুতি for job seeker of BCS.",
        level: "All Levels",
        link: "https://www.youtube.com/playlist?list=PLxgggrEKTYF1zyX0BnZeb9GBj1KXQu_eo",
        firstVideoId: "q5w7mteEgxs"
    },
];

const Courses = () => {
    return (
        <section className="px-8 py-20 max-w-6xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-bold">Courses</h1>
                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-7">
                    Explore structured learning content from Bariul Academy.
                    These courses are designed to help students build practical
                    skills and grow their careers.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {courses.map((course) => {
                    // hqdefault.jpg দিলে থাম্বনেইলটি হাই-কোয়ালিটি (HD) দেখাবে
                    const thumbnailUrl = course.firstVideoId 
                        ? `https://img.youtube.com/vi/${course.firstVideoId}/hqdefault.jpg` 
                        : "https://via.placeholder.com/640x360?text=Bariul+Academy";

                    return (
                        <div
                            key={course.title}
                            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between bg-white dark:bg-gray-800"
                        >
                            {/* Course Thumbnail */}
                            <div className="aspect-video w-full bg-gray-100 overflow-hidden relative group">
                                <img
                                    src={thumbnailUrl}
                                    alt={course.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/640x360?text=Bariul+Academy";
                                    }}
                                />
                            </div>

                            {/* Course Details */}
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                        {course.title}
                                    </h2>
                                    <p className="mt-3 text-gray-600 dark:text-gray-300 leading-7 text-sm">
                                        {course.description}
                                    </p>
                                </div>

                                <div className="mt-6 flex items-center justify-between">
                                    <span className="px-3 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full">
                                        Level: {course.level}
                                    </span>
                                    <a
                                        href={course.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors duration-200"
                                    >
                                        Watch Course
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Courses;