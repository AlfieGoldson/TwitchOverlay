import { useState } from 'react';
import { useSupabase } from './useSupabase';

interface PlayerData {
	nick: string;
	tag: string;
	legend: string; //TODO: set legend type
	flag: string; //TODO: set flag type
}

interface TeamData {
	name: string;
	score: number;
	players: PlayerData[];
}

interface OverlayData {
	label: string;
	misc: string;
	teams: TeamData[];
}

const defaultOverlayData: OverlayData = {
	label: 'Label',
	misc: 'Misc',
	teams: [
		{
			name: 'xd',
			score: 3,
			players: [
				{
					nick: 'Player 1',
					tag: 'Clan',
					legend: 'ada',
					flag: 'fra',
				},
				{
					nick: 'Player 2',
					tag: 'Clan 2',
					legend: 'wu shang',
					flag: 'fra',
				},
			],
		},
		{
			name: 'xd',
			score: 2,
			players: [
				{
					nick: 'Player 3',
					tag: 'Clan 2',
					legend: 'ulgrim',
					flag: 'bel',
				},
				{
					nick: 'Player 4',
					tag: 'Hollory',
					legend: 'cassidy',
					flag: 'fra',
				},
			],
		},
	],
};

export const useOverlayData = (overlayId: string) => {
	const [overlayData, setOverlayData] =
		useState<OverlayData>(defaultOverlayData);

	const supabase = useSupabase(async (supabase) => {
		const { error, data } = await supabase
			.from('overlay_data')
			.select('*')
			.eq('id', overlayId);

		if (error) {
			console.error(error);
			return;
		}

		if (data.length <= 0) {
			return;
		}

		setOverlayData(data[0].data);

		const subscription = supabase
			.from(`overlay_data:id=eq.${overlayId}`)
			.on('*', (payload) => {
				setOverlayData(payload.new.data);
			})
			.subscribe();

		return () => {
			supabase.removeSubscription(subscription);
		};
	}, []);

	const updateOverlayData = async () => {
		await supabase
			.from('overlay_data')
			.upsert({ id: overlayId, data: overlayData });
	};

	return { overlayData, setOverlayData, updateOverlayData };
};
