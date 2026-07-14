export default function SkillsLoading() {
    return (
        <div className="space-y-8">
            {/* Categories Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <div className="h-8 w-32 animate-pulse rounded bg-muted" />
                        <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                    </div>
                    <div className="h-10 w-32 animate-pulse rounded bg-muted" />
                </div>

                <div className="rounded-lg border">
                    <div className="p-4 space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-12 animate-pulse rounded bg-muted"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <div className="h-8 w-24 animate-pulse rounded bg-muted" />
                        <div className="h-4 w-40 animate-pulse rounded bg-muted" />
                    </div>
                    <div className="h-10 w-24 animate-pulse rounded bg-muted" />
                </div>

                <div className="rounded-lg border">
                    <div className="p-4 space-y-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className="h-12 animate-pulse rounded bg-muted"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
