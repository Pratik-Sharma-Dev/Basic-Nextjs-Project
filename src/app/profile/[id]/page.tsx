"use client";

export default function page({params}) {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>Profile Page</h1>
            <h2 className="p-2 bg-green-700 mt-4">
                {params.id}
            </h2>
            <hr />
            {/* Add more details or actions here */}
        </div>
    )
}
