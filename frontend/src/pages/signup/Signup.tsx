import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSignup } from '../../api/auth/signup.ts';

export interface ISignupInput {
	fullName: string;
	username: string;
	password: string;
	confirmPassword: string;
	gender: 'male' | 'female';
}

export const Signup = () => {
	const { register, handleSubmit } = useForm<ISignupInput>();
	const { mutate: signup } = useSignup();
	const handleSignup = (data: ISignupInput) => {
		signup(data);
		console.log(data);
	};

	return (
		<div className="mx-auto flex min-w-96 flex-col items-center justify-center">
			<div className="w-full rounded-lg bg-gray-400/0 bg-clip-padding p-6 shadow-md backdrop-blur-lg">
				<h1 className="text-center text-3xl font-semibold text-gray-300">
					Sign Up <span className="text-blue-400"> ChatApp</span>
				</h1>
				<form onSubmit={handleSubmit(handleSignup)}>
					<div>
						<label className="label p-2">
							<span className="label-text">Full Name</span>
						</label>
						<input
							{...register('fullName', { required: true })}
							type="text"
							placeholder="John Wick"
							className="input input-bordered h-10 w-full"
						/>
					</div>

					<div>
						<label className="label p-2">
							<span className="label-text">Username</span>
						</label>
						<input
							{...register('username', { required: true })}
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
							{...register('password', { required: true })}
							type="text"
							placeholder="Enter password"
							className="input input-bordered h-10 w-full"
						/>
					</div>

					<div>
						<label className="label p-2">
							<span className="label-text">Confirm Password</span>
						</label>
						<input
							{...register('confirmPassword', { required: true })}
							type="text"
							placeholder="Confirm Password"
							className="input input-bordered h-10 w-full"
						/>
					</div>

					<div className="flex">
						<div className="form-control">
							<label className="label cursor-pointer">
								<span className="label-text mr-1">Male</span>
								<input {...register('gender', { required: true })} type="radio" value="male" className="radio" />
							</label>
						</div>
						<div className="form-control">
							<label className="label cursor-pointer">
								<span className="label-text mr-1">Female</span>
								<input {...register('gender', { required: true })} type="radio" value="female" className="radio" />
							</label>
						</div>
					</div>

					<Link to="/login" className="mt-2 inline-block text-sm hover:text-blue-600 hover:underline">
						Already have an account?
					</Link>

					<div>
						<button type="submit" className="btn btn-sm btn-block mt-2 border-blue-400 bg-blue-400">
							Sign Up
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
