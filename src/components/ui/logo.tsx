export function Logo() {
  return (
    <>
      <div className="item-center flex whitespace-normal px-9 pt-10">
        <img className="h-7 w-9 pr-2" src="/logo.png" alt="logo" />
        <h3 className="text-xl font-bold text-white"> MCQinsight</h3>
      </div>
    </>
  )
}

export function Banner() {
  return (
    <>
      <div className="space-y-1">
        <div className="mb-6 flex items-center justify-center">
          <img
            className="size-3/6 shrink-0"
            src="/introduction.png"
            alt="Banner"
          />
        </div>

        <div className="text-center text-xl font-bold text-white">
          MCQ Result Analysis System
        </div>
        <h4 className="text-center text-sm text-[#F8FAFC]">Provide sth....</h4>
      </div>
    </>
  )
}

export function Introduction() {
  return (
    <>
      <div className="grid-col-2 grid h-screen bg-blueCustom">
        <Logo />
        <Banner />
      </div>
    </>
  )
}
