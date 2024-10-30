import { Button } from './button'
import React from 'react'
import { useState } from 'react'

interface IconInputLeadProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode
}

const IconInputLead: React.FC<IconInputLeadProps> = ({
  icon,
  className,
  ...props
}) => {
  return (
    <div className={`relative ${className} mb-0 mt-1`}>
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <img
          src={icon?.toString() || '/mail.png'}
          className="h-auto w-5"
          alt="icon"
        />
      </span>
      <input
        {...props}
        className="h-15 w-full rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  )
}

export function SignIn() {
  return (
    <>
      <div className="mb-5 flex h-screen min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mb-1 mt-10 text-left text-2xl/9 font-bold tracking-tight text-titleAuthor">
            Sign In to your account
          </h2>
          <h4 className="text-l/9 mt-2 text-left tracking-tight text-gray-400">
            Welcome back!
          </h4>
        </div>

        <div className="mb-1 mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-4">
            <IconInputLead
              icon="/mail.png"
              className="Email"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
            />
            <div>
              <IconInputLead
                icon="/lock.png"
                className="Password"
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                placeholder="Password"
              />
              <div className="flex items-center justify-end">
                <div className="mb-3 mt-3 text-sm">
                  <a
                    href="#"
                    className="hover:text-blueCustom-500 text-left font-semibold text-blueCustom"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>

            <div className="mb-5 mt-5">
              <Button
                type="submit"
                className="hover:bg-blueCustom-500 focus-visible:outline-blueCustom-600 flex h-12 w-full justify-center rounded-md bg-blueCustom px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Sign in
              </Button>
              <h4 className="mt-3 text-center text-gray-600">
                Don't have any accounts?
                <span>
                  <a className="font-bold text-blueCustom" href="#">
                    {' '}
                    Sign up
                  </a>
                </span>
              </h4>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export function SignUp() {
  const [checked, setChecked] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
  }

  return (
    <>
      <div className="mb-5 flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mb-1 mt-10 text-left text-2xl/9 font-bold tracking-tight text-titleAuthor">
            Sign Up for an Account
          </h2>
        </div>

        <div className="mb-1 mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-10">
            <div className="space-y-4">
              <IconInputLead
                icon="/user.png"
                className="UserName"
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Username"
              />
              <IconInputLead
                icon="/mail.png"
                className="Email"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
              />
              <IconInputLead
                icon="/lock.png"
                className="Password"
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                placeholder="Password"
              />
              <div className="text-sm text-gray-400">
                Your password must have at least 8 characters
              </div>
            </div>
            <div>
              <label className="mt-15 item-center text-sm text-gray-600">
                <input
                  className="mr-2"
                  type="checkbox"
                  checked={checked}
                  onChange={handleChange}
                />
                By creating an account means you agree to the{' '}
                <span className="font-bold">
                  <a href="#">Terms & Conditions</a>
                </span>{' '}
                and our{' '}
                <span className="font-bold">
                  <a href="#">Privacy Policy</a>
                </span>
              </label>
            </div>
            <div className="mt-15 mb-5">
              <Button
                type="submit"
                className="hover:bg-blueCustom-500 focus-visible:outline-blueCustom-600 flex h-12 w-full justify-center rounded-md bg-blueCustom px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Sign Up
              </Button>
              <h4 className="mt-3 text-center text-gray-600">
                Already have an account?
                <span>
                  <a className="font-bold text-blueCustom" href="#">
                    {' '}
                    Log in
                  </a>
                </span>
              </h4>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export function ResetPassword() {
  return (
    <>
      <div className="mb-5 flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mb-1 mt-10 text-left text-2xl/9 font-bold tracking-tight text-titleAuthor">
            Reset your password
          </h2>
          <h4 className="text-l/10 mt-2 text-left tracking-tight text-gray-400">
            Enter the email address associated with your account and we will
            send you a link to reset your password.
          </h4>
        </div>

        <div className="mb-1 mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-8">
            <div className="space-y-4">
              <IconInputLead
                icon="/mail.png"
                className="Email"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
              />
            </div>

            <div className="mt-5">
              <Button
                type="submit"
                className="hover:bg-blueCustom-500 focus-visible:outline-blueCustom-600 flex h-12 w-full justify-center rounded-md bg-blueCustom px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Continue
              </Button>
              <h4 className="mt-5 text-center text-gray-600">
                <span>
                  <a className="font-bold text-blueCustom" href="#">
                    {' '}
                    Back to sign in
                  </a>
                </span>
              </h4>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export function VerifyMail() {
  return (
    <>
      <div className="mb-5 flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mb-1 mt-10 text-left text-2xl/9 font-bold tracking-tight text-titleAuthor">
            Verify your email
          </h2>
          <h4 className="text-l/10 mt-2 text-left tracking-tight text-gray-400">
            Thank you, check your email for instructions to reset your password
          </h4>
        </div>

        <div className="mb-1 mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="mt-2">
            <Button
              type="submit"
              className="hover:bg-blueCustom-500 focus-visible:outline-blueCustom-600 flex h-12 w-full justify-center rounded-md bg-blueCustom px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Continue
            </Button>
            <h4 className="mt-3 text-left text-gray-600">
              Don't receive any emails?
              <span>
                <a className="font-bold text-blueCustom" href="#">
                  {' '}
                  Resend
                </a>
              </span>
            </h4>
          </div>
        </div>
      </div>
    </>
  )
}

// export {SignIn, SignUp}
