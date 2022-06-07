import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {	fetchPosts } from "../features/Posts/postsSlice";

export default function Nav() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("")
  const [subreddit, setSubreddit] = useState("None")
  const [subsSelection, setSubsSelection] = useState("hidden")
  
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

  const toggleSubreddits = (event) => {
    event.preventDefault();
    subsSelection == 'hidden' ? setSubsSelection('show') : setSubsSelection('hidden')
  }

  const subredditsContainer = () => {
      return (
        <div className="subreddits-container">
        <label>
          <input type="radio" id="" name="subreddit" value="None" onChange={handleCheckbox} checked={subreddit === 'None'} />
          <span className='subreddit-none'>None</span>
        </label>
        <label>
          <input type="radio" id="" name="subreddit" value="Kitten" onChange={handleCheckbox} checked={subreddit === 'Kitten'}/>
          <span className='subreddit-r'>r/</span>Kitten
        </label>
        <label>
          <input type="radio" id="" name="subreddit" value="SupermodelCats"  onChange={handleCheckbox} checked={subreddit === 'SupermodelCats'}/>
          <span className='subreddit-r'>r/</span>SupermodelCats
        </label>
        <label>
          <input type="radio" id="" name="subreddit" value="blackcats"  onChange={handleCheckbox} checked={subreddit === 'blackcats'}/>
          <span className='subreddit-r'>r/</span>blackcats
        </label>
        <label>
          <input type="radio" id="" name="subreddit" value="catsAreAssholes"  onChange={handleCheckbox} checked={subreddit === 'catsAreAssholes'}/>
          <span className='subreddit-r'>r/</span>catsAreAssholes
        </label>
        <label>
          <input type="radio" id="" name="subreddit" value="curledfeetsies"  onChange={handleCheckbox} checked={subreddit === 'curledfeetsies'}/>
          <span className='subreddit-r'>r/</span>curledfeetsies
        </label>
        <label>
          <input type="radio" id="" name="subreddit" value="CatsStandingUp" onChange={handleCheckbox} checked={subreddit === 'CatsStandingUp'}/>
          <span className='subreddit-r'>r/</span>CatsStadingUp
        </label>
        <label>
          <input type="radio" id="" name="subreddit" value="ragdolls" onChange={handleCheckbox} checked={subreddit === 'ragdolls'}/>
          <span className='subreddit-r'>r/</span>ragdolls
        </label>
      </div>
      )
  }

  return (
    <form>
      <input className="search-bar" type="text" name="searchTerm" value={searchTerm} onChange={handleSearch}/>
      <button className="subreddits-btn" onClick={toggleSubreddits}>
      Subreddits
      </button>
      { subsSelection == 'show' ? subredditsContainer() : undefined}
    </form>
  );
}