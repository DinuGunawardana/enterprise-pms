'use client';

import Link from 'next/link';

// import { useRouter } from 'next/navigation';

import {
  FormEvent,
  useState,
} from 'react';

import {
  login,
} from '../../../services/authService';

export default function LoginPage() {

  /**
   * Next.js router
   *
   * Used for redirects
   */
  // const router = useRouter();

  /**
   * Form state
   */
  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  /**
   * Loading state
   */
  const [loading, setLoading] =
    useState(false);

  /**
   * Error message
   */
  const [error, setError] =
    useState('');

  /**
   * Handles login submit
   */
  async function handleLogin(
    e: FormEvent<HTMLFormElement>
  ) {

    /**
     * Prevent browser refresh
     */
    e.preventDefault();

    /**
     * Reset old errors
     */
    setError('');

    /**
     * Simple validation
     */
    if (!email || !password) {

      setError(
        'Please fill all fields.'
      );

      return;
    }

    try {

      /**
       * Start loading state
       */
      setLoading(true);

      // /**
      //  * Call auth service
      //  */
      // await login(
      //   email,
      //   password
      // );

      // /**
      //  * Redirect after success
      //  */
      // router.push('/dashboard');

      await login(email, password);

      /**
       * Refresh app state
       * so middleware sees session cookie
       */
      // router.refresh();
      window.location.href = '/dashboard';

    } catch (err: unknown) {

      /**
       * Supabase error handling
       */
      if (err instanceof Error) {

        setError(err.message);

      } else {

        setError('Login failed');
      }

    } finally {

      /**
       * Stop loading spinner
       */
      setLoading(false);
    }
  }

  return (

    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-950
        px-6
        py-12
      "
    >

      {/* Background Glow */}
      <div
        className="
          absolute
          inset-0
          overflow-hidden
        "
      >

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-indigo-500/10
            blur-3xl
          "
        />

      </div>

      {/* Login Card */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-8
          shadow-2xl
          backdrop-blur-xl
        "
      >

        {/* Header */}
        <div className="mb-8 text-center">

          <h1
            className="
              text-4xl
              font-bold
              tracking-tight
              text-white
            "
          >
            Welcome Back
          </h1>

          <p
            className="
              mt-3
              text-sm
              text-slate-400
            "
          >
            Login to your Enterprise PMS
          </p>

        </div>

        {/* Error */}
        {error && (

          <div
            className="
              mb-4
              rounded-xl
              border
              border-red-500/20
              bg-red-500/10
              p-3
              text-sm
              text-red-400
            "
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* Email */}
          <div>

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-300
              "
            >
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-slate-900/70
                px-4
                py-3
                text-white
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-500/20
              "
            />

          </div>

          {/* Password */}
          <div>

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-300
              "
            >
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-slate-900/70
                px-4
                py-3
                text-white
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-500/20
              "
            />

          </div>

          {/* Forgot Password */}
          <div className="text-right">

            <Link
              href="/forgot-password"
              className="
                text-sm
                text-indigo-400
                transition
                hover:text-indigo-300
              "
            >
              Forgot Password?
            </Link>

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              flex
              w-full
              items-center
              justify-center
              rounded-xl
              bg-indigo-600
              px-4
              py-3
              font-semibold
              text-white
              transition
              hover:bg-indigo-500
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            {loading ? (

              <div
                className="
                  h-5
                  w-5
                  animate-spin
                  rounded-full
                  border-2
                  border-white
                  border-t-transparent
                "
              />

            ) : (

              'Login'
            )}

          </button>

        </form>

        {/* Footer */}
        <div
          className="
            mt-6
            text-center
            text-sm
            text-slate-400
          "
        >

          Don&apos;t have an account?{' '}

          <Link
            href="/signup"
            className="
              font-medium
              text-indigo-400
              hover:text-indigo-300
            "
          >
            Create Account
          </Link>

        </div>

      </div>

    </main>
  );
}

// 'use client';

// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// import { useState } from 'react';

// import {
//   Loader2,
//   Eye,
//   EyeOff,
//   LogIn,
// } from 'lucide-react';

// import {
//   login,
// } from '../../services/authService';

// export default function LoginPage() {

//   /**
//    * Router
//    */
//   const router = useRouter();

//   /**
//    * Form states
//    */
//   const [email, setEmail] =
//     useState('');

//   const [password, setPassword] =
//     useState('');

//   /**
//    * UI states
//    */
//   const [loading, setLoading] =
//     useState(false);

//   const [error, setError] =
//     useState('');

//   /**
//    * Password visibility
//    */
//   const [
//     showPassword,
//     setShowPassword,
//   ] = useState(false);

//   /**
//    * Email validation
//    */
//   function isValidEmail(email: string) {

//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//       .test(email);
//   }

//   /**
//    * Validate form
//    */
//   function validateForm() {

//     if (!email || !password) {

//       return 'Please fill all fields.';
//     }

//     if (!isValidEmail(email)) {

//       return 'Please enter a valid email.';
//     }

//     if (password.length < 8) {

//       return (
//         'Password must be at least 8 characters.'
//       );
//     }

//     return null;
//   }

//   /**
//    * Handle login
//    */
//   async function handleLogin(
//     e: React.FormEvent
//   ) {

//     e.preventDefault();

//     /**
//      * Reset error
//      */
//     setError('');

//     /**
//      * Validate form
//      */
//     const validationError =
//       validateForm();

//     if (validationError) {

//       setError(validationError);

//       return;
//     }

//     try {

//       setLoading(true);

//       /**
//        * Login request
//        */
//       await login(
//         email,
//         password
//       );

//       /**
//        * Redirect dashboard
//        */
//       router.push('/dashboard');

//     } catch (error: any) {

//       console.error(error);

//       setError(
//         error?.message ||
//         'Login failed.'
//       );

//     } finally {

//       setLoading(false);
//     }
//   }

//   return (

//     <main
//       className="
//         flex
//         min-h-screen
//         items-center
//         justify-center
//         bg-gradient-to-br
//         from-slate-950
//         via-slate-900
//         to-slate-950
//         px-4
//       "
//     >

//       <div
//         className="
//           w-full
//           max-w-md
//           rounded-2xl
//           border
//           border-white/10
//           bg-white/5
//           p-8
//           shadow-2xl
//           backdrop-blur-xl
//         "
//       >

//         {/* Header */}
//         <div className="mb-8 text-center">

//           <div
//             className="
//               mx-auto
//               mb-4
//               flex
//               h-14
//               w-14
//               items-center
//               justify-center
//               rounded-full
//               bg-indigo-500/20
//             "
//           >

//             <LogIn
//               className="text-indigo-400"
//               size={26}
//             />

//           </div>

//           <h1
//             className="
//               text-4xl
//               font-bold
//               tracking-tight
//               text-white
//             "
//           >
//             Welcome Back
//           </h1>

//           <p
//             className="
//               mt-3
//               text-sm
//               text-slate-400
//             "
//           >
//             Sign in to continue to Enterprise PMS
//           </p>

//         </div>

//         {/* Form */}
//         <form
//           onSubmit={handleLogin}
//           className="space-y-5"
//         >

//           {/* Email */}
//           <div>

//             <label
//               className="
//                 mb-2
//                 block
//                 text-sm
//                 font-medium
//                 text-slate-300
//               "
//             >
//               Email
//             </label>

//             <input
//               type="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) =>
//                 setEmail(e.target.value)
//               }
//               className="
//                 w-full
//                 rounded-xl
//                 border
//                 border-white/10
//                 bg-white/5
//                 px-4
//                 py-3
//                 text-white
//                 placeholder:text-slate-500
//                 outline-none
//                 transition
//                 focus:border-indigo-500
//                 focus:ring-2
//                 focus:ring-indigo-500/30
//               "
//             />

//           </div>

//           {/* Password */}
//           <div>

//             <div
//               className="
//                 mb-2
//                 flex
//                 items-center
//                 justify-between
//               "
//             >

//               <label
//                 className="
//                   text-sm
//                   font-medium
//                   text-slate-300
//                 "
//               >
//                 Password
//               </label>

//               <Link
//                 href="/forgot-password"
//                 className="
//                   text-sm
//                   text-indigo-400
//                   transition
//                   hover:text-indigo-300
//                 "
//               >
//                 Forgot Password?
//               </Link>

//             </div>

//             <div className="relative">

//               <input
//                 type={
//                   showPassword
//                     ? 'text'
//                     : 'password'
//                 }
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) =>
//                   setPassword(e.target.value)
//                 }
//                 className="
//                   w-full
//                   rounded-xl
//                   border
//                   border-white/10
//                   bg-white/5
//                   px-4
//                   py-3
//                   pr-12
//                   text-white
//                   placeholder:text-slate-500
//                   outline-none
//                   transition
//                   focus:border-indigo-500
//                   focus:ring-2
//                   focus:ring-indigo-500/30
//                 "
//               />

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowPassword(
//                     !showPassword
//                   )
//                 }
//                 className="
//                   absolute
//                   right-3
//                   top-1/2
//                   -translate-y-1/2
//                   text-slate-400
//                   transition
//                   hover:text-white
//                 "
//               >
//                 {showPassword
//                   ? <EyeOff size={18} />
//                   : <Eye size={18} />
//                 }
//               </button>

//             </div>

//           </div>

//           {/* Error */}
//           {error && (

//             <div
//               className="
//                 rounded-xl
//                 border
//                 border-red-500/30
//                 bg-red-500/10
//                 px-4
//                 py-3
//                 text-sm
//                 text-red-400
//               "
//             >
//               {error}
//             </div>
//           )}

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="
//               flex
//               w-full
//               items-center
//               justify-center
//               rounded-xl
//               bg-indigo-600
//               px-4
//               py-3
//               font-medium
//               text-white
//               transition
//               hover:bg-indigo-500
//               disabled:cursor-not-allowed
//               disabled:opacity-60
//             "
//           >

//             {loading ? (

//               <Loader2
//                 className="animate-spin"
//                 size={20}
//               />

//             ) : (

//               'Login'
//             )}

//           </button>

//         </form>

//         {/* Footer */}
//         <div
//           className="
//             mt-6
//             text-center
//             text-sm
//             text-slate-400
//           "
//         >

//           Don&apos;t have an account?{' '}

//           <Link
//             href="/signup"
//             className="
//               font-medium
//               text-indigo-400
//               transition
//               hover:text-indigo-300
//             "
//           >
//             Create Account
//           </Link>

//         </div>

//       </div>

//     </main>
//   );
// }

// 'use client';

// import { useState } from 'react';

// import { login } from '../../services/authService';

// export default function LoginPage() {

//   /**
//    * Stores email input
//    */
//   const [email, setEmail] =
//     useState('');

//   /**
//    * Stores password input
//    */
//   const [password, setPassword] =
//     useState('');

//   /**
//    * Handles login button click
//    */
//   async function handleLogin() {

//     try {

//       /**
//        * Calls login service
//        */
//       await login(email, password);

//       alert('Login Successful');

//     } catch (error) {

//       console.error(error);

//       alert('Login Failed');
//     }
//   }

//   return (

//     <div className="flex min-h-screen items-center justify-center">

//       <div className="w-full max-w-md rounded-lg border p-6 shadow">

//         <h1 className="mb-6 text-3xl font-bold">
//           Login
//         </h1>

//         <input
//           type="email"
//           placeholder="Email"
//           className="mb-4 w-full rounded border p-3"
//           value={email}
//           onChange={(e) =>
//             setEmail(e.target.value)
//           }
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="mb-4 w-full rounded border p-3"
//           value={password}
//           onChange={(e) =>
//             setPassword(e.target.value)
//           }
//         />

//         <button
//           onClick={handleLogin}
//           className="w-full rounded bg-black p-3 text-white"
//         >
//           Login
//         </button>

//       </div>

//     </div>
//   );
// }