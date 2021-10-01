import { DependencyList, useEffect, useState } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const useSupabase = (
	effect: (supabase: SupabaseClient) => void,
	deps: DependencyList
) => {
	const [supabase, setSupabase] = useState(null);

	useEffect(() => {
		const db = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
		);

		setSupabase(db);
	}, []);

	useEffect(() => {
		if (!supabase || !effect) return;

		return effect(supabase);
	}, [...deps, supabase]);

	return supabase;
};
