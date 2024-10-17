import { ForwardedRef, forwardRef } from 'react';

interface IMessageInput {
	handleClick: VoidFunction;
}

export const MessageInput = forwardRef(({ handleClick }: IMessageInput, ref: ForwardedRef<HTMLInputElement>) => {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleClick();
			}}
		>
			<div className="mx-auto flex h-12 w-11/12 max-w-xs">
				<input ref={ref} type="text" placeholder="Type here" className="input input-bordered w-full text-black" />
				<button type="submit" className="btn">
					Send
				</button>
			</div>
		</form>
	);
});
