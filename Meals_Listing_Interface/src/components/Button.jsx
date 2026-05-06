
function Button({name, fn}) {
  return (
    <button type="button" className="bg-linear-60 from-gray-700 rounded-2xl hover:-translate-y-0.5 hover:scale-110 transition ease-in-out delay-100 duration-200 to-gray-300 opacity-0.4 w-fit px-8 py-2 cursor-pointer font-medium font-mono" onClick={fn}>{name}</button>
  )
}

export default Button