export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          Welcome to Athlehub
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mb-8">
          Your professional sports management platform. Track matches, analyze stats,
          and connect with your sports community.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl mt-8">
          <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Matches
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Create and manage your matches
            </p>
          </div>
          <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Stats
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Track your performance
            </p>
          </div>
          <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Community
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Connect with players
            </p>
          </div>
          <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Profile
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Manage your account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
