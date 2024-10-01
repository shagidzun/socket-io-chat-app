interface HeadProps {
	username: string;
}

export const Head = ({ username }: HeadProps) => {
	return (
		<div className="max-h-11 p-3">
			<p>
				To: <span>{username}</span>
			</p>
		</div>
	);
};
