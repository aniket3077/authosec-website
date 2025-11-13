import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch transactions for a company
 */
export const getCompanyTransactions = async (companyId: string) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .or(`senderId.eq.${companyId},receiverId.eq.${companyId}`)
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching transactions:', error);
    throw new Error(error.message || 'Failed to fetch transactions');
  }
};

/**
 * Get dashboard statistics
 */
export const getDashboardStats = async (companyId: string) => {
  try {
    const transactions = await getCompanyTransactions(companyId);

    const stats = {
      totalTransactions: transactions.length,
      pendingTransactions: transactions.filter((t: any) => t.status === 'pending').length,
      acceptedTransactions: transactions.filter((t: any) => t.status === 'accepted').length,
      rejectedTransactions: transactions.filter((t: any) => t.status === 'rejected').length,
      totalAmount: transactions
        .filter((t: any) => t.status === 'accepted')
        .reduce((sum: number, t: any) => sum + (t.amount || 0), 0),
    };

    return stats;
  } catch (error: any) {
    console.error('Error fetching dashboard stats:', error);
    throw new Error(error.message || 'Failed to fetch dashboard stats');
  }
};
