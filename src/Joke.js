import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import moment from "moment"
import './App.css';

const getJoke = async () => {
  let response = await fetch("https://api.jokes.one/jod", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response.json()
}

const fetchJoke = async ( {cookies} ) => {
  const response = await getJoke();
  if (response.error === undefined) {
    const today = moment(new Date()).format("DD/MM/YYYY")
    cookies.set("cacheExpired", today)
    cookies.set("joke", response)
  }

  return response
}

const getCachedJoke = ( {cookies} ) => {
  const cacheExpired = cookies.get('cacheExpired')
  let response
  if (cacheExpired === undefined || cacheExpired === "undefined") {
    response = fetchJoke({cookies})
  } else {
    const today = moment(new Date()).format("DD/MM/YYYY")
    console.log(cacheExpired === today)
    if ( cacheExpired === today ) {
      response = cookies.get("joke")
    } else {
      response = fetchJoke({cookies})
    }
  }

  return response
}

const Joke = ({cookies}) => {
  const response = getCachedJoke({cookies});

  return (
    <div className="joke">
      <h4></h4>
    </div>
  )
}

export default Joke;
