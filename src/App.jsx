import axios from "axios";
import { useEffect, useState } from "react";

function Translator() {
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [inputValue, setInputValue] = useState("");
  const [outPut, setOutPut] = useState("");
  const [options, setOptions] = useState([]);

  const translate = async () => {
    const url = "https://text-translator2.p.rapidapi.com/translate";
    const data = new FormData();
    data.append("source_language", from);
    data.append("target_language", to);
    data.append("text", inputValue);

    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "9e4505caadmshd0ccc38f8669f77p14772ejsnf3618d5eb0ba",
        "x-rapidapi-host": "text-translator2.p.rapidapi.com",
      },
      body: data,
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.data);
      setOutPut(result.data.translatedText);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fatchData() {
      const url = "https://text-translator2.p.rapidapi.com/getLanguages";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "9e4505caadmshd0ccc38f8669f77p14772ejsnf3618d5eb0ba",
          "x-rapidapi-host": "text-translator2.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result.data.languages);
        setOptions(result.data.languages);
      } catch (error) {
        console.error(error);
      }
    }
    fatchData();
  }, []);

  return (
    <>
      <h1 className="text-3xl text-center my-6 bg-red-400 py-3 font-semibold text-white">
        Translator
      </h1>
      <div className="flex items-center justify-center gap-4 py-8">
        <div className="">
          from:
          <select
            name=""
            id=""
            onChange={(e) => setFrom(e.target.value)}
            className="border-2 bg-[whiteSmoke]"
          >
            {options.map((opt) => {
              return (
                <option key={opt.code} value={opt.code}>
                  {opt.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="">
          to:
          <select
            name=""
            id=""
            onChange={(e) => setTo(e.target.value)}
            className="border-2 bg-[whiteSmoke]"
          >
            {options.map((opt) => {
              return (
                <option key={opt.code} value={opt.code}>
                  {opt.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex justify-evenly">
        <textarea
          name=""
          id=""
          cols="60"
          rows="6"
          onInput={(e) => setInputValue(e.target.value)}
          className="border-2 px-4 py-1"
        ></textarea>
        <textarea name="" id="" cols="60" rows="6" value={outPut}className="border-2 px-4 py-1"></textarea>
      </div>

      <div className="flex items-center justify-center py-12">
        <button onClick={(e) => translate()} className="text-xl py-2 px-6 rounded-lg bg-blue-600 text-white">Translate</button>
      </div>
    </>
  );
}
export default Translator;
