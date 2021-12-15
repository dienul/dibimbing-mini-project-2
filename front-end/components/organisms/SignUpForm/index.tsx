import { useState } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setSignUp } from '../../../services/auth';
import { toast } from 'react-toastify';

const SignupSchema = yup.object().shape({
  username: yup.string().required(),
  phone: yup.number().required().positive().integer(),
  address: yup.string().required(),
  password: yup.string().required(),
  // website: yup.string().url()
});

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUername] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('')

  const router = useRouter();


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignupSchema)
  });

  const className = {
    label: cx('form-label text-lg fw-medium color-palette-1 mb-10'),
  };

  const onSubmit = async (data: any) => {
    console.log('data >>', data)

    const response = await setSignUp(data);
    if(response.error){
      toast.error(response.message);
    }else{
      toast.success('Sign Up Berhasil');
      router.push('/');
    }
  };
  return (
    <>
      <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign Up</h2>
      <p className="text-lg color-palette-1 m-0">Daftar dan bergabung dengan kami</p>
      <div className="pt-50">
        <label className={className.label}>Full Name</label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          aria-describedby="name"
          placeholder="Enter your name"
          value={username}
          {...register("username")}
          onChange={(event) => setUername(event.target.value)}
          required
        />
        {errors.username && <div className="invalid-feedback">
          {errors.username.message}
        </div>}
      </div>
      <div className="pt-30">
        <label className={className.label}>Phone</label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          aria-describedby="phone"
          placeholder="Enter your phone number"
          {...register('phone')}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        {errors.phone && <div className="invalid-feedback">
          {errors.phone.message}
        </div>}
      </div>
      <div className="pt-30">
        <label className={className.label}>Address</label>
        <textarea
          className="form-control rounded-pill text-lg"
          rows={2}
          aria-describedby="address"
          placeholder="Enter your address"
          {...register('address')}
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        {errors.address && <div className="invalid-feedback">
          {errors.address.message}
        </div>}
      </div>
      <div className="pt-30">
        <label className={className.label}>Password</label>
        <input
          type="password"
          className="form-control rounded-pill text-lg"
          aria-describedby="password"
          placeholder="Your password"
          {...register('password')}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {errors.password && <div className="invalid-feedback">
          {errors.password.message}
        </div>}
      </div>
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <button
          type="button"
          className="btn btn-sign-up fw-medium text-lg text-white rounded-pill mb-16"
          onClick={handleSubmit(onSubmit)}
        >
          Continue
        </button>
        <a
          className="btn btn-sign-in fw-medium text-lg color-palette-1 rounded-pill"
          href="/sign-in"
          role="button"
        >
          Sign
          In

        </a>
      </div>
    </>
  );
}
