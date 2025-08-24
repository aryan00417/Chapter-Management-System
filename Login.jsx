import { useState } from "react";


const Login = ({ handleLogin }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const submithandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setemail("");
    setpassword("");
  };

  return (
    <div className="relative overflow-hidden h-screen w-screen text-white font-sans">
      

      <div className="relative z-10 flex flex-col items-center justify-center h-screen bg-black bg-opacity-60">
        <h1 className="text-4xl font-bold mb-10 text-[#EBD3F8]">IEEE SSIT - VIT</h1>
        <div className="border-2 border-[#EBD3F8] p-10 rounded-3xl bg-white bg-opacity-10 backdrop-blur-md shadow-lg">
          <form
            onSubmit={submithandler}
            className="flex flex-col items-center justify-center"
          >
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              className="h-12 w-80 border-2 border-fuchsia-400 outline-none rounded-full m-3 px-4 text-sm text-black placeholder:text-[12pt]"
              type="email"
              placeholder="Enter your E-mail"
            />
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
              className="h-12 w-80 border-2 border-fuchsia-400 outline-none rounded-full m-3 px-4 text-sm text-black placeholder:text-[12pt]"
              type="password"
              placeholder="Enter your password"
            />
            <button className="mt-6 border-2 border-fuchsia-400 rounded-full px-8 py-2 hover:bg-fuchsia-600 hover:text-white transition-all duration-300">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
