
export const LoginPage = () => {
  return (
    <>
      <div className="w-full md:grid md:grid-flow-col h-screen min-h-screen max-h-screen">
        <div className="p-10 shadow-xl grid content-center min-h-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          <h3 className="font-bold text-violet-700 text-4xl mb-6">Sign in</h3>
          <form>
            <div className="my-2">
              <input
                type="text"
                className="px-3 h-11 focus:bg-white w-full rounded border placeholder-slate-400 spacing font-medium text-sm outline-none focus:ring ring-violet-300 focus:border-violet-500 transition-all duration-150 hover:border-violet-400 bg-slate-100 border-slate-300 py-2"
                placeholder="email"
              />
            </div>
            <div className="my-2">
              <input
                type="password"
                className="px-3 h-11 focus:bg-white w-full rounded border placeholder-slate-400 spacing font-medium text-sm outline-none focus:ring ring-violet-300 focus:border-violet-500 transition-all duration-150 hover:border-violet-400 bg-slate-100 border-slate-300 py-2"
                placeholder="password"
              />
            </div>
            <div className="my-2">
              <input
                type="submit"
                className="bg-gradient-to-r from-violet-600 to-violet-700 hover:scale-[1.02] transition-all duration-150  w-full h-12 rounded font-bold text-white cursor-pointer"
                value="sign in"
              />
            </div>
          </form>
        </div>

        <div className="p-10 grid content-center min-h-full [background:radial-gradient(125%_125%_at_50%_10%,#100037_40%,#63e_100%)]">
          <h3 className="font-bold text-white text-4xl mb-6">Sign up</h3>
          <form>
            <div className="my-2">
              <input
                type="text"
                className="px-3 h-11 focus:bg-white w-full rounded border placeholder-slate-400 spacing font-medium text-sm outline-none focus:ring ring-violet-300 focus:border-violet-500 transition-all duration-150 hover:border-violet-400 bg-slate-100 border-slate-300 py-2"
                placeholder="name"
              />
            </div>
            <div className="my-2">
              <input
                type="email"
                className="px-3 h-11 focus:bg-white w-full rounded border placeholder-slate-400 spacing font-medium text-sm outline-none focus:ring ring-violet-300 focus:border-violet-500 transition-all duration-150 hover:border-violet-400 bg-slate-100 border-slate-300 py-2"
                placeholder="email"
              />
            </div>
            <div className="my-2">
              <input
                type="password"
                className="px-3 h-11 focus:bg-white w-full rounded border placeholder-slate-400 spacing font-medium text-sm outline-none focus:ring ring-violet-300 focus:border-violet-500 transition-all duration-150 hover:border-violet-400 bg-slate-100 border-slate-300 py-2"
                placeholder="password"
              />
            </div>

            <div className="my-2">
              <input
                type="password"
                className="px-3 h-11 focus:bg-white w-full rounded border placeholder-slate-400 spacing font-medium text-sm outline-none focus:ring ring-violet-300 focus:border-violet-500 transition-all duration-150 hover:border-violet-400 bg-slate-100 border-slate-300 py-2"
                placeholder="repeat your password"
              />
            </div>

            <div className="my-2">
              <input
                type="submit"
                className="bg-gradient-to-r from-violet-600 to-violet-700 hover:scale-[1.02] transition-all duration-150  w-full h-12 rounded font-bold text-white cursor-pointer"
                value="sign up" />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
