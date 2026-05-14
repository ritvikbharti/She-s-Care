import { useState, useEffect } from "react";
import { Wallet, Plus, ArrowDownCircle, ArrowUpCircle, RefreshCw } from "lucide-react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const PRESET_AMOUNTS = [100, 250, 500, 1000, 2000, 5000];

// Dynamically load Razorpay checkout script
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) { resolve(true); return; }
    const script = document.createElement("script");
    script.id  = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload  = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function WalletPage() {
  const [balance,      setBalance]      = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [amount,       setAmount]       = useState("");
  const [paying,       setPaying]       = useState(false);

  const fetchWallet = async () => {
    try {
      const res = await api.get("/api/wallet/balance");
      setBalance(res.data.balance);
      setTransactions(res.data.transactions || []);
    } catch {
      toast.error("Failed to load wallet");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWallet(); }, []);

  const handleTopUp = async () => {
    const amt = Number(amount);
    if (!amt || amt < 1) { toast.error("Enter a valid amount"); return; }

    const loaded = await loadRazorpayScript();
    if (!loaded) { toast.error("Failed to load payment gateway"); return; }

    setPaying(true);
    try {
      // 1. Create order on backend
      const { data } = await api.post("/api/wallet/create-order", { amount: amt });

      // 2. Get user info for prefill
      const userRaw = localStorage.getItem("user");
      const user    = userRaw ? JSON.parse(userRaw) : {};

      // 3. Open Razorpay checkout
      const options = {
        key:      data.key,
        amount:   data.amount,
        currency: data.currency,
        name:     "SheCare Wallet",
        description: "Wallet Top-Up",
        order_id: data.orderId,
        prefill: {
          name:  `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          email: user.email || "",
        },
        theme: { color: "#6366f1" },

        handler: async (response) => {
          try {
            // 4. Verify payment & credit wallet
            const verifyRes = await api.post("/api/wallet/verify", {
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
              amount: data.amount,
            });
            setBalance(verifyRes.data.balance);
            toast.success(`₹${amt} added to your wallet! 🎉`);
            setAmount("");
            fetchWallet(); // refresh transactions
          } catch {
            toast.error("Payment verification failed");
          }
        },

        modal: {
          ondismiss: () => {
            setPaying(false);
            toast.info("Payment cancelled");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        toast.error("Payment failed. Please try again.");
        setPaying(false);
      });
      rzp.open();

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Could not initiate payment");
      setPaying(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10 text-white space-y-8">

      {/* ── HEADER ── */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Wallet className="w-6 h-6 text-cyan-400" /> My Wallet
        </h1>
        <button onClick={fetchWallet}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition">
          <RefreshCw className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* ── BALANCE CARD ── */}
      <div className="relative bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 rounded-3xl p-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.1),transparent)]" />
        <p className="text-indigo-200 text-sm">Available Balance</p>
        <p className="text-5xl font-bold mt-2">₹{balance.toLocaleString("en-IN")}</p>
        <p className="text-indigo-200 text-sm mt-4">
          {transactions.length} transaction{transactions.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ── TOP UP ── */}
      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-green-400" /> Add Money
        </h2>

        {/* Preset amounts */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
          {PRESET_AMOUNTS.map((a) => (
            <button key={a} onClick={() => setAmount(String(a))}
              className={`py-2 rounded-xl text-sm border transition ${
                amount === String(a)
                  ? "bg-indigo-600 border-indigo-500 text-white"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
              }`}>
              ₹{a}
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Enter custom amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleTopUp}
            disabled={paying || !amount}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-xl font-semibold transition"
          >
            {paying ? "Processing..." : "Pay Now"}
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-3">
          🔒 Payments secured by Razorpay. UPI, Cards, Net Banking accepted.
        </p>
      </div>

      {/* ── TRANSACTIONS ── */}
      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Transaction History</h2>

        {transactions.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-slate-400">No transactions yet.</p>
            <p className="text-slate-500 text-sm mt-1">Top up your wallet to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((txn, i) => (
              <div key={i}
                className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  {txn.type === "credit"
                    ? <ArrowDownCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
                    : <ArrowUpCircle  className="w-8 h-8 text-red-400 flex-shrink-0" />}
                  <div>
                    <p className="text-sm font-medium">{txn.note || (txn.type === "credit" ? "Wallet Top-up" : "Debit")}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(txn.createdAt).toLocaleString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit"
                      })}
                    </p>
                    {txn.razorpayPaymentId && (
                      <p className="text-xs text-slate-500">ID: {txn.razorpayPaymentId}</p>
                    )}
                  </div>
                </div>
                <span className={`text-lg font-bold ${txn.type === "credit" ? "text-green-400" : "text-red-400"}`}>
                  {txn.type === "credit" ? "+" : "-"}₹{txn.amount.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}