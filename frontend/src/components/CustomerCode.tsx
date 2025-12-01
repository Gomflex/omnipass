'use client';

interface CustomerCodeProps {
  customerId: string;
  userName: string;
  pointsBalance?: number;
}

export default function CustomerCode({ customerId, userName, pointsBalance = 0 }: CustomerCodeProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 h-full">
      <div className="text-center mb-3">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-1">My OMNI Pass</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">Use QR button below to show your code</p>
      </div>

      {/* Customer Info */}
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 p-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Member</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">{userName}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Points</p>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-50">{pointsBalance.toLocaleString()}</p>
          </div>
        </div>
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Customer ID</p>
          <p className="font-mono text-xs font-semibold text-gray-900 dark:text-gray-50">{customerId}</p>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-xs text-center text-gray-500 dark:text-gray-500">
          Tap the QR icon in the bottom navigation to display your customer code
        </p>
      </div>
    </div>
  );
}
