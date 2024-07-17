import React from 'react';

type ButtonProps = {
	onclick: React.MouseEventHandler<HTMLButtonElement> | undefined;
	text: string;
	className: string;
};

export default function Button({ onclick, text, className }: ButtonProps) {
	return (
		<button onClick={onclick} className={className}>
			{text}
		</button>
	);
}
