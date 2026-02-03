
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
    if (import.meta.env.DEV) {
        console.error('Missing required Supabase environment variables')
    }
}

// Validate URL format
if (supabaseUrl && !supabaseUrl.startsWith('https://')) {
    if (import.meta.env.DEV) {
        console.error('Supabase URL must use HTTPS')
    }
}

export const supabase = createClient(
    supabaseUrl || '',
    supabaseAnonKey || '',
    {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
        global: {
            headers: {
                'x-application-name': 'halo-design-system',
            },
        },
        db: {
            schema: 'public',
        },
    }
)

// Helper function to sanitize error messages for users
export function getSafeErrorMessage(error: any): string {
    // Don't expose internal error details to users
    if (error?.code === '23505') {
        return 'This email is already subscribed.'
    }
    if (error?.message?.includes('network')) {
        return 'Network error. Please check your connection.'
    }
    return 'An error occurred. Please try again later.'
}
