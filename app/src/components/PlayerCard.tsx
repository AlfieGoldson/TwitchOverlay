import { Paper, Stack, TextField, Select } from '@mui/material';
import { Box } from '@mui/system';
import { flagOptions } from '../util/flags';

interface Props {
	teamId: number;
	playerId: number;
	playerData: any;
	setPlayerData: () => void;
}
export const PlayerCard = ({
	teamId,
	playerId,
	playerData,
	setPlayerData,
}: Props) => {
	return (
		<Paper variant='outlined' key={playerId}>
			<Box sx={{ p: 2 }}>
				<Stack spacing={2}>
					<TextField
						variant='standard'
						label='Nick'
						type='text'
						value={player.nick}
						onChange={({ target }) =>
							setOverlayData((data) => {
								const teams = data.teams;
								teams[i].players[j].nick = target.value;

								return {
									...data,
									teams,
								};
							})
						}
					/>
					<TextField
						variant='standard'
						label='Clan/Tag'
						type='text'
						value={player.tag}
						onChange={({ target }) =>
							setOverlayData((data) => {
								const teams = data.teams;
								teams[i].players[j].tag = target.value;

								return {
									...data,
									teams,
								};
							})
						}
					/>
					<TextField
						variant='standard'
						label='Legend'
						type='text'
						value={player.legend}
						onChange={({ target }) =>
							setOverlayData((data) => {
								const teams = data.teams;
								teams[i].players[j].legend = target.value;

								return {
									...data,
									teams,
								};
							})
						}
					/>
					<Select options={flagOptions} />
				</Stack>
			</Box>
		</Paper>
	);
};
