import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../api/auth/login.ts';

export interface ILoginInput {
	username: string;
	password: string;
}

export const Login = () => {
	const { register, handleSubmit } = useForm<ILoginInput>();
	const { mutate: login } = useLogin();

	const handleLogin = (data: ILoginInput) => {
		login(data);
	};

	return (
		<div className="mx-auto flex min-w-96 flex-col items-center justify-center">
			<div className="w-full rounded-lg bg-gray-400/0 bg-clip-padding p-6 shadow-md backdrop-blur-lg">
				<h1 className="text-center text-3xl font-semibold text-gray-300">
					Login
					<span className="text-blue-400"> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit(handleLogin)}>
					<div>
						<label className="label p-2">
							<span className="label-text">Username</span>
						</label>
						<input
							{...register('username')}
							type="text"
							placeholder="Enter username"
							className="input input-bordered h-10 w-full"
						/>
					</div>
					<div>
						<label className="label p-2">
							<span className="label-text">Password</span>
						</label>
						<input
							{...register('password')}
							type="password"
							placeholder="Enter password"
							className="input input-bordered h-10 w-full"
						/>
					</div>
					<Link className="mt-2 inline-block text-sm hover:text-blue-600 hover:underline" to="/signup">
						Don't have an account?
					</Link>
					<div>
						<button className="btn btn-sm btn-block mt-2 border-blue-400 bg-blue-400">Login</button>
					</div>
				</form>
			</div>
		</div>
	);
};
