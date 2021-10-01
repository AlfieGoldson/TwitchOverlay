import { GetServerSideProps } from 'next';
import { useOverlayData } from '../../hooks/useOverlayData';
import styles from '../../styles/Overlay.module.scss';

interface Props {
	overlayId: string;
}

const Overlay = ({ overlayId }) => {
	const { overlayData } = useOverlayData(overlayId);

	return (
		<div className={styles.container}>
			{overlayData && (
				<>
					<h1>{overlayData.label}</h1>
					<h2>{overlayData.misc}</h2>
					<div className={styles.bottomOverlay}>
						{overlayData.teams.map((team, i) => (
							<div key={i}>
								{team.players.map((player, j) => (
									<div key={j}>
										{i === 0 ? (
											<>
												[{player.tag}] {player.nick}
											</>
										) : (
											<>
												{player.nick} [{player.tag}]
											</>
										)}
									</div>
								))}
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Overlay;

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
