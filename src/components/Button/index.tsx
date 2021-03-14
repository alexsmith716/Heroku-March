import React from 'react';

export type Props = {
	className?: string;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset' | undefined;
	buttonText?: string;
  disabled?: boolean;
};

const Button: React.FC<Props> = ({ className, onClick=() => null, type='button', buttonText='button' }) => {
	return (
		<button className={`btn ${className}`} onClick={onClick} type={type}>
			{buttonText}
		</button>
	);
};

export default Button;
