import React from 'react';

type ScoreboardProps = {
	score: number;
};

export default function Scoreboard({ score }: ScoreboardProps) {
	return (
		<div>
			<h2>SCOREBOARD</h2>
			<p>{score}</p>
		</div>
	);
}
