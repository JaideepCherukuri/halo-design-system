import React, { useState } from 'react';

interface AgentPayButtonProps {
  amount: number;
  currency?: string;
  merchantId: string;
  onSuccess?: (txHash: string) => void;
  onError?: (error: string) => void;
  label?: string;
}

export const AgentPayButton: React.FC<AgentPayButtonProps> = ({
  amount,
  currency = 'USD',
  merchantId,
  onSuccess,
  onError,
  label = 'Pay with Agent'
}) => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const handlePayment = async () => {
    setStatus('processing');
    
    // Simulate Agentic Protocol Handshake (UCP/ACP)
    try {
      console.log(`[Halo] Initiating payment of ${amount} ${currency} to ${merchantId}...`);
      
      // Mock network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock Success
      const mockTxHash = "0x" + Math.random().toString(16).slice(2);
      setStatus('success');
      console.log(`[Halo] Payment Successful: ${mockTxHash}`);
      
      if (onSuccess) onSuccess(mockTxHash);
      
      // Reset after delay
      setTimeout(() => setStatus('idle'), 2000);
    } catch (e) {
      setStatus('error');
      if (onError) onError('Payment Agent Unreachable');
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={status === 'processing' || status === 'success'}
      className={`
        px-6 py-3 rounded-lg font-semibold transition-all duration-200
        flex items-center gap-2
        ${status === 'idle' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : ''}
        ${status === 'processing' ? 'bg-indigo-400 text-indigo-100 cursor-wait' : ''}
        ${status === 'success' ? 'bg-green-500 text-white' : ''}
        ${status === 'error' ? 'bg-red-500 text-white' : ''}
      `}
    >
      {status === 'idle' && (
        <>
          <span>🤖</span>
          <span>{label}</span>
        </>
      )}
      {status === 'processing' && <span>🔄 Authorizing...</span>}
      {status === 'success' && <span>✅ Paid!</span>}
      {status === 'error' && <span>❌ Retry</span>}
    </button>
  );
};
