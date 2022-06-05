import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {	fetchPosts } from "../features/Posts/postsSlice";

export default function Nav() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("")
  const [subreddit, setSubreddit] = useState("None")
  
  const handleSearch = (event) => {
    const value = event.target.value
    setSearchTerm(value)
    dispatch(fetchPosts({searchTerm: value, subreddit: subreddit, after: "initial"}));
  }

  const handleCheckbox = (event) => {
    const value = event.target.value
    setSubreddit(value)
    dispatch(fetchPosts({searchTerm: searchTerm, subreddit: value, after: "initial"}));
  }

  return (
    <form>
      <input type="text" name="searchTerm" value={searchTerm} onChange={handleSearch}/>
      <div className="subreddits-container">
        <label>
          <input type="radio" id="" name="subreddit" value="None" onChange={handleCheckbox} checked={subreddit === 'None'} />
          None
        </label>
        <label>
          <input type="radio" id="" name="subreddit" value="Kitten" onChange={handleCheckbox} checked={subreddit === 'Kitten'}/>
          r/Kitten
        </label>
        <label>
          <input type="radio" id="" name="subreddit" value="SupermodelCats"  onChange={handleCheckbox} checked={subreddit === 'SupermodelCats'}/>
          r/SupermodelCats
        </label>
        <label>
          <input type="radio" id="" name="subreddit" value="blackcats"  onChange={handleCheckbox} checked={subreddit === 'blackcats'}/>
          r/blackcats
        </label>
        <label>
          <input type="radio" id="" name="subreddit" value="catsAreAssholes"  onChange={handleCheckbox} checked={subreddit === 'catsAreAssholes'}/>
          r/catsAreAssholes
        </label>
        <label>
          <input type="radio" id="" name="subreddit" value="curledfeetsies"  onChange={handleCheckbox} checked={subreddit === 'curledfeetsies'}/>
          r/curledfeetsies
        </label>
        <label>
          <input type="radio" id="" name="subreddit" value="CatsStandingUp" onChange={handleCheckbox} checked={subreddit === 'CatsStandingUp'}/>
          r/CatsStadingUp
        </label>
        <label>
          <input type="radio" id="" name="subreddit" value="ragdolls" onChange={handleCheckbox} checked={subreddit === 'ragdolls'}/>
          r/ragdolls
        </label>




        
        
        
        
      </div>
    </form>
  );
}