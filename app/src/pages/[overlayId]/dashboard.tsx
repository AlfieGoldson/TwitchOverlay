import Head from 'next/head';
import {
	TextField,
	Paper,
	Card,
	Container,
	Grid,
	Stack,
	Box,
	Button,
} from '@mui/material';
import Select from 'react-select';
import { flagOptions } from '../../util/flags';
import { useOverlayData } from '../../hooks/useOverlayData';
import { GetServerSideProps } from 'next';

interface Props {
	overlayId: string;
}

const OverlayDashboard = ({ overlayId }: Props) => {
	const { overlayData, setOverlayData, updateOverlayData } =
		useOverlayData(overlayId);

	return (
		<Container maxWidth='xl'>
			<Head>
				<title>Twitch Overlay</title>
			</Head>
			<Card elevation={4}>
				<Box sx={{ p: 4 }}>
					<TextField
						variant='outlined'
						label='Label'
						type='text'
						value={overlayData.label}
						onChange={({ target }) =>
							setOverlayData((data) => ({
								...data,
								label: target.value,
							}))
						}
					/>
					<TextField
						variant='outlined'
						label='Misc'
						type='text'
						value={overlayData.misc}
						onChange={({ target }) =>
							setOverlayData((data) => ({
								...data,
								misc: target.value,
							}))
						}
					/>

					<Grid container columnSpacing={4} rowSpacing={2}>
						{overlayData.teams.map((team, i) => (
							<Grid item xs={12} md={6} key={i}>
								<h2>Team {i + 1}</h2>
								<Stack spacing={2}>
									{team.players.map((player, j) => (
										<Paper variant='outlined' key={j}>
											<Box sx={{ p: 2 }}>
												<Stack spacing={2}>
													<TextField
														variant='standard'
														label='Nick'
														type='text'
														value={player.nick}
														onChange={({
															target,
														}) =>
															setOverlayData(
																(data) => {
																	const teams =
																		data.teams;
																	teams[
																		i
																	].players[
																		j
																	].nick =
																		target.value;

																	return {
																		...data,
																		teams,
																	};
																}
															)
														}
													/>
													<TextField
														variant='standard'
														label='Clan/Tag'
														type='text'
														value={player.tag}
														onChange={({
															target,
														}) =>
															setOverlayData(
																(data) => {
																	const teams =
																		data.teams;
																	teams[
																		i
																	].players[
																		j
																	].tag =
																		target.value;

																	return {
																		...data,
																		teams,
																	};
																}
															)
														}
													/>
													<TextField
														variant='standard'
														label='Legend'
														type='text'
														value={player.legend}
														onChange={({
															target,
														}) =>
															setOverlayData(
																(data) => {
																	const teams =
																		data.teams;
																	teams[
																		i
																	].players[
																		j
																	].legend =
																		target.value;

																	return {
																		...data,
																		teams,
																	};
																}
															)
														}
													/>
													<Select
														options={flagOptions}
													/>
												</Stack>
											</Box>
										</Paper>
									))}
								</Stack>
							</Grid>
						))}
						<Grid item xs={12}>
							<Button
								variant='contained'
								onClick={updateOverlayData}
							>
								Update
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Card>
		</Container>
	);
};

export default OverlayDashboard;

export const getServerSideProps: GetServerSideProps<Props> = async ({
	query,
}) => {
	console.log({ query });

	const { overlayId } = query;
	if (typeof overlayId !== 'string')
		return {
			notFound: true,
		};

	return {
		props: {
			overlayId,
		},
	};
};
