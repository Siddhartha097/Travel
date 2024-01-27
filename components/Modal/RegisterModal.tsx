'use client'

import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from "react"
import toast from "react-hot-toast"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import { signIn } from "next-auth/react"

import useRegisterModal from "@/hooks/useRegisterModal"
import useLoginModal from "@/hooks/useLoginModal"

import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../Input/Input"
import Button from "../Button"



const RegisterModal = () => {

  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { 
    register, handleSubmit, formState: { errors } 
  } = useForm<FieldValues>({ defaultValues: { name: '', email: '', password: '', }});

  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    setIsLoading(true)

    console.log('Form data:', data);
    

    await axios.post('/register', data)
      .then(() =>{
        registerModal.onClose();
        toast.success('Successfully Registerd');
        loginModal.onOpen();
      })
      .catch(error => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Travel"
        subtitle="Create an account!"
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
        id="name"
        label="Name"
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
            Already have an account?
          </div>
          <div onClick={toggle} className="cursor-pointer hover:underline text-neutral-500 hover:text-neutral-700 transition duration-200">
            Log in
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal 
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal