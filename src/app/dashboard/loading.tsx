export default function DashboardLoading() {
    return (
        <div>
            <h2 className="mb-6 text-3xl font-bold">Dashboard</h2>

            <div className="grid gap-6 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="rounded-lg border bg-card p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                                <div className="h-8 w-12 animate-pulse rounded bg-muted" />
                            </div>
                            <div className="h-6 w-6 animate-pulse rounded bg-muted" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
