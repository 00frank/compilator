const IconCaretDown = ({ className="", handleClick, active }) => {
  return (
    <svg onClick={handleClick}
      fill="#fff"
      className={`${className} rounded-full p-2 border border-white cursor-pointer ${active ? " rotate-180" : ""}`}
      width={48} height={48} viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
      <path d="M128,188a11.96187,11.96187,0,0,1-8.48535-3.51465l-80-80a12.0001,12.0001,0,0,1,16.9707-16.9707L128,159.0293l71.51465-71.51465a12.0001,12.0001,0,0,1,16.9707,16.9707l-80,80A11.96187,11.96187,0,0,1,128,188Z" />
    </svg>
  )
}

export default IconCaretDown