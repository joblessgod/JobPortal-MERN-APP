import React from 'react'
import Header from '../header/Header';
import Categories from '../categories/Categories';
import ListedJobs from '../listedjobs/ListedJobs';
const Home = () => {
  return (
    <div>
    <Header/>
    <Categories />
    <ListedJobs isHomePage={true} />
    </div>
  )
}

export default Home