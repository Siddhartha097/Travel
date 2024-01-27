'use client'

import { signIn } from "next-auth/react"
import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"


import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../Input/Input"
import toast from "react-hot-toast"
import Button from "../Button"

import useLoginModal from "@/hooks/useLoginModal"
import useRegisterModal from "@/hooks/useRegisterModal"
import { useRouter } from "next/navigation"

const LoginModal = () => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const { 
    register, handleSubmit, formState: { errors } 
  } = useForm<FieldValues>({ defaultValues: { email: '', password: '', }});

  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    setIsLoading(true)

    console.log('Form data:', data);

    signIn('credentials', {
      ...data,
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);

      if(callback?.ok) {
        toast.success('Successfully Logged in')
        router.refresh();
        loginModal.onClose();
      }

      if(callback?.error) {
        toast.error(callback.error);
      }
    })


  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome Back to Travel"
        subtitle="Login to your account!"
        center
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-5">
      <Button 
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button 
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>
            New to Travel?
          </div>
          <div onClick={toggle} className="cursor-pointer hover:underline text-neutral-500 hover:text-neutral-700 transition duration-200">
            Create a new account
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal 
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Login"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal