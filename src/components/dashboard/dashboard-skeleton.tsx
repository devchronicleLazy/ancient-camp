export function DashboardSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-2" />
                <div className="h-4 bg-gray-100 rounded w-1/3" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="h-10 bg-gray-200 rounded w-10 mb-4" />
                                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2" />
                                <div className="h-4 bg-gray-100 rounded w-1/3" />
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-16 bg-gray-100 rounded" />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-12 bg-gray-100 rounded" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}